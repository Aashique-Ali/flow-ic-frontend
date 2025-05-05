import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
  MoreHorizontalIcon,
  SearchIcon,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import api from "@/lib/api"

const ManageTasks = () => {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const tasksPerPage = 5
  const apiUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true)
        const resp = await api.get(`/task/getAllTask`)
        const rawTasks = resp.data.tasks

        const withBranchNames = await Promise.all(
          rawTasks.map(async (task) => {
            const branchId = task.branchid
            let branchName = "N/A"
            if (branchId) {
              try {
                const br = await api.get(`/branch/view/${branchId}`)
                branchName = br.data.name || branchName
              } catch (e) {
                console.error("Failed to fetch branch", branchId, e)
              }
            }
            return {
              ...task,
              branchName,
            }
          })
        )

        setTasks(withBranchNames)
      } catch (error) {
        console.error("Failed to fetch tasks:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [apiUrl])

  const indexOfLastTask = currentPage * tasksPerPage
  const indexOfFirstTask = indexOfLastTask - tasksPerPage
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask)

  const filteredTasks = currentTasks.filter(
    (task) =>
      task.taskTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignMemberName?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoaderCircle className="h-10 w-10 text-green-500 animate-spin" />
      </div>
    )
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to="/dashboard/admin">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link to="#">Tasks</Link>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center justify-between mb-4 space-x-2">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search by task title or assigned member"
            className="border p-2 rounded-3xl w-full pr-10 focus:outline-none focus:ring focus:ring-green-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon
            size={24}
            className="absolute top-2 right-4 text-gray-500 pointer-events-none"
          />
        </div>
      </div>

      <Card className="mt-2 w-full rounded-3xl shadow-sm transition-shadow duration-300 max-w-sm sm:max-w-full">
        <CardHeader>
          <CardTitle className="text-[#0067B8] text-2xl font-[Liberation Mono]">
            Manage Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Assign Member</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Submitted On</TableHead>
                <TableHead>Task Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <TableRow
                    key={task._id}
                    className="cursor-pointer hover:bg-gray-50 rounded-3xl"
                    onClick={() =>
                      navigate(`/dashboard/teamlead/taskdetails/${task._id}`)
                    }
                  >
                    <TableCell className="text-sm">
                      {task.assignMemberName || "N/A"}
                    </TableCell>
                    <TableCell>{task.branchName}</TableCell>
                    <TableCell>
                      {task.department?.department_name || "N/A"}
                    </TableCell>
                    <TableCell>{task.createdAt || "N/A"}</TableCell>
                    <TableCell>
                      {task?.taskTitle.slice(0, 10) + "..."}
                    </TableCell>
                    <TableCell>
                      {task?.description.slice(0, 10) + "..."}
                    </TableCell>
                    <TableCell>{task.dueDate || "N/A"}</TableCell>
                    <TableCell>{task.status || "N/A"}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost">
                            <MoreHorizontalIcon size={20} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() =>
                              navigate(
                                `/dashboard/teamlead/taskdetails/${task._id}`
                              )
                            }
                          >
                            View Task
                          </DropdownMenuItem>
                          {/* <DropdownMenuItem
                            onClick={() =>
                              navigate(`/dashboard/tasks/delete/${task._id}`)
                            }
                          >
                            Delete
                          </DropdownMenuItem> */}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="9" className="text-center">
                    No tasks found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <Button
              disabled={currentPage === 1}
              onClick={() => paginate(currentPage - 1)}
              variant="ghost"
              className="rounded-full"
            >
              <ChevronLeft />
            </Button>
            <span className="text-sm">
              Page {currentPage} of {Math.ceil(tasks.length / tasksPerPage)}
            </span>
            <Button
              disabled={currentPage === Math.ceil(tasks.length / tasksPerPage)}
              onClick={() => paginate(currentPage + 1)}
              variant="ghost"
              className="rounded-full"
            >
              <ChevronRight />
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default ManageTasks
