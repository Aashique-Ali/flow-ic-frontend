// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Badge } from "@/components/ui/badge";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   ChevronLeft,
//   ChevronRight,
//   LoaderCircle,
//   MoreHorizontalIcon,
//   PlusCircle,
//   Search,
// } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// const sampleProjects = [
//   { _id: "1", title: "Project Alpha", genre: "Ai", createdAt: "2023-07-15T14:48:00.000Z", coverImage: "https://via.placeholder.com/50" },
//   { _id: "2", title: "Project Beta", genre: "Ds", createdAt: "2023-07-18T09:30:00.000Z", coverImage: "https://via.placeholder.com/50" },
//   { _id: "3", title: "Project Gamma", genre: "Tech", createdAt: "2023-07-20T12:45:00.000Z", coverImage: "https://via.placeholder.com/50" },
//   { _id: "4", title: "Project Delta", genre: "Bs", createdAt: "2023-07-22T10:30:00.000Z", coverImage: "https://via.placeholder.com/50" },
//   { _id: "5", title: "Project Epsilon", genre: "Ai", createdAt: "2023-07-25T16:15:00.000Z", coverImage: "https://via.placeholder.com/50" },
//   { _id: "6", title: "Project Zeta", genre: "Adventure", createdAt: "2023-07-28T08:45:00.000Z", coverImage: "https://via.placeholder.com/50" },
//   { _id: "7", title: "Project Eta", genre: "Drama", createdAt: "2023-07-30T14:20:00.000Z", coverImage: "https://via.placeholder.com/50" },
//   { _id: "8", title: "Project Theta", genre: "Horror", createdAt: "2023-08-01T11:50:00.000Z", coverImage: "https://via.placeholder.com/50" },
// ];

// const ITEMS_PER_PAGE = 3;

// const ManageProject = () => {
//   const navigate = useNavigate();
//   const [projects, setProjects] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   const navigateToProjectPage = () => {
//     navigate(`/dashboard/projects/create`);
//   };

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         setLoading(true);
//         // Commenting out the API request
//         // const response = await axios.get('/api/projects');

//         // Use sampleProjects for now
//         // setProjects(response.data);
//         setProjects(sampleProjects);
//       } catch (err) {
//         setError("An error occurred while fetching projects.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProjects();
//   }, []);

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//     setCurrentPage(1); // Reset to first page when searching
//   };

//   const filteredProjects = projects.filter((project) =>
//     project.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
//   const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
//   const currentProjects = filteredProjects.slice(startIdx, startIdx + ITEMS_PER_PAGE);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage((prevPage) => prevPage + 1);
//     }
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage((prevPage) => prevPage - 1);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <LoaderCircle className="h-10 w-10 animate-spin" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <p className="text-red-500">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="flex items-center justify-between">
//         <Breadcrumb>
//           <BreadcrumbList>
//             <BreadcrumbItem>
//               <BreadcrumbLink to="/dashboard/home">Home</BreadcrumbLink>
//             </BreadcrumbItem>
//             <BreadcrumbSeparator />
//             <BreadcrumbItem>
//               <BreadcrumbLink to="#">Projects</BreadcrumbLink>
//             </BreadcrumbItem>
//           </BreadcrumbList>
//         </Breadcrumb>
//         <Button onClick={navigateToProjectPage} className='rounded-3xl bg-[#BA0D09] hover:bg-[#BA0D09]  '>
//           <PlusCircle size={20} />
//           <span className="ml-2 ">Add Project</span>
//         </Button>
//       </div>

//       <div className="flex items-center mt-4 mb-4">
//         <Input
//           type="text"
//           placeholder="Search projects by title"
//           value={searchQuery}
//           onChange={handleSearch}
//           className="flex-grow rounded-3xl"
          
//           />
        
//       </div>

//       <Card className="mt-2 w-full rounded-3xl shadow-sm shadow-green-50 max-w-sm sm:max-w-full">
//         <CardHeader>
//           <CardTitle>All Projects</CardTitle>
//           <CardDescription>
//             Manage your Projects and view their Team performance.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead className="w-[200px] sm:table-cell">
//                   <span className="sr-only">Image</span>
//                 </TableHead>
//                 <TableHead>Title</TableHead>
//                 <TableHead>Genre</TableHead>
//                 <TableHead className="hidden md:table-cell">Created at</TableHead>
//                 <TableHead>
//                   <span className="sr-only">Actions</span>
//                 </TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {currentProjects.map((project) => (
//                 <TableRow key={project._id}>
//                   <TableCell className="sm:table-cell">
//                     <img
//                       alt={project.title}
//                       className="aspect-square rounded-md object-cover"
//                       height="60"
//                       src={project.coverImage}
//                       width="50"
//                     />
//                   </TableCell>
//                   <TableCell className="font-medium">{project.title}</TableCell>
//                   <TableCell>
//                     <Badge variant="outline" className='bg-green-300 shadow-sm rounded-xl'>{project.genre}</Badge>
//                   </TableCell>
//                   <TableCell className="hidden md:table-cell">
//                     {new Date(project.createdAt).toLocaleDateString()}
//                   </TableCell>
//                   <TableCell>
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button aria-haspopup="true" size="icon" variant="ghost">
//                           <MoreHorizontalIcon />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end">
//                         <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                         <Link to={`/dashboard/projects/edit/${project._id}`}>
//                           <DropdownMenuItem>Edit</DropdownMenuItem>
//                         </Link>
//                         <Link to={`/dashboard/projects/delete/${project._id}`}>
//                           <DropdownMenuItem>Delete</DropdownMenuItem>
//                         </Link>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       <div className="flex justify-between items-center mt-4 p-4">
//         <Button
//           onClick={handlePrevPage}
//           disabled={currentPage === 1}
//           variant="ghost"
//         >
//           <ChevronLeft />
//         </Button>
//         <span className="text-lg">
//           Page {currentPage} of {totalPages}
//         </span>
//         <Button
//           onClick={handleNextPage}
//           disabled={currentPage === totalPages}
//           variant="ghost"
//         >
//           <ChevronRight />
//         </Button>
//       </div>
//       </Card>

//     </>
//   );
// };

// export default ManageProject;


import ComingSoon from "../../CommingSoon";




const ManageProject = () => {
  return (
   <>
<ComingSoon />
   
   </>
  )
}

export default ManageProject