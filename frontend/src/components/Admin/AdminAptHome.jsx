import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CgProfile, CgChevronRight } from "react-icons/cg";
import { FiClock, FiCalendar, FiUser } from "react-icons/fi";

export default function AdminApptHome() {
  const [pendingDietitians, setPendingDietitians] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch pending dietitians (replace with your actual API call)
  useEffect(() => {
    const fetchPendingDietitians = async () => {
      try {
        // Simulate API call with more dummy data
        setTimeout(() => {
          setPendingDietitians([
            {
              id: 1,
              name: "Dr. Sarah Lee",
              specialization: "Weight Management",
              experience: "5 years",
              certification: "RD, CDN",
              status: "pending",
              submittedDate: "2023-05-15",
              clients: "120+",
              education: "MS in Nutrition",
              languages: ["English", "Spanish"]
            },
            {
              id: 2,
              name: "Dr. Michael Chen",
              specialization: "Sports Nutrition",
              experience: "8 years",
              certification: "CSSD, RD",
              status: "pending",
              submittedDate: "2023-05-10",
              clients: "250+",
              education: "PhD in Sports Science",
              languages: ["English", "Mandarin"]
            },
            {
              id: 3,
              name: "Dr. Emily Wilson",
              specialization: "Pediatric Nutrition",
              experience: "3 years",
              certification: "RD, LDN",
              status: "pending",
              submittedDate: "2023-05-18",
              clients: "80+",
              education: "BS in Dietetics",
              languages: ["English", "French"]
            },
            {
              id: 4,
              name: "Dr. James Rodriguez",
              specialization: "Clinical Nutrition",
              experience: "10 years",
              certification: "CNSC, RD",
              status: "pending",
              submittedDate: "2023-05-20",
              clients: "300+",
              education: "MD, MS in Nutrition",
              languages: ["English", "Spanish"]
            },
            {
              id: 5,
              name: "Dr. Priya Patel",
              specialization: "Ayurvedic Nutrition",
              experience: "6 years",
              certification: "RDN, Ayurvedic Practitioner",
              status: "pending",
              submittedDate: "2023-05-22",
              clients: "150+",
              education: "MS in Ayurvedic Medicine",
              languages: ["English", "Hindi"]
            }
          ]);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching dietitians:", error);
        setIsLoading(false);
      }
    };

    fetchPendingDietitians();
  }, []);

  const handleApproval = (id, action, e) => {
    e.stopPropagation(); // Prevent navigation when clicking buttons
    // Update status and remove from pending list
    setPendingDietitians(prev => prev.filter(dietitian => dietitian.id !== id));
    // Here you would typically make an API call to update the status
    console.log(`${action} dietitian with id: ${id}`);
  };

  const navigateToDietitian = (id) => {
    navigate(`/dietitian/${id}`);
  };

  return (
    <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        {isLoading ? (
          <div className="p-8 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : pendingDietitians.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No pending dietitian applications</p>
          </div>
        ) : (
          <div className="relative">
            {/* Scrollable container */}
            <div className="px-6 py-4  overflow-x-auto scrollbar-hide">
              <div className="flex space-x-6 pb-4" style={{ minWidth: `${pendingDietitians.length * 320}px` }}>
                {pendingDietitians.map((dietitian) => (
                  <div 
                    key={dietitian.id} 
                    onClick={() => navigateToDietitian(dietitian.id)}
                    className="w-80 flex-shrink-0 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer"
                  >
                    <div className="p-5 h-full flex flex-col">
                      <div className="flex items-start mb-4">
                        <div className="bg-green-100 p-3 rounded-full mr-4">
                          <CgProfile className="text-green-600 text-xl" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800">{dietitian.name}</h3>
                          <p className="text-sm text-green-600">{dietitian.specialization}</p>
                        </div>
                        <CgChevronRight className="text-gray-400" />
                      </div>

                      <div className="mt-2 space-y-2 flex-1">
                        <div className="flex items-center text-gray-600 text-sm">
                          <FiUser className="mr-2 flex-shrink-0" />
                          <span>{dietitian.experience} experience • {dietitian.clients} clients</span>
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <FiClock className="mr-2 flex-shrink-0" />
                          <span>{dietitian.certification}</span>
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <FiCalendar className="mr-2 flex-shrink-0" />
                          <span>Applied on {dietitian.submittedDate}</span>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-between space-x-3">
                        <button
                          onClick={(e) => handleApproval(dietitian.id, 'approve', e)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                        >
                          Approve
                        </button>
                        <button
                          onClick={(e) => handleApproval(dietitian.id, 'deny', e)}
                          className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                        >
                          Deny
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
    </div>
  );
}