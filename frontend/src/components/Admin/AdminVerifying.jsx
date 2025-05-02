import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { CgProfile, CgChevronRight, CgClose } from "react-icons/cg";
import { FiClock, FiCalendar, FiUser, FiMail, FiPhone, FiMapPin, FiGlobe } from "react-icons/fi";

const PendingDietitiansPage = () => {
  const [pendingDietitians, setPendingDietitians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDietitian, setSelectedDietitian] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPendingDietitians = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/dietitian/all");
        if (response.data.success) {
          const pending = response.data.dietitians.filter((item) => item.status === "pending");
          setPendingDietitians(pending);
        } else {
          setError("Failed to fetch dietitians");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchPendingDietitians();
  }, []);

  const handleApproval = async (id, action, e) => {
    e.stopPropagation();
    setActionLoading(true);
    try {
      console.log(id)
      const response = await axios.put(`http://localhost:5000/api/dietitian/update/status/${id}`, {
        status: action == 'approved' ? 'approved' : 'rejected'
      });
      if (response.data.success) {
        setPendingDietitians(prev => prev.filter(diet => diet._id !== id));
        if (selectedDietitian && selectedDietitian._id === id) {
          setSelectedDietitian(null);
        }
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update dietitian status");
    } finally {
      setActionLoading(false);
    }
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <CgProfile className="mr-2 text-green-600" />
            Pending Dietitian Approvals
          </h2>
          <p className="text-gray-600 mt-1">
            {pendingDietitians.length} applications awaiting review
          </p>
        </div>

        {pendingDietitians.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No pending dietitian applications</p>
          </div>
        ) : (
          <div className="relative">
            <div className="px-6 py-4 overflow-x-auto scrollbar-hide">
              <div className="flex space-x-6 pb-4" style={{ minWidth: `${pendingDietitians.length * 320}px` }}>
                {pendingDietitians.map((dietitian) => (
                  <div
                    key={dietitian._id}
                    onClick={() => setSelectedDietitian(dietitian)}
                    className="w-80 flex-shrink-0 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer"
                  >
                    <div className="p-5 h-full flex flex-col">
                      <div className="flex items-start mb-4">
                        <div className="bg-green-100 p-3 rounded-full mr-4">
                          <CgProfile className="text-green-600 text-xl" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800">{dietitian.username}</h3>
                          <p className="text-sm text-green-600">{dietitian.specialization}</p>
                        </div>
                        <CgChevronRight className="text-gray-400" />
                      </div>

                      <div className="mt-2 space-y-2 flex-1">
                        <div className="flex items-center text-gray-600 text-sm">
                          <FiUser className="mr-2 flex-shrink-0" />
                          <span>{dietitian.experience} years experience • {dietitian.clientsWorkedWith} clients</span>
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <FiClock className="mr-2 flex-shrink-0" />
                          <span>{dietitian.certification}</span>
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <FiGlobe className="mr-2 flex-shrink-0" />
                          <span>{dietitian.languages.join(', ')}</span>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-between space-x-3">
                        <button
                          onClick={(e) => handleApproval(dietitian._id, 'approved', e)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                          disabled={actionLoading}
                        >
                          {actionLoading ? 'Processing...' : 'Approve'}
                        </button>
                        <button
                          onClick={(e) => handleApproval(dietitian._id, 'rejected', e)}
                          className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                          disabled={actionLoading}
                        >
                          {actionLoading ? 'Processing...' : 'Deny'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dietitian Detail Modal */}
      {selectedDietitian && (
        <div className="fixed inset-0 bg-green-50  bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full  max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedDietitian.username}</h2>
                  <p className="text-green-600">{selectedDietitian.specialization}</p>
                </div>
                <button
                  onClick={() => setSelectedDietitian(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <CgClose className="text-xl" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Professional Information</h3>
                    <div className="space-y-3">
                      <p className="flex items-center text-gray-600">
                        <FiUser className="mr-2" />
                        <span>{selectedDietitian.experience} years of experience</span>
                      </p>
                      <p className="flex items-center text-gray-600">
                        <FiUser className="mr-2" />
                        <span>Worked with {selectedDietitian.clientsWorkedWith} clients</span>
                      </p>
                      <p className="flex items-center text-gray-600">
                        <FiClock className="mr-2" />
                        <span>Certification: {selectedDietitian.certification}</span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Education</h3>
                    <p className="text-gray-600">{selectedDietitian.education}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Contact Information</h3>
                    <div className="space-y-3">
                      <p className="flex items-center text-gray-600">
                        <FiMail className="mr-2" />
                        <span>{selectedDietitian.email}</span>
                      </p>
                      <p className="flex items-center text-gray-600">
                        <FiPhone className="mr-2" />
                        <span>{selectedDietitian.phone}</span>
                      </p>
                      <p className="flex items-center text-gray-600">
                        <FiMapPin className="mr-2" />
                        <span>Clinic location: {selectedDietitian.clinic_address.lat}, {selectedDietitian.clinic_address.lng}</span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedDietitian.languages.map((lang, index) => (
                        <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-3">
                <button
                  onClick={(e) => {
                    handleApproval(selectedDietitian._id, 'rejected', e);
                    setSelectedDietitian(null)
                  }}
                  className="bg-red-100 hover:bg-red-200 text-red-600 py-2 px-6 rounded-lg transition-colors duration-200"
                  disabled={actionLoading}
                >
                  {actionLoading ? 'Processing...' : 'Deny Application'}
                </button>
                <button
                  onClick={(e) => {
                    handleApproval(selectedDietitian._id, 'approved', e);
                    setSelectedDietitian(null);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg transition-colors duration-200"
                  disabled={actionLoading}
                >
                  {actionLoading ? 'Processing...' : 'Approve Application'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingDietitiansPage;