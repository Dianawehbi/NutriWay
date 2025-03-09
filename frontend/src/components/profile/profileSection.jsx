import img from '../../assets/dietitianphoto.jpg'

export default function ProfileSection() {
    const dietitian = {
        id: 1,
        name: 'Dr. Sarah Johnson',
        profilePicture: 'path/to/image1.jpg',
        certification: 'Certified Clinical Nutritionist',
        rate: 4.8,
        clientsWorkedWith: 250,
        experience: '10+ years in clinical nutrition and weight management.',
        specialization: 'Weight Management, Diabetes Care, Sports Nutrition.',
        education: 'Ph.D. in Nutrition Science - Harvard University.',
        languages: ['English', 'Spanish', 'French'],
        contact: {
            email: 'sarah.johnson@nutrition.com',
            phone: '+1 (555) 123-4567',
        },
        services: [
            { name: 'Weight Loss Consultation', price: 50, type: 'Online' },
            { name: 'Personalized Diet Plan', price: 80, type: 'In-Clinic' },
            { name: 'General Nutrition Advice', price: 60, type: 'Online' },
            { name: 'Diabetes Meal Plan', price: 70, type: 'In-Clinic' },
        ],
    };
    return (
        <>
            <div className="bg-white shadow-xl rounded-3xl p-8 mx-6 w-11/12 flex flex-col lg:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8">
                {/* User Image */}
                <div className="flex-shrink-0 flex items-center justify-center">
                    <img
                        className="w-32 h-32 rounded-full border-4 border-green-500 shadow-md transform transition-transform hover:scale-105"
                        src={img}
                        alt="User Image"
                    />
                </div>
                {/* User Info Section */}
                <div className="flex flex-col sm:flex-row sm:justify-between p-6 w-full space-y-4 sm:space-y-0">
                    {/* Name and Diet Info */}
                    <div className="flex-grow text-center sm:text-left">
                        <h2 className="text-2xl font-bold  mt-4">{dietitian.name}</h2>
                        <p className="text-gray-600 mt-1">📜 {dietitian.certification}</p>
                        <p className="text-gray-600 mt-1">⭐ {dietitian.rate} / 5</p>
                        <p className="text-gray-600 mt-1">👥 Clients Worked With: {dietitian.clientsWorkedWith}</p>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-4 sm:mt-0 sm:ml-8 space-y-2 text-gray-600 text-lg">
                        <p><strong>🎓 Education:</strong> {dietitian.education}</p>
                        <p><strong>🩺 Specialization:</strong> {dietitian.specialization}</p>
                        <p><strong>💼 Experience:</strong> {dietitian.experience}</p>
                        <p><strong>🗣️ Languages Spoken:</strong> {dietitian.languages.join(', ')}</p>
                    </div>
                </div>
            </div>
        </>
    )
}