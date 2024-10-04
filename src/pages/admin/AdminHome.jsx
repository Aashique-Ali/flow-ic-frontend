import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Eye, Clipboard } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axios from "axios";


const AdminHome = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [projectCount, setProjectCount] = useState(12);
  const [userCount, setUserCount] = useState(0);
  const [totalOnlineUser, setTotalOnlineUser] = useState(0);
  const [present, setPresent] = useState(0);
  const [absent, setAbsent] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiUrl}/api/user/getMyAllUsers`);
        if (response.data && response.data.myUsers) {
          setUserCount(response.data.myUsers.length);
        } else {
          setError("No user data found");
        }
      } catch (err) {
        setError("An error occurred while fetching user data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserAttendance = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiUrl}/api/attendance/getMyTeamMemberAttendanceStatus`);
        if (response.data && response.data.onlineUserAttendanceRecord) {
          setTotalOnlineUser(response.data.onlineUserAttendanceRecord.length);
          setTotalUser(response.data.totalUser);
        } else {
          setError("No attendance data found");
        }
      } catch (err) {
        setError("An error occurred while fetching attendance data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchAbsentUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/attendance/getAllTodayAbsentUsers`);
        setAbsent(response.data.count);
      } catch (err) {
        setError("An error occurred while fetching absent users data.");
        console.error(err);
      }
    };

    const fetchPresentUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/attendance/getAllTodayPresentUsers`);
        setPresent(response.data.presentUsers.length);
      } catch (err) {
        setError("An error occurred while fetching present users data.");
        console.error(err);
      }
    };

    
    fetchUserData();
    fetchUserAttendance();
    fetchAbsentUsers();
    fetchPresentUsers();
  }, []); 


  const cardsData = [
    {
      title: "Total Users",
      value: totalUser,
      link: "/dashboard/admin/team",
      icon: <Clipboard className="text-[#BA0D09] h-6 w-6" />,
    },
    {
      title: "Online Users",
      value: totalOnlineUser,
      link: "/dashboard/admin/viewtodayattendence",
      icon: <Eye className="text-[#BA0D09] h-6 w-6 " />,
    },
    {
      title: "Present Members",
      value: present,
      link: "/dashboard/admin/presentusers",
      icon: <User className="text-[#BA0D09]   h-6 w-6 " />,
    },
    {
      title: "Absent Members",
      value: absent,
      link: "/dashboard/admin/absentusers",
      icon: <User className="text-[#BA0D09] h-6 w-6 " />,
    },
    {
      title: "Active Projects",
      value: projectCount,
      link: "/dashboard/admin/projects",
      icon: <User className="text-[#BA0D09] h-6 w-6" />,
    },
  ];

  return (
    <>
      <div className="flex justify-start items-center px-4">
        <h3 className="text-3xl text-white py-2 px-4 font-bold font-sans bg-[#0170B9] hover:bg-[#0f4a71] shadow-neumorphism transition-all duration-300 ease-in-out rounded-3xl text-center leading-tight shadow-2xl z-10">
          <span className="relative">
            <span
              className="absolute -inset-1 rounded-xl blur-sm opacity-60"
              style={{ zIndex: -1 }}
            ></span>
            <span className="relative ">A</span>
            <span className="relative">
              dmin
              <span className="relative ml-4 ">D</span>
              ashboarD
            </span>
          </span>
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-6 p-8 sm:grid-cols-2 lg:grid-cols-3">
        {cardsData.map((card, index) => (
          <Link to={card.link} key={index}>
            <Card className="rounded-3xl p-4   border-gray-300 border-b-4  ">
              <div className="flex flex-col items-center ">
                <div className="w-[50px] h-[50px] rounded-full shadow-inner  shadow-blue-300 bg-blue-50 flex justify-center items-center">
                  {card.icon}
                </div>
              </div>

              <CardHeader className="flex flex-col items-center ">
                <CardTitle className="text-2xl text-black font-semibold mt-2">
                  {card.title}
                </CardTitle>
                <div className="flex items-center justify-center space-x-2">
                  {card.title === "Online Users" ? (
                    <>
                      <Button className="gap-2 text-white hover:bg-[#0170B9] bg-[#0f4a71] text-xl font-bold px-6 py-6 rounded-3xl shadow-neumorphism transition-all duration-300 ease-in-out">
                        <span className="text-white">Online</span>
                        <span className="bg-white text-black px-3 py-1 rounded-full">
                          {totalOnlineUser}
                        </span>
                      </Button>
                    </>
                  ) : (
                    <span className="shadow-inner text-[#BA0D09]  text-2xl font-bold shadow-blue-300 flex justify-center items-center px-3 py-1 rounded-full">
                      {card.value}
                    </span>
                  )}
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default AdminHome;
