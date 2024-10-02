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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

const PresentUser = () => {
  const [presentUsers, setPresentUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
 
  useEffect(() => {
    const fetchPresentUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/attendance/getAllTodayPresentUsers`);
        
        if (response.data && response.data.presentUsers) {
          setPresentUsers(response.data.presentUsers);
          setFilteredUsers(response.data.presentUsers);
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
  }, []);

  // Search logic
  useEffect(() => {
    const results = presentUsers.filter((user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
    setCurrentPage(1); 
  }, [searchTerm, presentUsers]);

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link to="/dashboard/admin">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link to="/dashboard/admin/viewtodayattendence">
              Attendance
            </Link>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="mt-2 w-full rounded-3xl shadow-sm shadow-green-50 max-w-sm sm:max-w-full">
        <CardHeader className="flex justify-between items-center px-6 py-4">
          <CardTitle className="text-[#0067B8] mb-3 text-3xl font-[Liberation Mono]">Today Present User List </CardTitle>
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
              No present users for today.
            </div>
          ) : (
            <Table className="w-full text-left text-gray-800 rounded-3xl">
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="py-2 px-4">Name</TableHead>
                  <TableHead className="py-2 px-4">Check In</TableHead>
                  <TableHead className="py-2 px-4">Check Out</TableHead>
               
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentUsers.map((user) => (
                  <TableRow
                    key={user._id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <TableCell className="py-2 px-4">{user.fullName}</TableCell>
                    <TableCell className="py-2 px-4">{user.checkIn}</TableCell>
                    <TableCell className="py-2 px-4">{user.checkOut}</TableCell>

                   

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {/* Pagination */}
          {filteredUsers.length > usersPerPage && (
            <div className="flex justify-between space-x-2 mt-4">
              <Button
                className=""
                disabled={currentPage === 1}
                 variant="ghost"
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
  );
};

export default PresentUser;
