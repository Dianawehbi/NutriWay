// components/LoadingPage.jsx
import React from 'react';

const LoadingPage = () => {
    return (
        <div className="flex items-center flex-col justify-center min-h-screen bg-white">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 border-solid mx-auto mb-4"></div>
                <p className="text-green-600 font-semibold text-lg">Loading ...</p>
            </div>

        </div>
    );
};

export default LoadingPage;





