import React, { useState, useEffect } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { useParams } from "react-router-dom"
import { useAuth } from "@/auth/AuthContext"
import api from "@/lib/api"

const TaskDetails = () => {
  const [taskData, setTaskData] = useState(null)
  const [branchName, setBranchName] = useState("")
  const [departmentName, setDepartmentName] = useState("")
  const [isImageOpen, setIsImageOpen] = useState(false)
  const apiUrl = import.meta.env.VITE_API_URL
  const { id } = useParams()
  const { companyId } = useAuth()

  useEffect(() => {
    const fetchTaskAndBranchAndDepartment = async () => {
      try {
        // Fetch task
        const { data } = await api.get(`/task/getTask/${id}`)
        if (!data.success) {
          toast.error("Task not found")
          return
        }
        setTaskData(data.task)

        // Fetch branch name
        if (data.task.branchid) {
          const branchRes = await api.get(`/branch/view/${data.task.branchid}`)
          if (branchRes.data.name) {
            setBranchName(branchRes.data.name)
          }
        }

        // Fetch all departments for company and match by ID
        const deptRes = await api.get(
          `/department/getDepartmentByCompanyId/${companyId}`
        )
        const departments = deptRes.data.departments || []
        const matchedDept = departments.find(
          (dept) => dept._id === data.task.departmentId
        )
        if (matchedDept) {
          setDepartmentName(matchedDept.department_name)
        }
      } catch (error) {
        console.error(error)
        toast.error("Error fetching task, branch or department details")
      }
    }

    fetchTaskAndBranchAndDepartment()
  }, [apiUrl, id, companyId])

  // Helper to check file type
  const isImage = (url) => /\.(jpeg|jpg|png|gif|bmp|webp)$/i.test(url)

  return (
    <section className="bg-gray-50 min-h-screen flex items-start justify-center py-8">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-md p-6 space-y-6 overflow-x-auto">
        {/* Title */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-700">
            Task Details
          </h1>
        </div>

        {/* Details Grid */}
        {taskData ? (
          <dl className="grid grid-cols-1 gap-y-4">
            {[
              ["Name", taskData.username],
              ["Branch Name", branchName],
              ["Department Name", departmentName],
              ["Submitted On", taskData.createdAt],
              ["Task Title", taskData.taskTitle],
              ["Project Name", taskData.project_Name],
              ["Due Date", taskData.dueDate],
              ["Status", taskData.status],
              ["Description", taskData.description],
            ].map(([label, value]) => (
              <React.Fragment key={label}>
                <div>
                  <dt className="text-[#BA0D09] font-medium">{label} :</dt>
                  <dd className="text-[#000] text-sm font-[Liberation Mono] break-words">
                    {value || "—"}
                  </dd>
                </div>
              </React.Fragment>
            ))}
          </dl>
        ) : (
          <p className="text-center text-gray-500 py-8">Loading details…</p>
        )}

        {/* Attached File or “no record” */}
        {taskData?.fileupload ? (
          <div className="flex justify-center">
            {isImage(taskData.fileupload) ? (
              <img
                src={taskData.fileupload}
                alt="Attachment"
                className="w-40 h-40 object-cover rounded-lg border cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setIsImageOpen(true)}
              />
            ) : (
              <a
                href={taskData.fileupload}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline font-medium"
              >
                Open Attached File
              </a>
            )}
          </div>
        ) : (
          <p className="text-center text-[#BA0D09] font-medium">
            No Record Available for the selected month...
          </p>
        )}

        {/* Fullscreen Image Overlay */}
        {isImage(taskData?.fileupload) && isImageOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            onClick={() => setIsImageOpen(false)}
          >
            <img
              src={taskData.fileupload}
              alt="Full view"
              className="max-w-[90%] max-h-[90%] rounded-lg"
            />
          </div>
        )}
      </div>

      <ToastContainer position="top-right" hideProgressBar />
    </section>
  )
}

export default TaskDetails
