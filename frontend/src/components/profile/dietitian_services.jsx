import { useEffect, useState } from "react";

export default function DietitianService({ services, dietitian_id }) {
  const [filteredServices, setFilteredServices] = useState([]);

  useEffect(() => {
    const handleService = () => {
      const filteredServices = services.flatMap((item) => {
        const matchedDietitians = item.dietitian.filter(
          (d) => d.deititian_id === dietitian_id
        );

        if (matchedDietitians.length === 0) return [];

        return matchedDietitians.map((entry) => ({
          service_id: item._id,
          name: item.name,
          duration: item.duration,
          price: entry.price,
          mode: entry.mode,
        }));
      });

      setFilteredServices(filteredServices);
    };

    handleService();
  }, [services, dietitian_id]); // Make sure to include dependencies

  return (
    <div className="bg-white rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Services Offered
      </h2>

      {filteredServices.length > 0 ? (
        <div className="space-y-3">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="p-4 border border-gray-100 rounded-lg flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium text-gray-800">{service.name}</h3>
                <p className="text-sm text-gray-500">
                  {service.duration} mins • {service.mode}
                </p>
              </div>
              <p className="font-bold text-green-600">${service.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          No services available from this dietitian
        </div>
      )}
    </div>
  );
}