import { Link } from "react-router-dom";
import { FiAlertTriangle, FiHome, FiRefreshCw } from "react-icons/fi";

export default function ErrorPage({ 
  message = "Something went wrong", 
  showRefresh = true,
  showHomeLink = true 
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden p-8 text-center">
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100 mb-6">
          <FiAlertTriangle className="h-10 w-10 text-red-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h1>
        <p className="text-gray-600 mb-8">{message}</p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {showRefresh && (
            <button
              onClick={() => window.location.reload()}
              className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              <FiRefreshCw className="mr-2" />
              Try Again
            </button>
          )}
          
          {showHomeLink && (
            <Link
              to="/"
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <FiHome className="mr-2" />
              Go Home
            </Link>
          )}
        </div>
      </div>
      
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>If the problem persists, please contact support</p>
        <p className="mt-1">Error Code: 500</p>
      </div>
    </div>
  );
}