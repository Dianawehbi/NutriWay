import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import defaultImg from '../../assets/defaultdietitian.png';
import axios from 'axios';

export default function Dietitian() {
    const [dietitians, setDietitians] = useState([]);

    useEffect(() => {
        const fetchDietitians = async () => {
            try {
                const { data } = await axios.get("http://localhost:5000/api/dietitian/all");
                if (data.success) {
                    // Filter out pending or rejected dietitians
                    const approvedDietitians = data.dietitians.filter(
                        dietitian => dietitian.status == "approved"
                    );
                    setDietitians(approvedDietitians);
                }
            } catch (err) {
                console.error("Failed to fetch dietitians:", err);
            }
        };
        fetchDietitians();
    }, []);
    console.log(dietitians)

    return (
        <div className="flex flex-col items-start mt-4 px-6 pt-4 space-y-4 w-full overflow-hidden">
            <div className='mb-7'>
                <h2 className="text-2xl text-[#234403] font-bold">Meet Our Dietitians</h2>
                <p className="text-gray-600">Certified nutrition experts ready to help you</p>
            </div>
            
            {dietitians.length === 0 ? (
                <div className="w-full text-center py-8">
                    <p className="text-gray-500">No dietitians available at the moment</p>
                </div>
            ) : (
                <div className="flex flex-row space-x-4 overflow-auto max-w-full pb-4">
                    {dietitians.map((dietitian) => (
                        <div key={dietitian._id} className="flex-shrink-0 w-64">
                            <Link to={`/dietitianprofile/${dietitian.user_id._id}`}>
                                <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
                                    <img
                                        src={dietitian.profile_img || defaultImg}
                                        alt={dietitian.username}
                                        className="w-full h-48 object-cover"
                                        onError={(e) => {
                                            e.target.src = defaultImg;
                                        }}
                                    />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-black">{dietitian.username}</h3>
                                        <p className="text-gray-600 text-sm">{dietitian.specialization}</p>
                                        <div className="flex items-center mt-2">
                                            <span className="text-yellow-500">★</span>
                                            <span className="text-gray-500 text-xs ml-1">5+ years experience</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}