// "use client";
// import ProtectedRoute from "@/app/components/protected/page";
// import { client } from "@/sanity/lib/client";
// import React from "react";
// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";

// interface Order {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   phone: number;
//   email: string;
//   address: string;
//   zipCode: number;
//   total: number;
//   discount: number;
//   orderDate: string;
//   status: string;
//   city: string;
//   cartItems: { name: string; image: string };
// }

// export default function AdminDashboard() {
//   const [orders, setOrders] = useState<Order[]>([]);

//   const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

//   const [filter, setFilter] = useState<string>("all");

//   useEffect(() => {
//     client
//       .fetch(
//         `*[ _type == "order"] {
//             _id,
//             firstName,
//             lastName,
//             phone,
//             email,
//             address,
//             zipCode,
//             total,
//             discount,
//             orderDate,
//             status,
//             city,
           
//             cartItem[] -> {
//                 name,
//                 image}

//             }`
//       )
//       .then((data) => setOrders(data))
//       .catch((error) => console.log("error fetching orders", error));
//   }, []);

//   const filteredOrders =
//     filter === "all"
//       ? orders
//       : orders.filter((order) => order.status === filter);

//   const toggleOrderDetails = (orderId: string) => {
//     setSelectedOrderId((prev) => (prev === orderId ? null : orderId));
//     const handleDelete = async (orderId: string) => {
//       const result = await Swal.fire({
//         title: "Are you sure?",
//         text: "You won't be able to revert this",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, delete it!",
//       });
//       if (!result.isConfirmed) return;
//       try {
//         await client.delete(orderId);
//         setOrders((prev) => prev.filter((order) => order._id !== orderId));
//         Swal.fire("Deleted!", "Your order has been deleted", "success");
//       } catch (error) {
//         Swal.fire(
//           "Error!",
//           "An error occurred while deleting the order",
//           "error"
//         );
//       }
//     };
//     const handleStatusChange = async (orderId: string, newStatus: string) => {
//       try {
//         await client.patch(orderId).set({ status: newStatus }).commit();

//         setOrders((prev) =>
//           prev.map((order) =>
//             order._id === orderId ? { ...order, status: newStatus } : order
//           )
//         );
//         if (newStatus === "dispatched") {
//           Swal.fire(
//             "Order dispatched!",
//             "The order has been dispatched",
//             "success"
//           );
//         } else if (newStatus === "success") {
//           Swal.fire(
//             "Order completed!",
//             "The order has been completed",
//             "success"
//           );
//         }
//       } catch (error) {
//         Swal.fire(
//           "Error!",
//           "An error occurred while updating the order",
//           "error"
//         );
//       }
//     };
//   };
//   function handleStatus(_id: string, value: string): void {
//     throw new Error("Function not implemented.");
//   }

//   function handleDelete(_id: string) {
//     throw new Error("Function not implemented.");
//   }

//   return (
//     <ProtectedRoute>
//       <div className="flex flex-col h-screen bg-grey-100">
//         <nav className="bg-neutral-800 text-white p-4 shadow-lg flex justify-between">
//           <h2 className="text-2xl font-bold">Admin Dashboard</h2>
//           <div className="flex space-x-4">
//             {["all", "pending", "dispatched", "success"].map((status) => (
//               <button
//                 key={status}
//                 className={`px-4 py-2 rounded-lg transition-all ${filter === status ? "bg-white text-red-500 font-bold" : "text-white"}`}
//                 onClick={() => setFilter(status)}
//               >
//                 {status.charAt(0).toUpperCase() + status.slice(1)}
//               </button>
//             ))}
//           </div>
//           <div></div>
//         </nav>

