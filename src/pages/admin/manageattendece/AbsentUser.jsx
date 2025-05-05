import React, { useState, useEffect } from "react"
import { ToastContainer, toast } from "react-toastify"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Link } from "react-router-dom"
import api from "@/lib/api"

const AbsentUser = () => {
  const [absentUsers, setAbsentUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 10
  const apiUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchAbsentUsers = async () => {
      try {
        setLoading(true)
        const response = await api.get(`/attendance/getAllTodayAbsentUsers`)
        if (response.data && response.data.absentUsers) {
          setAbsentUsers(response.data.absentUsers)
          setFilteredUsers(response.data.absentUsers)
        } else {
          toast.error("No absent users data found")
        }
      } catch (err) {
        toast.error("An error occurred while fetching absent users data.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchAbsentUsers()
  }, [])

  // Search logic
  useEffect(() => {
    const results = absentUsers.filter((user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredUsers(results)
    setCurrentPage(1)
  }, [searchTerm, absentUsers])

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link to="/dashboard/admin">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link to="/dashboard/admin/viewtodayattendence">Attendance</Link>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="mt-2 w-full rounded-3xl shadow-sm shadow-green-50 max-w-sm sm:max-w-full">
        <CardHeader className="flex justify-between items-center px-6 py-4">
          <CardTitle className="text-[#0067B8] text-3xl mb-4 font-[Liberation Mono]">
            Today Absent Users
          </CardTitle>
          <Input
            type="text"
            className="border p-2 rounded-3xl w-full pr-10 focus:outline-none focus:ring focus:ring-green-200"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardHeader>
        <CardContent className="p-6">
          {loading ? (
            <div className="text-center text-blue-500">Loading...</div>
          ) : currentUsers.length === 0 ? (
            <div className="text-center text-red-500">
              No absent users for today.
            </div>
          ) : (
            <Table className="w-full text-left text-gray-800 rounded-3xl">
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="py-2 px-4">Name</TableHead>
                  <TableHead className="py-2 px-4">Job Type</TableHead>
                  <TableHead className="py-2 px-4">Designation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentUsers.map((user) => (
                  <TableRow
                    key={user._id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <TableCell className="py-2 px-4">{user.fullName}</TableCell>
                    <TableCell className="py-2 px-4">
                      <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-blue-200 text-blue-800">
                        {user.jobType}
                      </span>
                    </TableCell>
                    <TableCell className="py-2 px-4">
                      <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-orange-200 text-orange-800">
                        {user.designation}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {/* Pagination */}
          {filteredUsers.length > usersPerPage && (
            <div className="flex justify-between space-x-2 mt-4">
              <Button
                variant="ghost"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                <ChevronLeft />
              </Button>
              <span className="flex items-center justify-center text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="ghost"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                <ChevronRight />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      <ToastContainer />
    </>
  )
}

export default AbsentUser
