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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import { useAuth } from "@/auth/AuthContext"

const ManageTasks = () => {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const tasksPerPage = 5
  const apiUrl = import.meta.env.VITE_API_URL

  const { userId } = useAuth()

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true)
        const resp = await axios.get(`${apiUrl}/api/task/getAllTask`)
        const rawTasks = resp.data.tasks

        // Filter tasks by current user
        const userTasks = rawTasks.filter(
          (task) => task.assignMember === userId
        )

        const withBranchNames = await Promise.all(
          userTasks.map(async (task) => {
            const branchId = task.branchid
            let branchName = "N/A"
            if (branchId) {
              try {
                const br = await axios.get(
                  `${apiUrl}/api/branch/view/${branchId}`
                )
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

    if (userId) {
      fetchTasks()
    }
  }, [apiUrl, userId])

  const indexOfLastTask = currentPage * tasksPerPage
  const indexOfFirstTask = indexOfLastTask - tasksPerPage
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask)

  const filteredTasks = currentTasks.filter(
    (task) =>
      task.taskTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
              <Link to="/dashboard/user">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link to="#">Tasks</Link>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Input
          className="max-w-sm"
          placeholder="Search by task title "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={<SearchIcon />}
        />
      </div>

      <Card className="w-full rounded-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-[#0067B8] text-3xl">
            Manage Tasks
          </CardTitle>
          <CardDescription>View tasks and their details.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Assign Member</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Task Title</TableHead>
                <TableHead>Submitted On</TableHead>

                <TableHead>Description</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow
                  key={task._id}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() =>
                    navigate(`/dashboard/user/taskdetail/${task._id}`)
                  }
                >
                  <TableCell>{task.assignMemberName}</TableCell>
                  <TableCell>{task.branchName}</TableCell>
                  <TableCell>
                    {task.department?.department_name || "N/A"}
                  </TableCell>
                  <TableCell>{task?.taskTitle.slice(0, 10) + "..."}</TableCell>

                  <TableCell>{task.createdAt}</TableCell>
                  <TableCell>
                    {task?.description.slice(0, 10) + "..."}
                  </TableCell>
                  <TableCell>{task.dueDate}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontalIcon />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() =>
                            navigate(`/dashboard/user/taskdetail/${task._id}`)
                          }
                        >
                          View Task
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-between items-center mt-4">
            <Button
              disabled={currentPage === 1}
              onClick={() => paginate(currentPage - 1)}
              variant="ghost"
            >
              <ChevronLeft />
            </Button>
            <span>
              Page {currentPage} of {Math.ceil(tasks.length / tasksPerPage)}
            </span>
            <Button
              disabled={currentPage === Math.ceil(tasks.length / tasksPerPage)}
              onClick={() => paginate(currentPage + 1)}
              variant="ghost"
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
