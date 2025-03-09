export default function DietitianServicesSection() {
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
            <h3 className="text-2xl font-bold text-gray-800 mb-6 ">Body Composition Data</h3>
            <div className="">
                <ul className="mt-3 space-y-3">
                    {dietitian.services.map((service, index) => (
                        <li key={index} className="bg-gray-100 mx-5  p-4 rounded-md flex justify-between items-center">
                            <div>
                                <p className="text-gray-800 font-medium">{service.name}</p>
                                <p className="text-gray-600">${service.price} - {service.type}</p>
                            </div>
                            <button className="bg-blue-500 text-white px-3 py-1 w-30 m-3 md:w-auto rounded hover:bg-blue-600 transition">
                                Book Appointment
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}