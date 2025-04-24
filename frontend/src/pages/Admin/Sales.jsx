import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import { FaBox, FaUserMd } from "react-icons/fa"; // Icons for product and consultation sections

const SalesPage = () => {
    const [productSales, setProductSales] = useState([]);
    const [appointmentSales, setAppointmentSales] = useState([]);
    const [totalProductSales, setTotalProductSales] = useState(0);
    const [totalAppointmentSales, setTotalAppointmentSales] = useState(0);
    const [commission, setCommission] = useState(0);

    useEffect(() => {
        // Dummy sales data - Replace with real API call
        const fetchSalesData = async () => {
            const sales = [
                // Product Sales
                { type: "Product", name: "Protein Bars", amount: 100, price: 10 },
                { type: "Product", name: "Almond Milk", amount: 200, price: 5 },
                // Appointment Sales
                { type: "Consultation", client: "John Doe", amount: 1, price: 50 },
                { type: "Consultation", client: "Jane Smith", amount: 1, price: 60 },
            ];

            const productSales = sales.filter(sale => sale.type === "Product");
            const appointmentSales = sales.filter(sale => sale.type === "Consultation");

            setProductSales(productSales);
            setAppointmentSales(appointmentSales);

            // Calculate total product sales and appointment sales with commission
            let totalProduct = 0;
            let totalAppointment = 0;
            let commissionAmount = 0;

            productSales.forEach(sale => {
                totalProduct += sale.amount * sale.price;
            });

            appointmentSales.forEach(sale => {
                totalAppointment += sale.amount * sale.price;
                commissionAmount += (sale.amount * sale.price) * 0.10; // 10% commission on appointments
            });

            setTotalProductSales(totalProduct);
            setTotalAppointmentSales(totalAppointment);
            setCommission(commissionAmount);
        };

        fetchSalesData();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-green-100">
            <NavBar />
            <div className="p-6 space-y-8 mt-20">
                {/* Sales Summary Section */}
                <div className="bg-white p-8 rounded-xl shadow-xl space-y-4">
                    <h2 className="text-3xl font-semibold text-center text-gray-700">Sales Summary</h2>
                    <div className="flex justify-between items-center">
                        <div className="text-center space-y-2">
                            <p className="text-2xl font-bold text-green-600">Total Sales</p>
                            <p className="text-3xl font-semibold text-gray-800">${totalProductSales + totalAppointmentSales}</p>
                        </div>
                        <div className="text-center space-y-2">
                            <p className="text-2xl font-bold text-blue-600">Admin Commission</p>
                            <p className="text-3xl font-semibold text-gray-800">${commission}</p>
                        </div>
                    </div>
                </div>

                {/* Product Sales Section */}
                <div className="bg-white p-8 rounded-xl shadow-xl">
                    <div className="flex items-center gap-4 mb-6">
                        <FaBox className="text-3xl text-yellow-500" />
                        <h3 className="text-xl font-semibold text-gray-700">Product Sales</h3>
                    </div>
                    <table className="w-full table-auto text-center">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2 bg-gray-100">Product</th>
                                <th className="border px-4 py-2 bg-gray-100">Amount Sold</th>
                                <th className="border px-4 py-2 bg-gray-100">Price</th>
                                <th className="border px-4 py-2 bg-gray-100">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productSales.map((sale, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{sale.name}</td>
                                    <td className="border px-4 py-2">{sale.amount}</td>
                                    <td className="border px-4 py-2">${sale.price}</td>
                                    <td className="border px-4 py-2">${sale.amount * sale.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="text-right mt-4">
                        <p className="text-lg font-medium text-gray-700">Total Product Sales: ${totalProductSales}</p>
                    </div>
                </div>

                {/* Appointment Sales Section */}
                <div className="bg-white p-8 rounded-xl shadow-xl">
                    <div className="flex items-center gap-4 mb-6">
                        <FaUserMd className="text-3xl text-purple-500" />
                        <h3 className="text-xl font-semibold text-gray-700">Appointment Sales</h3>
                    </div>
                    <table className="w-full table-auto text-center">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2 bg-gray-100">Client</th>
                                <th className="border px-4 py-2 bg-gray-100">Amount</th>
                                <th className="border px-4 py-2 bg-gray-100">Price</th>
                                <th className="border px-4 py-2 bg-gray-100">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointmentSales.map((sale, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{sale.client}</td>
                                    <td className="border px-4 py-2">{sale.amount}</td>
                                    <td className="border px-4 py-2">${sale.price}</td>
                                    <td className="border px-4 py-2">${sale.amount * sale.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="text-right mt-4">
                        <p className="text-lg font-medium text-gray-700">Total Appointment Sales: ${totalAppointmentSales}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesPage;
