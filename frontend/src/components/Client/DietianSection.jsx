import React from 'react';
import { Link } from 'react-router-dom';
import img from '../../assets/dietitianphoto.jpg'

export default function Dietitian() {
    const dietitians = [
        {
            id: 1,
            name: 'Dr. Sarah Johnson',
            profilePicture: {img},
            specialization: 'Nutritionist',
            bio: 'Dr. Sarah has over 10 years of experience helping clients maintain healthy lifestyles.',
        },
        {
            id: 2,
            name: 'Dr. Mark Smith',
            profilePicture: 'path/to/image2.jpg',
            specialization: 'Sports Nutrition',
            bio: 'Dr. Mark specializes in sports nutrition and helps athletes improve their performance through diet.',
        },
        {
            id: 3,
            name: 'Dr. Emily Davis',
            profilePicture: 'path/to/image3.jpg',
            specialization: 'Dietary Consultant',
            bio: 'Dr. Emily provides personalized dietary plans for weight loss and healthy living.',
        },
        {
            id: 3,
            name: 'Dr. Emily Davis',
            profilePicture: 'path/to/image3.jpg',
            specialization: 'Dietary Consultant',
            bio: 'Dr. Emily provides personalized dietary plans for weight loss and healthy living.',
        },  {
            id: 3,
            name: 'Dr. Emily Davis',
            profilePicture: 'path/to/image3.jpg',
            specialization: 'Dietary Consultant',
            bio: 'Dr. Emily provides personalized dietary plans for weight loss and healthy living.',
        },
        // Add more dietitians as needed
    ];

    return (
        <div className="flex flex-col items-start mt-4 px-6 pt-4 space-y-4 w-full overflow-hidden">
            <div className='mb-7'>
                <h2 className="text-2xl text-[#234403] font-bold">Meet Our Dietitians</h2>
            </div>
            <div className="flex flex-row space-x-3 overflow-auto max-w-full">
                {dietitians.map((dietitian) => (
                    <div>
                        <Link to={'/DietitianProfile'}>
                            <div key={dietitian.id} className="bg-white shadow-lg w-100 rounded-lg overflow-hidden">
                                <img
                                    src={img}
                                    alt={dietitian.name}
                                    className="w-full h-56 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold text-black">{dietitian.name}</h3>
                                    <p className="text-gray-600">{dietitian.specialization}</p>
                                    <p className="text-gray-500 mt-2">{dietitian.bio}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

