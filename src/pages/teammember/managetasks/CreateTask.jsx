// components/AddTask.js
import React, { useEffect, useState } from "react"
import axios from "axios"
import { useForm, Controller } from "react-hook-form"
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"
import Select from "react-select"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/auth/AuthContext"
import api from "@/lib/api"

const AddTask = () => {
  const { companyId, authToken, username, userId } = useAuth()
  const navigate = useNavigate()
  const apiUrl = import.meta.env.VITE_API_URL

  const [departmentOptions, setDepartmentOptions] = useState([])
  const [branchOptions, setBranchOptions] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      branchid: "",
      username: "",
      taskTitle: "",
      description: "",
      file: null,
      assignMember: "",
      project_Name: "",
      departmentId: "",
      dueDate: "",
    },
  })

  const headers = {
    Authorization: `Bearer ${authToken}`,
  }

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [departmentRes, branchRes] = await Promise.all([
          api.get(`/department/getDepartmentByCompanyId/${companyId}`),
          api.get(`/branch/getBranchByCompanyId/${companyId}`),
        ])

        setDepartmentOptions(
          departmentRes.data.departments.map((dept) => ({
            label: dept.department_name,
            value: dept._id,
          }))
        )

        setBranchOptions(
          branchRes.data.branch.map((br) => ({
            label: br.name,
            value: br._id,
          }))
        )
      } catch (err) {
        toast.error("Failed to load dropdown data")
        console.error(err)
      }
    }

    fetchOptions()

    if (authToken) {
      if (username) setValue("username", username)
      if (userId) setValue("assignMember", userId)
    }
  }, [companyId, username, userId, setValue, authToken])

  const onSubmit = async (data) => {
    // Manual validation for required dropdowns and file
    if (!data.branchid || !data.branchid.value) {
      toast.error("Branch is required")
      return
    }
    if (!data.departmentId || !data.departmentId.value) {
      toast.error("Department is required")
      return
    }
    if (!data.file || data.file.length === 0) {
      toast.error("File is required")
      return
    }

    setIsSubmitting(true)
    const formData = new FormData()

    const formatDate = (inputDate) => {
      const date = new Date(inputDate)
      const day = String(date.getDate()).padStart(2, "0")
      const month = String(date.getMonth() + 1).padStart(2, "0")
      const year = date.getFullYear()
      return `${day}-${month}-${year}`
    }

    for (const key in data) {
      if (key === "file") {
        if (data.file && data.file.length > 0) {
          formData.append("file", data.file[0])
        }
      } else if (["departmentId", "branchid"].includes(key)) {
        formData.append(key, data[key]?.value)
      } else if (key === "dueDate") {
        formData.append(key, formatDate(data[key]))
      } else {
        formData.append(key, data[key])
      }
    }

    try {
      await api.post(`/task/create`, formData, { headers })
      toast.success("Task created successfully")

      setTimeout(() => {
        navigate("/dashboard/user")
      }, 1200)
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to create task"
      toast.error(`Error: ${errorMessage}`)
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to="/dashboard/user">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link to="/dashboard/user">Tasks</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link to="#">Add Task</Link>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex gap-4">
          <Link to="/dashboard/user">
            <Button
              variant="outline"
              className="hover:bg-yellow-500 rounded-3xl"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </Link>
          <Button
            onClick={handleSubmit(onSubmit)}
            className="bg-[#BA0D09] hover:bg-[#BA0D09] rounded-3xl"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>

      <Card className="mt-4 pb-8 rounded-3xl shadow-sm shadow-green-50">
        <CardHeader>
          <CardTitle className="text-[#0067B8] text-3xl font-[Liberation Mono]">
            Create Task
          </CardTitle>
          <CardDescription className="text-[#000] text-sm font-[Liberation Mono]">
            Fill out the form below to create a new task.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6">
            <div>
              <label className="block mb-2 font-medium">Branch Name</label>
              <Controller
                name="branchid"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={branchOptions}
                    className="rounded-3xl"
                    onChange={(opt) => field.onChange(opt)}
                  />
                )}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Task Title</label>
              <Input
                {...register("taskTitle", {
                  required: "Task title is required",
                })}
                className="rounded-3xl"
              />
              {errors.taskTitle && (
                <p className="text-red-500">{errors.taskTitle.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium">Description</label>
              <Input
                {...register("description", {
                  required: "Description is required",
                })}
                className="rounded-3xl"
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium">Upload File</label>
              <Input
                type="file"
                {...register("file")}
                className="rounded-3xl"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Project Name</label>
              <Input
                {...register("project_Name", {
                  required: "Project Name is required",
                })}
                className="rounded-3xl"
              />
              {errors.project_Name && (
                <p className="text-red-500">{errors.project_Name.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium">Department</label>
              <Controller
                name="departmentId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={departmentOptions}
                    className="rounded-3xl"
                  />
                )}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Due Date</label>
              <Input
                type="date"
                {...register("dueDate", { required: "Due date is required" })}
                className="rounded-3xl"
              />
              {errors.dueDate && (
                <p className="text-red-500">{errors.dueDate.message}</p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}

export default AddTask
