// AdminUserList.tsx
import React from "react";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: "Active" | "Inactive" | "Pending";
  totalBookings: number;
  lastLogin: string;
}

const users: User[] = [
  { id: 1, name: "Priya Sharma", email: "priya@gmail.com", phone: "9876543210", address: "Delhi, India", status: "Active", totalBookings: 12, lastLogin: "02-Dec-2025" },
  { id: 2, name: "Ravi Kumar", email: "ravi.kumar@gmail.com", phone: "9123456780", address: "Mumbai, India", status: "Pending", totalBookings: 5, lastLogin: "01-Dec-2025" },
  { id: 3, name: "Anjali Singh", email: "anjali.s@gmail.com", phone: "9988776655", address: "Bangalore, India", status: "Active", totalBookings: 20, lastLogin: "03-Dec-2025" },
  { id: 4, name: "Suresh Reddy", email: "suresh@gmail.com", phone: "9876123456", address: "Hyderabad, India", status: "Inactive", totalBookings: 0, lastLogin: "20-Nov-2025" },
];

const AdminUserList: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="h-8 w-8" />
          <span className="font-bold text-lg">HomeMaid Admin</span>
        </div>
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded">Logout</button>
        </div>
      </nav>

      {/* Page Content */}
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Users List</h1>

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bookings</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Login</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : user.status === "Inactive"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.totalBookings}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.lastLogin}</td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 text-sm">View</button>
                    <button className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-600 text-sm">Edit</button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 text-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUserList;
