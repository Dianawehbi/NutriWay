import { Link } from "react-router-dom";

export default function AdminActions() {
  const actionCards = [
    {
      title: "Manage Users",
      description: "View, edit, and manage user accounts",
      link: "/manage-users",
      icon: (
        <svg className="w-10 h-10 mx-auto mb-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      bgColor: "bg-green-50"
    },
    {
      title: "Manage Appointments",
      description: "Handle bookings and schedules",
      link: "/admin-manage-appointments",
      icon: (
        <svg className="w-10 h-10 mx-auto mb-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      bgColor: "bg-green-50"
    },
    {
      title: "Manage Services",
      description: "Edit available services and pricing",
      link: "/services",
      icon: (
        <svg className="w-10 h-10 mx-auto mb-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      ),
      bgColor: "bg-green-50"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-lg text-gray-600">Manage your clinic's operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {actionCards.map((card, index) => (
          <div 
            key={index} 
            className={`${card.bgColor} rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300`}
          >
            <div className="p-8 text-center">
              <div className="flex justify-center">
                {card.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">{card.title}</h3>
              <p className="text-gray-600 mb-6">{card.description}</p>
              <Link
                to={card.link}
                className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                Go to {card.title.split(' ')[1]}
                <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}