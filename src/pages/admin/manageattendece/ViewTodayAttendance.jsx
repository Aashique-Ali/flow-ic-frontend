import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
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
import { ChevronLeft, ChevronRight, X } from "lucide-react";
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

const deleteAttendance = async (id) => {
  await axios.delete(`/api/attendance/delete/${id}`);
  toast.success("Attendance deleted successfully");
};

const ViewTodayAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [present, setPresent] = useState(0);
  const [absent, setAbsent] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [totalOnlineUsers, setTotalOnlineUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUserAttendance = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/attendance/getMyTeamMemberAttendanceStatus`
        );

        if (response.data && response.data.onlineUserAttendanceRecord) {
          const onlineCount = response.data.onlineUserAttendanceRecord.length;

          setTotalOnlineUsers(onlineCount);

          const totalUsers = response.data.totalUser;

          setAttendanceData(response.data.onlineUserAttendanceRecord);

          setTotalUser(totalUsers);
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
          `/api/attendance/getAllTodayAbsentUsers`
        );

        console.log("Absent Members ", response.data.count);

        setAbsent(response.data.count);
      } catch (err) {
        setError("An error occurred while fetching absent users data.");
        console.error(err);
      }
    };

    const fetchPresentUsers = async () => {
      try {
        const response = await axios.get(
          `/api/attendance/getAllTodayPresentUsers`
        );

        setPresent(response.data.presentUsers.length);

        console.log("Present Memebers ", response.data.presentUsers.length);
      } catch (err) {
        setError("An error occurred while fetching present users data.");
        console.error(err);
      }
    };

    fetchAbsentUsers();
    fetchPresentUsers();
    fetchUserAttendance();
  }, [deleteAttendance]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Filter data based on the search term
  const filteredData = attendanceData.filter((attendance) =>
    attendance.user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link to="/dashboard/admin">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link to="/dashboard/admin/attendance">Attendance</Link>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="mt-2 w-full rounded-3xl shadow-sm shadow-green-50 max-w-sm sm:max-w-full">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-[#0067B8] text-3xl font-[Liberation Mono]">
            {" "}
            Total Online Members Report{" "}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-6 gap-6">
            <Button className="flex items-center justify-center gap-2 text-white hover:bg-[#0170B9] bg-[#0f4a71] text-xl font-bold px-6 py-6 rounded-3xl shadow-neumorphism transition-all duration-300 ease-in-out">
              <span className="text-white">Online</span>
              <span className="bg-white text-blue-900 px-3 py-1 rounded-full shadow-inner">
                {totalOnlineUsers}
              </span>
            </Button>

            <Link to="/dashboard/admin/absentusers">
              <Button className="flex items-center justify-center gap-2 text-white hover:bg-[#0170B9] bg-[#0f4a71] text-xl font-bold px-6 py-6 rounded-3xl shadow-neumorphism transition-all duration-300 ease-in-out">
                <span className="text-white">Absent</span>
                <span className="bg-white text-blue-900 px-3 py-1 rounded-full shadow-inner">
                  {absent}
                </span>
              </Button>
            </Link>

            <Link to="/dashboard/admin/presentusers">
              <Button className="flex items-center justify-center gap-2 text-white hover:bg-[#0170B9] bg-[#0f4a71] text-xl font-bold px-6 py-6 rounded-3xl shadow-neumorphism transition-all duration-300 ease-in-out">
                <span className="text-white">Present</span>
                <span className="bg-white text-blue-900 px-3 py-1 rounded-full shadow-inner">
                  {present}
                </span>
              </Button>
            </Link>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-lg w-full"
            />
          </div>

          {loading ? (
            <div className="text-center text-blue-500">Loading...</div>
          ) : filteredData.length === 0 ? (
            <div className="text-center text-red-500">
              No Record Available for the selected search...
            </div>
          ) : (
            <>
              <Table className="w-full text-left text-gray-800 rounded-3xl">
                <TableHeader className="bg-gray-100">
                  <TableRow>
                    <TableHead className="py-4 px-4">Name</TableHead>
                    <TableHead className="py-8 px-4">Job Type</TableHead>
                    <TableHead className="py-2 px-4">Role</TableHead>
                    <TableHead className="py-2 px-4">Designation</TableHead>
                    <TableHead className="py-2 px-4">Date</TableHead>
                    <TableHead className="py-2 px-4">Check-in Time</TableHead>
                    <TableHead className="py-2 px-4">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.map((attendance) => (
                    <TableRow
                      key={attendance._id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <TableCell className="py-2 px-4">
                        {attendance.user.fullName}
                      </TableCell>
                      <TableCell className="py-2 px-4">
                        <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-blue-200">
                          {jobTypeMap[attendance.user.jobType] || "N/A"}
                        </span>
                      </TableCell>
                      <TableCell className="py-2 px-4">
                        <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-green-200 ">
                          {roleMap[attendance.user.role] || "N/A"}
                        </span>
                      </TableCell>
                      <TableCell className="py-2 px-4">
                        <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-orange-100 ">
                          {designationMap[attendance.user.designation] || "N/A"}
                        </span>
                      </TableCell>
                      <TableCell className="py-2 px-4">
                        {attendance.date}
                      </TableCell>
                      <TableCell className="py-2 px-4">
                        {attendance.checkIn?.time || "N/A"}
                      </TableCell>
                      <TableCell className="py-2 px-4">
                        <button
                          className="px-3 py-2 rounded-full  text-red-500 bg-red-300 hover:bg-red-100 transition-colors duration-200 ease-in-out flex items-center justify-center"
                          onClick={() => {
                            deleteAttendance(attendance._id);
                          }}
                        >
                          <X className="w-4 h-4 text-xl font-bold" />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination controls */}

              <div className="flex justify-between items-center ">
                <Button
                  variant="ghost"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft />
                </Button>
                <span>
                  Page {currentPage} of{" "}
                  {Math.ceil(filteredData.length / itemsPerPage)}
                </span>

                <Button
                  variant="ghost"
                  onClick={handleNextPage}
                  disabled={
                    currentPage ===
                    Math.ceil(filteredData.length / itemsPerPage)
                  }
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
  );
};

export default ViewTodayAttendance;
