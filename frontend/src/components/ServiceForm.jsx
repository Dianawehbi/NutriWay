import React from "react";

const ServiceForm = ({ service, onChange }) => {
  const durationOptions = [
    "15 minutes",
    "30 minutes",
    "45 minutes",
    "1 hour",
    "1 hour 30 minutes",
    "2 hours",
  ];

  return (
    <>
      <input
        type="text"
        name="name"
        placeholder="Service Name"
        value={service.name}
        onChange={onChange}
        className="w-full mb-3 p-2 border border-gray-300 rounded-md"
      />
      <select
        name="duration"
        value={service.duration}
        onChange={onChange}
        className="w-full mb-3 p-2 border border-gray-300 rounded-md"
      >
        <option value="">Select Duration</option>
        {durationOptions.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};

export default ServiceForm;