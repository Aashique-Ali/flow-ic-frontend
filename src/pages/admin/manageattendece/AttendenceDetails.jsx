import React, { useState, useEffect } from "react"
import { ToastContainer, toast } from "react-toastify"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { useParams, Link } from "react-router-dom"
import api from "@/lib/api"

const AttendanceDetails = () => {
  const [attendanceData, setAttendanceData] = useState([])
  const [userData, setUserData] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [loading, setLoading] = useState(false)
  const apiUrl = import.meta.env.VITE_API_URL
  let { id } = useParams()

  const fetchAttendanceData = async (date) => {
    setLoading(true)
    setAttendanceData([])
    try {
      const month = date
        .toLocaleString("default", { month: "long" })
        .toLowerCase()
      const year = date.getFullYear()

      const response = await api.get(
        `/attendance/getMyMonthAttendanceById?userid=${id}&&month=${month}`
      )

      console.log(response.data.monthAttendance)

      if (response.data.success && response.data.monthAttendance.length > 0) {
        setAttendanceData(response.data.monthAttendance)
      } else {
        toast.error("No Record Available for the selected month.")
      }
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAttendanceData(selectedDate)

    const fetchUserInfo = async () => {
      try {
        const response = await api.get(`/user/getUserById/${id}`)
        setUserData(response.data.user)
      } catch (error) {
        console.log(error)
      }
    }

    fetchUserInfo()
  }, [selectedDate, id])

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link to="/dashboard/admin/home">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link href="/dashboard/admin/attendance">Attendance</Link>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="mt-2 w-full rounded-3xl shadow-sm shadow-green-50 max-w-sm sm:max-w-full">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-[#0067B8] text-3xl font-[Liberation Mono]">
            Attendance Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 ">
          <h2 className="text-[#0067B8] text-2xl font-sm font-bold mb-3 font-[Liberation Mono]">
            User Information
          </h2>
          <h2 className="text-gray-700 font-bold mb-2">
            <span className="text-[#A32D2F] font-bold"> Name : </span>
            {userData.fullName}
          </h2>
          <h2 className=" text-gray-700 font-bold mb-4">
            <span className="text-[#A32D2F] font-bold"> Email : </span>{" "}
            {userData.email}
          </h2>

          <div className="flex justify-between items-center mb-6">
            <div></div>
            <div className="flex">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                className="p-2 border rounded-3xl text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center text-blue-500">Loading...</div>
          ) : attendanceData.length === 0 ? (
            <div className="text-center text-red-500">
              No Record Available for the selected month...
            </div>
          ) : (
            <Table className="w-full text-left text-gray-800 rounded-3xl">
              <TableHeader className="bg-gray-100 ">
                <TableRow>
                  <TableHead className="py-2 px-4">Date</TableHead>
                  <TableHead className="py-2 px-4">Check-in</TableHead>
                  <TableHead className="py-2 px-4">Check-out</TableHead>
                  <TableHead className="py-2 px-4">Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceData.map((attendance) => (
                  <TableRow
                    key={attendance._id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <TableCell className="py-2 px-4">
                      {attendance.date}
                    </TableCell>
                    <TableCell className="py-2 px-4">
                      {attendance.checkIn || "N/A"}
                    </TableCell>
                    <TableCell className="py-2 px-4">
                      {attendance.checkOut || "N/A"}
                    </TableCell>
                    <TableCell className="py-2 px-4">
                      {attendance.duration?.hours} hrs{" "}
                      {attendance.duration?.minutes} mins
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default AttendanceDetails
