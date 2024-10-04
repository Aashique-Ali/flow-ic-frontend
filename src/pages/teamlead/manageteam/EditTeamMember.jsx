import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "../../../auth/AuthContext";

const EditTeamMember = () => {
  const navigate = useNavigate();
  const [jobTypeOptions, setJobTypeOptions] = useState([]);
  const [designationOptions, setDesignationOptions] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);
  const [currUser, setCurrUser] = useState(null); 
  const apiUrl = import.meta.env.VITE_API_URL;


  const { id } = useParams();

  const { control, handleSubmit, register, reset, formState: { errors } } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      contact: "",
      address: "",
      password: "",
      companyId: "66ba0d4aeb042864cd040b6c",
      jobType: "",
      designation: "",
      role: "",
    },
  });

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/user/getUserById/${id}`);
      
        const userData = response.data?.user;
        
        setCurrUser(userData);
        
        
        reset({
          fullName: userData.fullName,
          email: userData.email,
          contact: userData.contact,
          address: userData.address,
          jobType: { value: userData.jobType.id, label: userData.jobType.name },
          designation: { value: userData.designation.id, label: userData.designation.name },
          role: { value: userData.role.id, label: userData.role.name },
        });
      } catch (error) {
        toast.error("User not found");
        console.error("User Fetch Error:", error);
      }
    };

    const fetchJobTypes = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/jobType/getALLJobTypes`);
        setJobTypeOptions(response.data.jobTypes.map(type => ({
          label: type.name,
          value: type.id,
        })));
      } catch (error) {
        toast.error("Failed to load job types");
        console.error("Job Type Error:", error);
      }
    };

    const fetchDesignations = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/designation/getAllDesignation`);
        setDesignationOptions(response.data.designations.map(designation => ({
          label: designation.name,
          value: designation.id,
        })));
      } catch (error) {
        toast.error("Failed to load designations");
        console.error("Designation Error:", error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/role/getAllRoles`);

        let roles = [];
        const role = response.data.roles;

        roles.push(role);
    
        const roleOptions = roles.map(({ name, id }) => ({
          label: name,
          value: id
        }));
    
        setRoleOptions(roleOptions);
        
      } catch (error) {
        toast.error("Failed to load roles");
        console.error("Role Error:", error);
      }
    };
    

    fetchJobTypes();
    fetchDesignations();
    fetchRoles();
    getCurrentUser();
  }, [id, reset]);

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      jobType: data.jobType.value,
      designation: data.designation.value,
      role: data.role.value,
    };

    console.log("Formatted Form Data:", formattedData);

    try {
      const updateduser = await axios.put(`${apiUrl}/api/user/updateUserRecord/${id}`,formattedData);
      
      toast.success("User updated successfully");
      navigate("/dashboard/teamlead/team");
    } catch (error) {
      if (error.response) {
        console.error("Error Response Data:", error.response.data);
        toast.error(`Server Error: ${error.response.data.message || 'An error occurred'}`);
      } else if (error.request) {
        console.error("Error Request Data:", error.request);
        toast.error("Network Error: No response received from the server");
      } else {
        console.error("Error Message:", error.message);
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to="/dashboard/teamlead">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link to="/dashboard/teamlead/team">Users</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link to="#">Edit</Link>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex gap-4">
          <Link to="/dashboard/teamlead/team">
            <Button variant="outline" className="hover:bg-yellow-500 rounded-3xl">Cancel</Button>
          </Link>
          <Button type="submit" className="bg-[#BA0D09] hover:bg-[#BA0D09] rounded-3xl" onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </div>
      </div>

      <Card className="mt-4 pb-8 rounded-3xl shadow-sm shadow-green-50">
        <CardHeader>
          <CardTitle className="text-[#0067B8] text-2xl font-[Liberation Mono]">Edit User</CardTitle>
          <CardDescription className="text-[#000] text-sm font-[Liberation Mono]">
            Fill out the form below to edit the user
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
            {/* Full Name Field */}
            <div className="w-full">
              <label htmlFor="fullName" className="block mb-2 font-medium">
                Full Name
              </label>
              <Input
                id="fullName"
                className="w-full rounded-3xl"
                {...register("fullName", { required: "Full name is required" })}
              />
              {errors.fullName && (
                <p className="text-red-500">{errors.fullName.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="w-full">
              <label htmlFor="email" className="block mb-2 font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                className="w-full rounded-3xl"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Contact Field */}
            <div className="w-full">
              <label htmlFor="contact" className="block mb-2 font-medium">
                Contact No
              </label>
              <Input
                id="contact"
                className="w-full rounded-3xl"
                {...register("contact", { required: "Contact is required" })}
              />
              {errors.contact && (
                <p className="text-red-500">{errors.contact.message}</p>
              )}
            </div>

            {/* Address Field */}
            <div className="w-full">
              <label htmlFor="address" className="block mb-2 font-medium">
                Address
              </label>
              <Input
                id="address"
                className="w-full rounded-3xl"
                {...register("address", { required: "Address is required" })}
              />
              {errors.address && (
                <p className="text-red-500">{errors.address.message}</p>
              )}
            </div>

            {/* Password Field */}
            {/* <div className="w-full">
              <label htmlFor="password" className="block mb-2 font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                className="w-full rounded-3xl"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div> */}

            {/* Job Type Field */}
            <div className="w-full">
              <label htmlFor="jobType" className="block mb-2 font-medium">
                Job Type
              </label>
              <Controller
                name="jobType"
                control={control}
                render={({ field }) => (
                  <Select
                    id="jobType"
                    options={jobTypeOptions}
                    className="w-full rounded-3xl"
                    {...field}
                  />
                )}
              />
              {errors.jobType && (
                <p className="text-red-500">{errors.jobType.message}</p>
              )}
            </div>

            {/* Role Field */}
            <div className="w-full">
              <label htmlFor="role" className="block mb-2 font-medium">
                Role
              </label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select
                    id="role"
                    options={roleOptions}
                    className="w-full rounded-3xl"
                    {...field}
                  />
                )}
              />
              {errors.role && (
                <p className="text-red-500">{errors.role.message}</p>
              )}
            </div>

            {/* Designation Field */}
            <div className="w-full">
              <label htmlFor="designation" className="block mb-2 font-medium">
                Designation
              </label>
              <Controller
                name="designation"
                control={control}
                render={({ field }) => (
                  <Select
                    id="designation"
                    options={designationOptions}
                    className="w-full rounded-3xl"
                    {...field}
                  />
                )}
              />
              {errors.designation && (
                <p className="text-red-500">{errors.designation.message}</p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default EditTeamMember;