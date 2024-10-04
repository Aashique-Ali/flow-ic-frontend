import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const jobTypeMap = {
  1: "Full Time",
  2: "Part Time",
  3: "Full Time Intern",
  4: "Part Time Intern",
};

const roleMap = {
  1: "Admin",
  2: "Team Lead",
  3: "User",
};

const designationMap = {
  1: "Administrator",
  2: "Senior Web Developer",
  3: "Junior Web Developer",
  4: "Senior Flutter Developer",
  5: "Junior Flutter Developer",
  6: "Senior Python Developer",
  7: "Junior Python Developer",
  8: "Junior Graphic Designer",
  9: "Senior Graphic Designer",
  10: "Junior SEO Expert",
  11: "Senior SEO Expert",
  12: "Senior Backend Developer",
  13: "Junior Backend Developer",
};

const ViewTodayTeamAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [present, setPresent] = useState(0);
  const [absent, setAbsent] = useState(0);
  const [totalOnlineUser, setTotalOnlineUser] = useState(0);
  const [totalUser, selectedUser] = useState(0);

  useEffect(() => {
    const fetchUserAttendance = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${apiUrl}/api/attendance/getMyTeamMemberAttendanceStatus`
        );

        if (response.data && response.data.onlineUserAttendanceRecord) {
          const onlineCount = response.data.onlineUserAttendanceRecord.length;

          setAttendanceData(response.data.onlineUserAttendanceRecord);
          setTotalOnlineUser(onlineCount);
        } else {
          toast.error("No attendance data found");
        }
      } catch (err) {
        toast.error("An error occurred while fetching attendance data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchAbsentUsers = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/attendance/getAllTodayAbsentUsers`
        );
        setAbsent(response.data.count);
      } catch (err) {
        setError("An error occurred while fetching absent users data.");
        console.error(err);
      }
    };

    const fetchPresentUsers = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/attendance/getAllTodayPresentUsers`
        );

        setPresent(response.data.presentUsers.length);
      } catch (err) {
        setError("An error occurred while fetching present users data.");
        console.error(err);
      }
    };

    fetchAbsentUsers();
    fetchPresentUsers();
    fetchUserAttendance();
  }, []);

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link to="/dashboard/teamlead">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link to="/dashboard/teamlead/attendance">Attendance</Link>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="mt-2 w-full rounded-3xl shadow-sm shadow-green-50 max-w-sm sm:max-w-full">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-[#0067B8] text-3xl font-[Liberation Mono]">
            Today Attendance Report
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center mb-6 gap-6">
            <Button className="flex items-center justify-center gap-2 text-white hover:bg-[#0170B9] bg-[#0f4a71] text-xl font-bold px-6 py-6 rounded-3xl shadow-neumorphism transition-all duration-300 ease-in-out">
              <span className="text-white">Online</span>
              <span className="bg-green-200 text-blue-900 px-3 py-1 rounded-full">
                {totalOnlineUser}
              </span>
            </Button>

            <Link to="/dashboard/teamlead/absentmembers">
              <Button className="flex items-center justify-center gap-2 text-white hover:bg-[#0170B9] bg-[#0f4a71] text-xl font-bold px-6 py-6 rounded-3xl shadow-neumorphism transition-all duration-300 ease-in-out">
                <span className="text-white">Absent</span>
                <span className="bg-white text-blue-800 px-3 py-1 rounded-full">
                  {absent}
                </span>
              </Button>
            </Link>

            <Link to="/dashboard/teamlead/presentmembers">
              <Button className="flex items-center justify-center gap-2 text-white hover:bg-[#0170B9] bg-[#0f4a71] text-xl font-bold px-6 py-6 rounded-3xl shadow-neumorphism transition-all duration-300 ease-in-out">
                <span className="text-white">Present</span>
                <span className="bg-white text-blue-900 px-3 py-1 rounded-full">
                  {present}
                </span>
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="text-center text-blue-500">Loading...</div>
          ) : attendanceData.length === 0 ? (
            <div className="text-center text-red-500">
              No Record Available for the selected month...
            </div>
          ) : (
            <Table className="w-full text-left text-gray-800 rounded-3xl">
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="py-2 px-4">Name</TableHead>

                  <TableHead className="py-2 px-4">Job Type</TableHead>
                  <TableHead className="py-2 px-4">Role</TableHead>
                  <TableHead className="py-2 px-4">Designation</TableHead>
                  <TableHead className="py-2 px-4">Date</TableHead>
                  <TableHead className="py-2 px-4">Check-in Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceData.map((attendance) => (
                  <TableRow
                    key={attendance._id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <TableCell className="py-2 px-4">
                      {attendance.user.fullName}
                    </TableCell>

                    <TableCell className="py-2 px-4">
                      <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-blue-200 text-blue-800">
                        {jobTypeMap[attendance.user.jobType] || "N/A"}
                      </span>
                    </TableCell>
                    <TableCell className="py-2 px-4">
                      <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-purple-200 text-purple-800">
                        {roleMap[attendance.user.role] || "N/A"}
                      </span>
                    </TableCell>
                    <TableCell className="py-2 px-4">
                      <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-orange-200 text-orange-800">
                        {designationMap[attendance.user.designation] || "N/A"}
                      </span>
                    </TableCell>

                    <TableCell className="py-2 px-4">
                      {attendance.date}
                    </TableCell>
                    <TableCell className="py-2 px-4">
                      {attendance.checkIn?.time || "N/A"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default ViewTodayTeamAttendance;
