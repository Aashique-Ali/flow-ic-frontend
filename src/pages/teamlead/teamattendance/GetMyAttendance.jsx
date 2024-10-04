import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";


const GetMyAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        setLoading(true);
        const today = new Date();
        const monthNames = [
          "january",
          "february",
          "march",
          "april",
          "may",
          "june",
          "july",
          "august",
          "september",
          "october",
          "november",
          "december",
        ];

        const currentMonth = monthNames[today.getMonth()];

        const response = await axios.get(
          `${apiUrl}/api/attendance/getMyMonthAttendance/${currentMonth}`
        );
        setAttendanceData(response.data.monthAttendance);
      } catch (error) {
        toast.error("Error fetching attendance data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/teamlead">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/teamlead/attendance">
                My Attendance
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <Card className="mt-2 w-full rounded-3xl shadow-sm shadow-green-50 max-w-sm sm:max-w-full">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-[#0067B8] text-3xl font-[Liberation Mono]">
            {" "}
            Team Lead Monthly Attendance Report{" "}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {loading ? (
            <div className="text-center text-blue-500">Loading...</div>
          ) : attendanceData.length > 0 ? (
            <Table className="w-full text-left text-gray-800 rounded-3xl">
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="py-2 px-4">Date</TableHead>
                  <TableHead className="py-2 px-4">Check-In</TableHead>
                  <TableHead className="py-2 px-4">Check-Out</TableHead>
                  <TableHead className="py-2 px-4">Status</TableHead>
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
                      {attendance.checkIn?.time}
                    </TableCell>
                    <TableCell className="py-2 px-4">
                      {attendance.checkOut?.time || "N/A"}
                    </TableCell>
                    <TableCell className="py-2 px-4">
                      {attendance.status}
                    </TableCell>
                    <TableCell className="py-2 px-4">
                      {attendance.duration
                        ? `${attendance.duration.hours}h ${attendance.duration.minutes}m ${attendance.duration.seconds}s`
                        : "N/A"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center text-red-500">
              No attendance data available for this month.
            </div>
          )}
        </CardContent>
      </Card>
      <ToastContainer />
    </>
  );
};

export default GetMyAttendance;