//         <div className="flex-1 p-6 overflow-y-auto">
//           <h2 className="text-2xl font-bold text-center">Order</h2>
//           <div className="flex overflow-y-auto bg-gray-200 rounded-lg shadow-sm gap-4 p-4">
//             <table>
//               <thead >
//                 <tr className="flex gap-12">
//                   <th>ID</th>
//                   <th>Customer</th>
//                   <th>Address</th>
//                   <th>Date</th>
//                   <th>Total</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {filteredOrders.map((order) => (
//                   <React.Fragment key={order._id}>
//                     <tr
//                       className="cursor-pointer hover:bg-gray-100 transition-all "
//                       onClick={() => toggleOrderDetails(order._id)}
//                     >
//                       <td>{order._id}</td> 
//                       <td>
//                         {order.firstName} {order.lastName}
//                       </td>
//                       <td>{order.address}</td>
//                       <td>{new Date(order.orderDate).toLocaleDateString()}</td>
//                       <td>${order.total}</td>
//                     </tr>
//                     <td>
//                     <select value={order.status || "" }
//                     onChange={(e) => handleStatus(order._id,e.target.value)}
//                     className="bg-gray-100 p-1 rounded"
//                     >
//                       <option value="">Select status</option>
//                       <option value="pending">Pending</option>
//                       <option value="dispatched">Dispatched</option>
//                       <option value="success">Success</option>

//                     </select>
//                     </td>
//                     <td className="px-6 py-4">
//                       <button onClick={(e) => {
//                         e.stopPropagation();
//                         handleDelete(order._id);
//                       }} className="bg-black-500 text-white px-3 py-1 hover:bg-gray-500 transition"> Delete

//                       </button>

//                     </td>
                   
//                   </React.Fragment>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// }












"use client";

import ProtectedRoute from "@/app/components/protected/page";
import { client } from "@/sanity/lib/client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Order {
  _id: string;
  firstName: string;
  lastName: string;
  phone: number;
  email: string;
  address: string;
  zipCode: number;
  total: number;
  discount: number;
  orderDate: string;
  status: string;
  city: string;
  cartItems: { name: string; image: string };
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    client
      .fetch(
        `*[ _type == "order"] {
            _id,
            firstName,
            lastName,
            phone,
            email,
            address,
            zipCode,
            total,
            discount,
            orderDate,
            status,
            city,
            cartItems[] -> { name, image }
        }`
      )
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  const filteredOrders =
    filter === "all" ? orders : orders.filter((order) => order.status === filter);

  const handleDelete = async (orderId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await client.delete(orderId);
      setOrders((prev) => prev.filter((order) => order._id !== orderId));
      Swal.fire("Deleted!", "Your order has been deleted", "success");
    } catch (error) {
      Swal.fire("Error!", "An error occurred while deleting the order", "error");
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await client.patch(orderId).set({ status: newStatus }).commit();

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );

      const statusMessage = newStatus === "dispatched"
        ? "The order has been dispatched!"
        : "The order has been completed!";
        
      Swal.fire("Status Updated!", statusMessage, "success");
    } catch (error) {
      Swal.fire("Error!", "An error occurred while updating the order", "error");
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen bg-grey-100">
        <nav className="bg-neutral-800 text-white p-4 shadow-lg flex justify-between">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          <div className="flex space-x-4">
            {["all", "pending", "dispatched", "success"].map((status) => (
              <button
                key={status}
                className={`px-4 py-2 rounded-lg transition-all ${
                  filter === status ? "bg-white text-red-500 font-bold" : "text-white"
                }`}
                onClick={() => setFilter(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </nav>

        <div className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold text-center">Orders</h2>
          <div className="flex overflow-y-auto bg-gray-200 rounded-lg shadow-sm gap-4 p-4">
            <table>
              <thead>
                <tr className="flex gap-12">
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Address</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-100 transition-all">
                    <td>{order._id}</td>
                    <td>{order.firstName} {order.lastName}</td>
                    <td>{order.address}</td>
                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td>${order.total}</td>
                    <td>
                      <select
                        value={order.status || ""}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="bg-gray-100 p-1 rounded"
                      >
                        <option value="">Select status</option>
                        <option value="pending">Pending</option>
                        <option value="dispatched">Dispatched</option>
                        <option value="success">Success</option>
                      </select>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(order._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
