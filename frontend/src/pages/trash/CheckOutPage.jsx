import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
    const [user, setUser] = useState({
        address: "",
        phoneNumber: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6">
            {/* Bar */}
            <div className="fixed bg-white top-0 rounded-b-2xl font-serif  right-0 left-0 flex justify-between p-3 border-t-2 border-gray-300 text-2xl h-16 z-20 shadow-md">
                <div className="flex gap-3 items-center m-2">
                    <Link to={'/Card'}>
                        <IoMdArrowRoundBack />
                    </Link>
                    <span>Place Order</span>
                </div>
                <div className="flex gap-3 items-center m-2 text-black">
                    <Link to={'/UserProfile'}>
                        <CgProfile />
                    </Link>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-15 w-full max-w-4xl">
                {/* Address Section */}
                <div className="bg-white shadow-xl rounded-3xl p-6 w-full">
                    <h3 className="text-lg font-bold text-gray-800">Delivery to:</h3>
                    <div className="mt-3">
                        <input
                            type="text"
                            name="address"
                            placeholder="Enter your address"
                            value={user.address}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                        />
                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder="Enter your phone number"
                            value={user.phoneNumber}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg mt-3"
                        />
                    </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white shadow-xl rounded-3xl p-6 w-full">
                    <h3 className="text-lg font-bold text-gray-800">Payment Method</h3>
                    <p className="mt-2 flex items-center">
                        <span className="text-green-600 font-bold">💵</span> Cash On Delivery
                    </p>
                </div>
            </div>

            {/* Delivery Time */}
            <div className="bg-white shadow-xl rounded-3xl p-6 w-full max-w-4xl mt-6">
                <h3 className="text-lg font-bold text-gray-800">Delivery time:</h3>
                <p className="mt-2">Tuesday, March 11<sup>th</sup></p>
                <p className="text-gray-500">2-3 days delivery: <span className="text-green-600 font-bold">FREE</span></p>
            </div>

            {/* Order Summary */}
            <div className="bg-white shadow-xl rounded-3xl p-6 w-full max-w-4xl mt-6">
                <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>LBP 5,735,160</span>
                </div>
                <div className="flex justify-between text-gray-700 mt-2">
                    <span>Shipping</span>
                    <span>Free</span>
                </div>
                <div className="flex justify-between font-bold text-xl mt-4">
                    <span>TOTAL</span>
                    <span>LBP 5,735,160</span>
                </div>

                <input
                    type="text"
                    placeholder="Enter Coupon Code"
                    className="w-full p-3 border rounded-lg mt-4"
                />

                <button className="w-full bg-[#00bd1f]  text-white p-3 rounded-lg hover:bg-[#5ebd00] mt-4">
                    PLACE ORDER
                </button>
            </div>
        </div>
    );
};

export default CheckoutPage;