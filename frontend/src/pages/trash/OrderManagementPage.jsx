import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaTruck } from "react-icons/fa"; // Icons for delete and ship actions
import NavBar from "../../components/NavBar"; // Assuming you have a NavBar component

const OrderManagementPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch orders data (Dummy data for now)
    useEffect(() => {
        const fetchOrders = async () => {
            // Replace this with real data fetching logic (API call)
            const fetchedOrders = [
                {
                    id: 1,
                    clientName: "John Doe",
                    clientPhone: "123-456-7890",
                    clientAddress: "123 Elm St, City, Country",
                    products: [
                        { name: "Apple", quantity: 2, price: 3 },
                        { name: "Banana", quantity: 3, price: 1 },
                    ],
                    status: "Pending",
                },
                {
                    id: 2,
                    clientName: "Jane Smith",
                    clientPhone: "987-654-3210",
                    clientAddress: "456 Oak Rd, City, Country",
                    products: [
                        { name: "Orange", quantity: 1, price: 2 },
                        { name: "Grapes", quantity: 2, price: 4 },
                    ],
                    status: "Pending",
                },
            ];

            setOrders(fetchedOrders);
            setLoading(false);
        };

        fetchOrders();
    }, []);

    // Handle Ship Action (for now, just log to console)
    const handleShipOrder = (id) => {
        console.log(`Shipped order with id: ${id}`);
        setOrders(
            orders.map((order) =>
                order.id === id ? { ...order, status: "Shipped" } : order
            )
        );
    };

    // Handle Remove Action (for now, just log to console)
    const handleRemoveOrder = (id) => {
        console.log(`Removed order with id: ${id}`);
        setOrders(orders.filter((order) => order.id !== id));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <NavBar />
            <div className="p-6 space-y-8 mt-20">
                {/* Order Management Header */}
                <div className="bg-white p-6 rounded-xl shadow-xl text-center">
                    <h2 className="text-3xl font-semibold text-gray-700">Order Management</h2>
                    <p className="text-gray-500">Manage all placed orders</p>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center items-center py-8">
                        <p className="text-xl font-semibold text-gray-500">Loading orders...</p>
                    </div>
                ) : (
                    <div>
                        {orders.length === 0 ? (
                            <div className="text-center text-gray-500">
                                <p>No orders placed yet.</p>
                            </div>
                        ) : (
                            orders.map((order) => (
                                <div
                                    key={order.id}
                                    className="bg-white p-6 rounded-lg shadow-lg mb-6"
                                >
                                    <div className="space-y-4">
                                        {/* Order Information */}
                                        <div className="flex flex-col">
                                            <p className="text-xl font-semibold text-gray-700">{order.clientName}</p>
                                            <p className="text-gray-500">{order.clientPhone}</p>
                                            <p className="text-gray-400">{order.clientAddress}</p>
                                        </div>

                                        {/* Product List */}
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-700">Products</h4>
                                            <ul className="space-y-2">
                                                {order.products.map((product, index) => (
                                                    <li key={index} className="text-gray-600">
                                                        {product.name} - {product.quantity} x ${product.price}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Order Status */}
                                        <div className="text-gray-500">
                                            <p>Status: {order.status}</p>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-4">
                                            {order.status === "Pending" && (
                                                <button
                                                    onClick={() => handleShipOrder(order.id)}
                                                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
                                                >
                                                    <FaTruck className="inline mr-2" />
                                                    Ship Order
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleRemoveOrder(order.id)}
                                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                                            >
                                                <FaTrashAlt className="inline mr-2" />
                                                Remove Order
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderManagementPage;
