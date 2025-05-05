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
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Link } from "react-router-dom"
import api from "@/lib/api"

const AbsentTeamMember = () => {
  const [absentUsers, setAbsentUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const apiUrl = import.meta.env.VITE_API_URL

  const pageSize = 10

  useEffect(() => {
    const fetchAbsentUsers = async () => {
      try {
        setLoading(true)
        const response = await api.get(
          `/attendance/getAllTodayAbsentUsers?page=${currentPage}&size=${pageSize}`
        )

        if (response.data && response.data.absentUsers) {
          setAbsentUsers(response.data.absentUsers)
          setTotalPages(response.data.totalPages || 1)
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
  }, [currentPage])

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to="/dashboard/teamlead">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link to="/dashboard/teamlead/viewtodayteamattendence">
                {" "}
                Team Attendance
              </Link>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <Card className="mt-2 w-full rounded-3xl shadow-sm shadow-green-50 max-w-sm sm:max-w-full">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-[#0067B8] text-3xl font-[Liberation Mono]">
            Today Absent Team Members{" "}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {loading ? (
            <div className="text-center text-blue-500">Loading...</div>
          ) : absentUsers.length === 0 ? (
            <div className="text-center text-red-500">
              No absent users for today.
            </div>
          ) : (
            <>
              <Table className="w-full text-left text-gray-800 rounded-3xl">
                <TableHeader className="bg-gray-100">
                  <TableRow>
                    <TableHead className="py-2 px-4">Name</TableHead>
                    <TableHead className="py-2 px-4">Job Type</TableHead>
                    <TableHead className="py-2 px-4">Designation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {absentUsers.map((user) => (
                    <TableRow
                      key={user._id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <TableCell className="py-2 px-4">
                        {user.fullName}
                      </TableCell>

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
              <div className="flex justify-between items-center mt-4">
                <Button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  variant="ghost"
                >
                  <ChevronLeft />
                </Button>
                <span className="text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  variant="ghost"
                >
                  <ChevronRight />
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
      <ToastContainer />
    </>
  )
}

export default AbsentTeamMember
