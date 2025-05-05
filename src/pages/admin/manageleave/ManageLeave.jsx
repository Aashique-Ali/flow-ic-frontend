import React, { useEffect, useState } from "react"

import axios from "axios"
import { Badge } from "@/components/ui/badge"
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
import { Avatar } from "@/components/ui/avatar"
import api from "@/lib/api"

const ManageLeave = () => {
  const navigate = useNavigate()
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const requestsPerPage = 5

  const request = [
    {
      id: "1",
      teamhead_id: "101",
      teamhead: "John Doe",
      userid: "u001",
      name: "Alice Johnson",
      role: "alice@company.com",
      from: "2023-09-01",
      to: "2023-09-05",
      duration: "5 days",
      date: "2023-09-01 - 2023-09-05",
      type: "Leave",
      reason: "Family event",
      approval: "pending",
    },
    {
      id: "1",
      teamhead_id: "101",
      teamhead: "John Doe",
      userid: "u001",
      name: "Alice Johnson",
      role: "alice@company.com",
      from: "2023-09-01",
      to: "2023-09-05",
      duration: "5 days",
      date: "2023-09-01 - 2023-09-05",
      type: "Leave",
      reason: "Family event",
      approval: "pending",
    },
    {
      id: "1",
      teamhead_id: "101",
      teamhead: "John Doe",
      userid: "u001",
      name: "Alice Johnson",
      role: "alice@company.com",
      from: "2023-09-01",
      to: "2023-09-05",
      duration: "5 days",
      date: "2023-09-01 - 2023-09-05",
      type: "Leave",
      reason: "Family event",
      approval: "pending",
    },
  ]

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true)
        const response = await api.get("/leave/getAllLeaves")
        const data = response.data.allLeaves.map((leave) => ({
          id: leave._id,
          teamhead_id: leave.teamHead._id,
          teamhead: leave.teamHead.fullName,
          userid: leave.user._id,
          name: leave.user.fullName,
          role: leave.user.email,
          duration: `${leave.totalDays} days`,
          from: leave.intialDate,
          to: leave.endDate,
          type: "Leave",
          reason: leave.description,
          approval: leave.status || "pending",
          avatar: "https://via.placeholder.com/50",
        }))
        setRequests(request)
      } catch (err) {
        setError("An error occurred while fetching Leaves requests.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
  }, [])

  const indexOfLastRequest = currentPage * requestsPerPage
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage
  const currentRequests = requests.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  )

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const filteredRequests = currentRequests.filter(
    (request) =>
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoaderCircle className="h-10 w-10 text-green-500 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
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
              <Link to="#">Leaves</Link>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Search Bar */}
        <Input
          className="max-w-sm"
          placeholder="Search by name or role"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={<SearchIcon />}
        />
      </div>

      <Card className="w-full rounded-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-[#0067B8] text-3xl">
            {" "}
            Team Leave Management{" "}
          </CardTitle>
          <CardDescription>
            Check Leave Request Details by Clicking on a User Record.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-4">
            <Badge variant="outline" className="bg-yellow-100 text-yellow-700">
              Pending
            </Badge>
            <Badge variant="outline" className="bg-green-100 text-green-700">
              Approved
            </Badge>
            <Badge variant="outline" className="bg-red-100 text-red-700">
              Rejected
            </Badge>
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Team Head</TableHead>
                <TableHead>Leave Type</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow
                  key={request.userid}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() =>
                    navigate(
                      `/dashboard/admin/managetimedetails/${request.userid}`
                    )
                  }
                >
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar src={request.avatar} alt={request.name} />
                      <div>
                        <div className="font-medium">{request.name}</div>
                        <div className="text-sm text-gray-500">
                          {request.role}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{request.teamhead}</TableCell>
                  <TableCell>{request.type}</TableCell>
                  <TableCell>{request.from}</TableCell>
                  <TableCell>{request.to}</TableCell>
                  <TableCell>{request.duration}</TableCell>
                  <TableCell>{request.reason}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.approval === "approved"
                          ? "success"
                          : request.approval === "rejected"
                          ? "destructive"
                          : "warning"
                      }
                    >
                      {request.approval.charAt(0).toUpperCase() +
                        request.approval.slice(1)}
                    </Badge>
                  </TableCell>

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
                            navigate(`/dashboard/Leaves/edit/${request._id}`)
                          }
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            navigate(`/dashboard/Leaves/delete/${request._id}`)
                          }
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <Button
              disabled={currentPage === 1}
              onClick={() => paginate(currentPage - 1)}
              variant="ghost"
            >
              <ChevronLeft />
            </Button>
            <span>
              Page {currentPage} of{" "}
              {Math.ceil(requests.length / requestsPerPage)}
            </span>
            <Button
              disabled={
                currentPage === Math.ceil(requests.length / requestsPerPage)
              }
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

export default ManageLeave
