import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { X } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInDays } from "date-fns";
import { Badge } from "@/components/ui/badge";

const sampleData = [
  {
    id: 1,
    user: {
      image: "https://via.placeholder.com/50",
      name: "Jack Dylen",
      role: "UI/UX Designer",
    },
    status: "Pending Approval",
    type: "PTO",
    startDate: "2022-07-01", // ISO date format
    endDate: "2022-07-04",
    duration: "3 days",
  },
  {
    id: 2,
    user: {
      image: "https://via.placeholder.com/50",
      name: "Ivan Bryant",
      role: "Product Designer",
    },
    status: "Approved",
    type: "Sick Leave",
    startDate: "2022-08-10",
    endDate: "2022-08-12",
    duration: "2 days",
  },
];

const TimeOffDetails = () => {
  const [request, setRequest] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [calculatedDuration, setCalculatedDuration] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequest = () => {
      try {
        const data = sampleData.find((item) => item.id === 1);
        setRequest(data);
        setFromDate(new Date(data.startDate));
        setToDate(new Date(data.endDate));
      } catch (error) {
        console.error("Error fetching the request data:", error);
      }
    };

    fetchRequest();
  }, []);

  useEffect(() => {
    if (fromDate && toDate) {
      const duration = differenceInDays(toDate, fromDate) + 1;
      setCalculatedDuration(`${duration} days`);
    }
  }, [fromDate, toDate]);

  const handleApprove = () => {
    try {
      toast.success("Request approved");
      setTimeout(() => {
        navigate("/dashboard/admin/leaves");
      }, 1000);
    } catch (error) {
      console.error("Error approving the request:", error);
      toast.error("Failed to approve the request.");
    }
  };

  const handleReject = () => {
    try {
      toast.error("Request rejected");
      setTimeout(() => {
        navigate("/dashboard/admin/leaves");
      }, 1000);
    } catch (error) {
      console.error("Error rejecting the request:", error);
      toast.error("Failed to reject the request.");
    }
  };

  if (!request) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer />
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink to="/dashboard/leaves">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink to="#">Leaves</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="bg-gray-50 flex items-start justify-center">
        <Card className="max-w-5xl mx-auto p-8 rounded-3xl ">
          <CardHeader className="flex justify-between items-center border-b pb-4">
            <CardTitle className="text-2xl font-semibold text-gray-800">
              {" "}
              Leave Requests{" "}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-center mb-6">
              <img
                src={request.user.image}
                alt={request.user.name}
                className="w-16 h-16 rounded-full border border-gray-300 mr-4 shadow-sm"
              />
              <div>
                <h4 className="font-bold text-xl text-gray-800">
                  {request.user.name}
                </h4>
                <p className="text-sm text-gray-500">{request.user.role}</p>
              </div>
              <span
                className={`ml-auto px-4 py-1 rounded-full text-sm font-semibold ${
                  request.status === "Approved"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {request.status}
              </span>
            </div>

            <div className="mb-6 space-y-6">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">
                  Time of detials
                </span>
                <span className="text-gray-800">{request.type}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">
                  Select Dates
                </span>
                <div className="flex items-center ml-2 space-x-4">
                  <DatePicker
                    selected={fromDate}
                    onChange={(date) => setFromDate(date)}
                    dateFormat="MMM dd, yyyy"
                    className="border border-gray-300 p-2 rounded-3xl "
                  />
                  <span className="mx-2 font-bold">to</span>
                  <DatePicker
                    selected={toDate}
                    onChange={(date) => setToDate(date)}
                    dateFormat="MMM dd, yyyy"
                    className="border border-gray-300 rounded-3xl p-2"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">
                  Calculated Duration:
                </span>
                <span className="text-gray-800">
                  {calculatedDuration || request.duration}
                </span>
              </div>
            </div>

            <div className="flex justify-center gap-6 mt-8">
              <Badge
                onClick={handleApprove}
                variant="ghost"
                className="w-1/3 text-lg px-14 text-center py-3 font-semibold rounded-full bg-green-100 text-green-700 hover:bg-green-200 hover:cursor-pointer transition-all"
              >
                Approve
              </Badge>

              <Badge
                onClick={handleReject}
                variant="ghost"
                className="w-1/3 text-lg px-14 text-center py-3 font-semibold rounded-full bg-red-100 text-red-700 hover:bg-red-200 hover:cursor-pointer transition-all"
              >
                Reject
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default TimeOffDetails;



