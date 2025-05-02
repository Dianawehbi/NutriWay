import React from 'react';

const PendingApproval = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-green-600 p-6 text-center">
                    <h1 className="text-2xl font-bold text-white">Welcome to NutriWay Pro!</h1>
                </div>

                <div className="p-8 text-center">
                    <div className="flex justify-center mb-6">
                        <svg
                            className="w-20 h-20 text-blue-500 animate-pulse"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4zm-4-5l-4-4V4h8v3.5l-4 4z" />
                        </svg>
                    </div>

                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Your Account is Under Review
                    </h2>

                    <p className="text-gray-600 mb-6">
                        Thank you for registering as a dietitian with NutriWay Pro.
                        Our team is reviewing your credentials and will notify you via
                        email once your account is approved.
                    </p>

                    <div className="relative w-20 h-20 mx-auto mb-6">
                        <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <div className="absolute inset-0 border-4 border-emerald-500 border-b-transparent rounded-full animate-spin-reverse"></div>
                    </div>

                    <p className="text-gray-500 italic mb-8">
                        Typical approval time: 1-2 business days
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PendingApproval;