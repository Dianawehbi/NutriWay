import { useEffect, useState } from "react";

export default function DietitianService({ services, dietitian_id }) {
  const [allservices, setAllservices] = useState([]);

  useEffect(() => {
    console.log("its services")
    const handleService = () => {
      alert("hi")
      const ArrayServices = services.map((item) => {
        const dietitian = item.find((d) => d.dietitian_id === dietitian_id);
        if (!dietitian) return null;
        return {
          _id: item.id,
          name: item.name,
          duration: item.duration,
          price: dietitian.price,
          mode: dietitian.mode,
        };
      }).filter(Boolean); // Removes nulls

      setAllservices(ArrayServices);
    };

    handleService();
  }, [services, dietitian_id]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Offered Services</h2>
        <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
          {services.length} services
        </span>
      </div>

      <div className="space-y-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="group p-5 border border-gray-100 rounded-xl hover:border-green-200 hover:bg-green-50 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center">
                  <h3 className="font-bold text-lg text-gray-800 group-hover:text-green-700">
                    {service.name}
                  </h3>
                  <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    {service.mode}
                  </span>
                </div>
                {service.description && (
                  <p className="mt-2 text-gray-600 text-sm">
                    {service.description}
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="text-green-600 font-bold text-lg">${service.price}</p>
                {service.duration && (
                  <p className="text-xs text-gray-500 mt-1">
                    {service.duration} min session
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4 flex justify-end space-x-3">
              <button className="px-4 py-2 text-sm font-medium text-green-700 bg-white border border-green-300 rounded-lg hover:bg-green-50 transition-colors">
                Learn More
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors shadow-sm">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center py-8">
          <div className="mx-auto w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">No services available</h3>
          <p className="mt-1 text-gray-500">This dietitian hasn't added any services yet.</p>
        </div>
      )}
    </div>
  );
}