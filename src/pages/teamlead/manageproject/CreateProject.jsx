// import React from "react";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import Select from "react-select";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { LoaderCircle } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const teamMembersList = [
//   { label: "Member 1", value: "member1" },
//   { label: "Member 2", value: "member2" },
//   { label: "Member 3", value: "member3" },
//   // Add more team members as needed
// ];

// const TeamLeadList = [
//   { label: "Team Lead 1", value: "teamLead1" },
//   { label: "Team Lead 2", value: "teamLead2" },
//   { label: "Team Lead 3", value: "teamLead3" },
//   // Add more team leads as needed
// ];

// const CreateProject = () => {
//   const navigate = useNavigate();

//   const form = useForm({
//     defaultValues: {
//       title: "",
//       genre: "",
//       description: "",
//       assignedTo: [],
//       assignedBy: [],
//     },
//   });

//   const coverImageRef = form.register("coverImage");
//   const fileRef = form.register("file");

//   const onSubmit = async (values) => {
//     const formData = new FormData();
//     formData.append("title", values.title);
//     formData.append("genre", values.genre);
//     formData.append("description", values.description);
//     formData.append("coverImage", values.coverImage[0]);
//     formData.append("file", values.file[0]);
//     formData.append("assignedTo", JSON.stringify(values.assignedTo));
//     formData.append("assignedBy", JSON.stringify(values.assignedBy));

//     try {
//       await axios.post("/api/projects", formData);
//       toast.success("Project created successfully");
//       navigate("/dashboard/projects");
//     } catch (err) {
//       toast.error("An error occurred while creating the project");
//     }
//   };

//   return (
//     <section>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)}>
//           <div className="flex items-center justify-between">
//             <Breadcrumb>
//               <BreadcrumbList>
//                 <BreadcrumbItem>
//                   <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
//                 </BreadcrumbItem>
//                 <BreadcrumbSeparator />
//                 <BreadcrumbItem>
//                   <BreadcrumbLink href="/dashboard/projects">
//                     Projects
//                   </BreadcrumbLink>
//                 </BreadcrumbItem>
              
             
//               </BreadcrumbList>
//             </Breadcrumb>
//             <div className="flex items-center gap-4">
//               <Link to="/dashboard/projects">
//                 <Button variant={"outline"}  className="rounded-3xl hover:bg-yellow-500 hover:text-white hover:rounded-3xl">
//                   <span >Cancel</span>
//                 </Button>
//               </Link>
//               <Button type="submit"  className="rounded-3xl bg-[#BA0D09] hover:bg-[#BA0D09] hover:text-white hover:rounded-3xl">
               
//                 <span>Submit</span>
//               </Button>
//             </div>
//           </div>
//           <Card className="mt-4 pb-8 rounded-3xl shadow-sm shadow-green-50 ">
//             <CardHeader>
//               <CardTitle>Create a new Project</CardTitle>
//               <CardDescription>
//                 Fill out the form below to create a new Project.
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid gap-6">
//                 <FormField
//                   control={form.control}
//                   name="title"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Title</FormLabel>
//                       <FormControl>
//                         <Input {...field} className='rounded-3xl ' />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="genre"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Genre</FormLabel>
//                       <FormControl>
//                         <Input {...field} className='rounded-3xl' />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="description"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Description</FormLabel>
//                       <FormControl>
//                         <Textarea {...field} className='rounded-xl'  />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="coverImage"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Cover Image</FormLabel>
//                       <FormControl>
//                         <Input type="file" {...field} ref={coverImageRef} className='rounded-3xl'  />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="file"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>File</FormLabel>
//                       <FormControl>
//                         <Input type="file" {...field} ref={fileRef} className='rounded-3xl hover'  />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
               
//                   control={form.control}
//                   name="assignedTo"
               
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Assigned To</FormLabel>
//                       <FormControl >
//                         <Select
//                           isMulti
//                           options={teamMembersList}
//                           value={field.value.map((val) =>
//                             teamMembersList.find(
//                               (option) => option.value === val
//                             )
//                           )}
//                           onChange={(selected) =>
                      
//                             form.setValue(
//                               "assignedTo",
//                               selected.map((opt) => opt.value)
//                             )
//                           }
//                           placeholder="Select team members"
                          
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="assignedBy"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Assigned By</FormLabel>
//                       <FormControl>
//                         <Select
//                           isMulti
//                           options={TeamLeadList}
//                           value={field.value.map((val) =>
//                             TeamLeadList.find((option) => option.value === val)
//                           )}
//                           onChange={(selected) =>
//                             form.setValue(
//                               "assignedBy",
//                               selected.map((opt) => opt.value)
//                             )
//                           }
//                           placeholder="Select team leads"
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//             </CardContent>
//           </Card>
//         </form>
//       </Form>
//     </section>
//   );
// };

// export default CreateProject;


import React from 'react'
import ComingSoon from '@/pages/CommingSoon'

const CreateProject = () => {
  return (
    <>
    
    <ComingSoon /> 
    </>
  )
}

export default CreateProject