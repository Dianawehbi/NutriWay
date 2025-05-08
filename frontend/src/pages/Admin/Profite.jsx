import React, { useState, useEffect } from "react";
import NavBar from "../../components/Admin/AdminNavBar.jsx";
import {
    FaUserMd,
    FaUsers,
    FaDollarSign,
    FaChartLine,
    FaCalendarAlt
} from "react-icons/fa";
import axios from "axios";
const Profite = () => {
    const [appointmentSales, setAppointmentSales] = useState([]);
    const [totalAppointmentSales, setTotalAppointmentSales] = useState(0);
    const [commission, setCommission] = useState(0);

    useEffect(() => {
        // Dummy sales data - Replace with real API call
        const fetchSalesData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/appointment`);
                console.log(response.data.data[0])
                if (response.data.success) {
                    const appointments = response.data.data;
                    const appointmentSales = appointments.filter(sale => sale.status === "completed");
                    setAppointmentSales(appointmentSales);
                }

                // Calculate totals
                let totalAppointment = 0;
                let commissionAmount = 0;

                appointmentSales.forEach(sale => {
                    totalAppointment += Number(sale.availability_id.price);
                    commissionAmount += Number(sale.availability_id.price) * 0.10;
                });

                setTotalAppointmentSales(totalAppointment);
                setCommission(commissionAmount);
            } catch (error) {
                console.log(error)
            }

        };

        fetchSalesData();
    }, []);

    // Statistics cards data
    const stats = [
        {
            title: "Total Revenue",
            value: `$${totalAppointmentSales}`,
            icon: <FaDollarSign className="text-green-500" />,
            trend: "↑ 12% from last month",
            trendColor: "text-green-500"
        },
        {
            title: "Total Commission",
            value: `$${commission}`,
            icon: <FaChartLine className="text-blue-500" />,
            trend: "10% of total sales",
            trendColor: "text-blue-500"
        },
        {
            title: "Total Appointments",
            value: appointmentSales.length,
            icon: <FaCalendarAlt className="text-purple-500" />,
            trend: "↑ 3 this week",
            trendColor: "text-purple-500"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <NavBar />
            <div className="p-6 space-y-8 mt-20 max-w-7xl mx-auto">
                {/* Page Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-800">Revenue Dashboard</h1>
                    <div className="text-sm text-gray-500">
                        Last updated: {new Date().toLocaleDateString()}
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                    <p className="text-3xl font-bold mt-2 text-gray-800">{stat.value}</p>
                                    <p className={`text-xs mt-1 ${stat.trendColor}`}>{stat.trend}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-gray-50">
                                    {stat.icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sales Overview */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">Sales Overview</h2>
                        <div className="flex space-x-4">
                            <div className="text-center">
                                <p className="text-sm text-gray-500">Total Sales</p>
                                <p className="text-lg font-bold text-green-600">${totalAppointmentSales}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm text-gray-500">Commission</p>
                                <p className="text-lg font-bold text-blue-600">${commission}</p>
                            </div>
                        </div>
                    </div>

                    {/* Appointment Sales Table */}
                    <div className="overflow-x-auto">
                        <div className="flex items-center gap-3 mb-4">
                            <FaUserMd className="text-xl text-purple-500" />
                            <h3 className="text-lg font-medium text-gray-700">Recent Appointments</h3>
                        </div>
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-sm font-medium text-gray-500 border-b">
                                    <th className="pb-3 pl-2">Client</th>
                                    <th className="pb-3">Date</th>
                                    <th className="pb-3">Price</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {appointmentSales.map((sale, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="py-3 pl-2">{sale.client_id?.username}</td>
                                        <td className="py-3">{new Date(sale.availability_id?.date).toLocaleDateString()}</td>
                                        <td className="py-3">${sale.availability_id?.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-between items-center mt-4 pt-4 border-t">
                            <p className="text-sm text-gray-500">
                                Showing {appointmentSales.length} appointments
                            </p>
                            <p className="text-sm font-medium text-gray-700">
                                Total: ${totalAppointmentSales}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profite;