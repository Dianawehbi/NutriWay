import { useNavigate } from "react-router-dom";

export default function ProfileSection({ dietitian, role, user_id, dietitian_id }) {
    const navigate = useNavigate();

    return (
        <div className="bg-white shadow-lg w-11/12 mt-8 rounded-3xl overflow-hidden mx-auto transition-all duration-300 hover:shadow-xl">
            <div className="flex flex-col lg:flex-row">
                {/* Profile Image Section */}
                <div className="lg:w-1/3 p-6 flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
                    <div className="relative group">
                        <img
                            className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-105"
                            src={dietitian.profile_img}
                            alt={dietitian.username || "Dietitian profile"}
                            onError={(e) => {
                                e.target.src = "/default-profile.jpg";
                            }}
                        />
                        {dietitian.rate && (
                            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md flex items-center">
                                <span className="text-yellow-500 mr-1">★</span>
                                <span className="font-semibold text-gray-800">
                                    {dietitian.rate.toFixed(1)}/5
                                </span>
                            </div>
                        )}
                    </div>

                    <h2 className="mt-6 text-2xl font-bold text-gray-800">
                        {dietitian.user_id.username || "Dietitian"}
                    </h2>
                    <p className="text-green-600 font-medium mt-1">
                        {dietitian.certification}
                    </p>

                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                        {dietitian.languages?.map((language) => (
                            <span
                                key={language}
                                className="px-3 py-1 bg-white text-sm rounded-full shadow-sm border border-green-100"
                            >
                                {language}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Profile Details Section */}
                <div className="lg:w-2/3 p-6 lg:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                            <div className="bg-green-50 rounded-lg p-4">
                                <h3 className="font-semibold text-green-700 flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                    Education
                                </h3>
                                <p className="mt-1 text-gray-700">{dietitian.education || "Not specified"}</p>
                            </div>

                            <div className="bg-green-50 rounded-lg p-4">
                                <h3 className="font-semibold text-green-700 flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                    Specialization
                                </h3>
                                <p className="mt-1 text-gray-700">{dietitian.specialization || "Not specified"}</p>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            <div className="bg-green-50 rounded-lg p-4">
                                <h3 className="font-semibold text-green-700 flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Experience
                                </h3>
                                <p className="mt-1 text-gray-700">
                                    {dietitian.experience ? `${dietitian.experience} years` : "Not specified"}
                                </p>
                            </div>

                            <div className="bg-green-50 rounded-lg p-4">
                                <h3 className="font-semibold text-green-700 flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Clients Worked With
                                </h3>
                                <p className="mt-1 text-gray-700">{dietitian.clientsWorkedWith || "Not specified"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
                        {user_id != dietitian_id &&  role == "client" && (
                            <button onClick={() => navigate('/AppointmentBookingPage')} className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Book Appointment
                            </button>
                        )}

                        {user_id == dietitian_id && role == "dietitian" && (
                            <button onClick={() => navigate('/manage-appointments')} className="px-6 py-2 border border-green-600 text-green-600 rounded-full hover:bg-green-50 transition-colors flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                                Manage Appointment
                            </button>
                        )}
                        {user_id == dietitian_id && role == "dietitian" && (
                            <button onClick={() => navigate('/dietitian-availability')} className="px-6 py-2 border border-green-600 text-green-600 rounded-full hover:bg-green-50 transition-colors flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                                Set Availability
                            </button>
                        )}
                        {user_id == dietitian_id && role == "dietitian" && (
                            <button onClick={() => navigate('/dietitianmanageprofile/' + dietitian_id)} className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Manage Profile
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}