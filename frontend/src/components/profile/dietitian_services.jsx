export default function DietitianService({ services }) {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Services</h2>
        <ul className="space-y-4">
          {services.map((service, index) => (
            <li key={index} className="p-4 border rounded-lg flex justify-between">
              <div>
                <p className="font-bold">{service.name}</p>
                <p className="text-sm text-gray-500">{service.type}</p>
              </div>
              <div className="text-green-600 font-semibold">${service.price}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  