// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   BarChart, Bar, CartesianGrid, Tooltip, XAxis, YAxis, PieChart, Pie, RadialBarChart, RadialBar,
//   LineChart, Line, AreaChart, Area, ScatterChart, Scatter
// } from "recharts";

// // Sample data
// const barChartData = [
//   { month: "Jan", sales: 400, revenue: 2400 },
//   { month: "Feb", sales: 300, revenue: 2210 },
//   { month: "Mar", sales: 500, revenue: 2290 },
//   { month: "Apr", sales: 200, revenue: 2000 },
//   { month: "May", sales: 278, revenue: 2500 },
//   { month: "June", sales: 189, revenue: 2100 },
// ];

// const pieChartData = [
//   { name: "Fiction", value: 400, fill: "#ff6384" },
//   { name: "Non-Fiction", value: 300, fill: "#36a2eb" },
//   { name: "Children", value: 300, fill: "#ffce56" },
//   { name: "Others", value: 200, fill: "#4bc0c0" },
// ];

// const radialBarChartData = [
//   { name: "January", uv: 31.47, pv: 2400, fill: "#8884d8" },
//   { name: "February", uv: 26.69, pv: 2210, fill: "#83a6ed" },
//   { name: "March", uv: 15.69, pv: 2290, fill: "#8dd1e1" },
//   { name: "April", uv: 8.22, pv: 2000, fill: "#82ca9d" },
//   { name: "May", uv: 8.63, pv: 2500, fill: "#a4de6c" },
//   { name: "June", uv: 6.67, pv: 2100, fill: "#d0ed57" },
// ];

// const lineChartData = [
//   { month: "January", visitors: 4000 },
//   { month: "February", visitors: 3000 },
//   { month: "March", visitors: 5000 },
//   { month: "April", visitors: 4000 },
//   { month: "May", visitors: 3000 },
//   { month: "June", visitors: 2000 },
// ];

// const areaChartData = [
//   { month: "January", profit: 2400 },
//   { month: "February", profit: 2210 },
//   { month: "March", profit: 2290 },
//   { month: "April", profit: 2000 },
//   { month: "May", profit: 2500 },
//   { month: "June", profit: 2100 },
// ];

// const scatterChartData = [
//   { x: 100, y: 200, z: 200 },
//   { x: 120, y: 100, z: 260 },
//   { x: 170, y: 300, z: 400 },
//   { x: 140, y: 250, z: 280 },
//   { x: 150, y: 400, z: 500 },
//   { x: 110, y: 280, z: 200 },
// ];


// const CheckPerformance = () => {
//   return (
//     <>
    
//     <div className="flex items-center">
//         <h1 className="text-lg font-semibold md:text-2xl">Performace Evalutions </h1>
//       </div>
//       <div className="flex flex-1 flex-col items-center justify-center rounded-lg ">
//         <div className="flex flex-wrap justify-center gap-4">

//           {/* Bar Chart */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Bar Chart - Sales and Revenue</CardTitle>
//               <CardDescription>January - June 2024</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <BarChart width={500} height={300} data={barChartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
//                 <CartesianGrid />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="sales" stackId="a" fill="#312393" />
//                 <Bar dataKey="revenue" stackId="a" fill="#569DAA" />
//               </BarChart>
//             </CardContent>
//           </Card>

//           {/* Pie Chart */}
//           <Card className="flex-1">
//             <CardHeader>
//               <CardTitle>Pie Chart - Book Categories</CardTitle>
//               <CardDescription>Distribution of Book Sales by Category</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <PieChart width={500} height={300}>
//                 <Pie data={pieChartData} dataKey="value" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label />
//                 <Tooltip />
//               </PieChart>
//             </CardContent>
//           </Card>

//           {/* Radial Bar Chart */}
//           <Card className="flex-1">
//             <CardHeader>
//               <CardTitle>Radial Bar Chart - Monthly UV</CardTitle>
//               <CardDescription>January - June 2024</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <RadialBarChart width={500} height={300} cx={150} cy={150} innerRadius={20} outerRadius={140} barSize={10} data={radialBarChartData}>
//                 <RadialBar minAngle={15} background clockWise dataKey="uv" />
//                 <Tooltip />
//               </RadialBarChart>
//             </CardContent>
//           </Card>

//           {/* Line Chart */}
//           <Card className="flex-1">
//             <CardHeader>
//               <CardTitle>Line Chart - Visitors</CardTitle>
//               <CardDescription>January - June 2024</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <LineChart width={500} height={300} data={lineChartData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="visitors" stroke="#8884d8" />
//               </LineChart>
//             </CardContent>
//           </Card>

//           {/* Area Chart */}
//           <Card className="flex-1">
//             <CardHeader>
//               <CardTitle>Area Chart - Profit</CardTitle>
//               <CardDescription>January - June 2024</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <AreaChart width={500} height={300} data={areaChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip />
//                 <Area type="monotone" dataKey="profit" stroke="#8884d8" fill="#8884d8" />
//               </AreaChart>
//             </CardContent>
//           </Card>

//           {/* Scatter Chart */}
//           <Card className="flex-1">
//             <CardHeader>
//               <CardTitle>Scatter Chart - Example Data</CardTitle>
//               <CardDescription>Sample Scatter Chart</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <ScatterChart width={500} height={300}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis type="number" dataKey="x" name="stature" unit="cm" />
//                 <YAxis type="number" dataKey="y" name="weight" unit="kg" />
//                 <Tooltip cursor={{ strokeDasharray: '3 3' }} />
//                 <Scatter name="A school" data={scatterChartData} fill="#8884d8" />
//               </ScatterChart>
//             </CardContent>
//           </Card>
          
//         </div>
//       </div>
    
//     </>
//   )
// }

// export default CheckPerformance
import ComingSoon from "../../CommingSoon";




const CheckPerformance = () => {
  return (
   <>
<ComingSoon />
   
   </>
  )
}

export default CheckPerformance
