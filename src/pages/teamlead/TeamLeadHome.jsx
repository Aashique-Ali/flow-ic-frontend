import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Eye, Star, Clipboard } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";


const TeamLeadHome = () => {
  const [projectCount, setProjectCount] = useState(12);
  const [userCount, setUserCount] = useState(0);
  const [totalOnlineUser, setTotalOnlineUser] = useState(0);
  const [present, setPresent] = useState(0);
  const [absent, setAbsent] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;

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
        const response = await axios.get(
          `${apiUrl}/api/attendance/getMyTeamMemberAttendanceStatus`
        );
        if (response.data && response.data.onlineUserAttendanceRecord) {
          const onlineCount = response.data.onlineUserAttendanceRecord.length;
          setTotalOnlineUser(onlineCount);
          const totalUsers = response.data.totalUser;
          setTotalUser(totalUsers);
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
    fetchUserData();
    fetchUserAttendance();
  }, []);

  const cardsData = [
    {
      title: ".................",
      value: "Team Lead Attendance",
      link: "/dashboard/teamlead/gettodayattendance",
      icon: <Star className="text-[#BA0D09] h-6 w-6" />,
    },
    {
      title: "Total Team Members",
      value: totalUser,
      link: "/dashboard/teamlead/team",
      icon: <Clipboard className="text-[#BA0D09] h-6 w-6" />,
    },
    {
      title: "Online Team Members",
      value: totalOnlineUser,
      link: "/dashboard/teamlead/viewtodayteamattendence",
      icon: <Eye className="text-[#BA0D09] h-6 w-6" />,
    },
    {
      title: "Present Members",
      value: present,
      link: "/dashboard/teamlead/presentmembers",
      icon: <User className="text-[#BA0D09] h-6 w-6" />,
    },
    {
      title: "Absent Members",
      value: absent,
      link: "/dashboard/teamlead/absentmembers",
      icon: <User className="text-[#BA0D09] h-6 w-6" />,
    },
  ];

  return (
    <>
      <div className="flex justify-start items-center px-4">
        <h3 className="text-3xl text-white py-2 px-4 font-bold font-sans bg-gradient-to-r from-[#3F88C0] to-[#3F88C0] rounded-3xl text-center leading-tight shadow-2xl z-10">
          <span className="relative">
            <span className="relative">T</span>
            <span className="relative">eam Lead Dashboard</span>
          </span>
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-6 p-8 sm:grid-cols-2 lg:grid-cols-3">
        {cardsData.map((card, index) => (
          <Link to={card.link} key={index}>
            <Card className="rounded-3xl p-4 border-gray-300 border-b-4">
              <div className="flex flex-col items-center">
                <div className="w-[50px] h-[50px] rounded-full shadow-inner shadow-blue-300 bg-blue-50 flex justify-center items-center">
                  {card.icon}
                </div>
              </div>

              <CardHeader className="flex flex-col items-center">
                <CardTitle className="text-2xl text-black font-semibold mt-2">
                  {card.title}
                </CardTitle>
                <div className="flex items-center justify-center space-x-2">
                  <span className=" shadow-inner text-blue-800  text-2xl font-bold shadow-blue-300 flex justify-center items-center px-3 py-1 rounded-full">
                    {card.value}
                  </span>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default TeamLeadHome;
