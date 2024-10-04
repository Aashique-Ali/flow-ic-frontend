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
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";


const PresentTeamMember = () => {
  const [presentUsers, setPresentUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;
  const apiUrl = import.meta.env.VITE_API_URL;


  useEffect(() => {
    const fetchPresentUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${apiUrl}/api/attendance/getAllTodayPresentUsers?page=${currentPage}&size=${pageSize}`
        );

        if (response.data && response.data.presentUsers) {
          setPresentUsers(response.data.presentUsers);
          setTotalPages(response.data.totalPages || 1);
        } else {
          toast.error("No present users data found");
        }
      } catch (err) {
        toast.error("An error occurred while fetching present users data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPresentUsers();
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

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
            Today Present Team Members
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {loading ? (
            <div className="text-center text-blue-500">Loading...</div>
          ) : presentUsers.length === 0 ? (
            <div className="text-center text-red-500">
              No present users for today.
            </div>
          ) : (
            <>
              <Table className="w-full text-left text-gray-800 rounded-3xl">
                <TableHeader className="bg-gray-100">
                  <TableRow>
                    <TableHead className="py-2 px-4">Name</TableHead>
                    <TableHead className="py-2 px-4">Check In</TableHead>
                    <TableHead className="py-2 px-4">Check Out</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {presentUsers.map((user) => (
                    <TableRow
                      key={user._id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <TableCell className="py-2 px-4">
                        {user.fullName}
                      </TableCell>
                      <TableCell className="py-2 px-4">
                        {user.checkIn}
                      </TableCell>
                      <TableCell className="py-2 px-4">
                        {user.checkOut}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-between items-center mt-4">
                <Button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="flex items-center justify-center"
                >
                  <ChevronLeft className="w-5 h-5 mr-1" />
                </Button>
                <span className="text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="flex items-center justify-center"
                >
                  <ChevronRight className="w-5 h-5 ml-1" />
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

export default PresentTeamMember;
