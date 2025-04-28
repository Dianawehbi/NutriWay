import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

const DietitianAddClientInfoPage = () => {
  const [clientInfo, setClientInfo] = useState({
    clientName: "",
    progress: "",
    followUpDate: "",
    weight: 70,
    fats: 20,
    water: 50,
    bmi: "normal",
    muscles: 30,
    weeklyMealPlan: Array(7).fill({
      breakfast: "",
      lunch: "",
      dinner: "",
      snack: "",
    }),
  });

  const handleChange = (e, key) => {
    setClientInfo({ ...clientInfo, [key]: e.target.value });
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Client Information Submitted:", clientInfo);
    setClientInfo({
      clientName: "",
      sessionDate: "",
      sessionNotes: "",
      progress: "",
      followUpDate: "",
      weight: "",
      fats: "",
      water: "",
      bmi: "",
      muscles: "",
      weeklyMealPlan: Array(7).fill({
        breakfast: "",
        lunch: "",
        dinner: "",
        snack: "",
      }),
    });
  };

  return (
    <div className="w-full p-6 bg-gray-100">
      <div className="fixed rounded-b-2xl font-serif bg-white top-0 right-0 left-0 flex justify-between p-3 border-t-2 border-gray-300 text-2xl h-16 z-20 shadow-md">
        <div className="flex gap-3 items-center m-2">
          <Link to={'/Home'}>
            <IoMdArrowRoundBack />
          </Link>
          <span>Add Client Information</span>
        </div>
        <div className="flex gap-3 items-center m-2 text-black">
          <Link to={'/UserProfile'}>
            <CgProfile />
          </Link>
        </div>
      </div>
      <h1 className="text-4xl font-bold text-[#234403] text-center mb-8 mt-15">
        Add Client Information After Session
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h1 className="text-2xl font-medium text-[#539c09] mb-2">Client Name - 20/2/2025 - 2:00 PM</h1>
        </div>

        <div>
          <label className="block text-lg font-medium mb-2">Client's Progress</label>
          <textarea
            value={clientInfo.progress}
            onChange={(e) => handleChange(e, "progress")}
            className="w-full p-3 border border-gray-300 rounded-md"
            rows="4"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-2">Follow-Up Date (if any)</label>
          <input
            type="date"
            value={clientInfo.followUpDate}
            onChange={(e) => handleChange(e, "followUpDate")}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* Interactive Health Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Weight */}
          <div>
            <label className="block text-lg font-medium mb-2">Weight (kg)</label>
            <input
              type="range"
              min="30"
              max="150"
              value={clientInfo.weight}
              onChange={(e) => handleChange(e, "weight")}
              className="w-full"
            />
            <span>{clientInfo.weight} kg</span>
          </div>

          {/* Fats */}
          <div>
            <label className="block text-lg font-medium mb-2">Fats (%)</label>
            <input
              type="range"
              min="5"
              max="50"
              value={clientInfo.fats}
              onChange={(e) => handleChange(e, "fats")}
              className="w-full"
            />
            <span>{clientInfo.fats}%</span>
          </div>

          {/* Water */}
          <div>
            <label className="block text-lg font-medium mb-2">Water (%)</label>
            <input
              type="range"
              min="30"
              max="80"
              value={clientInfo.water}
              onChange={(e) => handleChange(e, "water")}
              className="w-full"
            />
            <span>{clientInfo.water}%</span>
          </div>

          {/* BMI */}
          <div>
            <label className="block text-lg font-medium mb-2">BMI Category</label>
            <select
              value={clientInfo.bmi}
              onChange={(e) => handleChange(e, "bmi")}
              className="w-full p-3 border border-gray-300 rounded-md"
            >
              <option value="underweight">Underweight</option>
              <option value="normal">Normal</option>
              <option value="overweight">Overweight</option>
              <option value="obese">Obese</option>
            </select>
          </div>

          {/* Muscles */}
          <div>
            <label className="block text-lg font-medium mb-2">Muscles (%)</label>
            <input
              type="range"
              min="10"
              max="60"
              value={clientInfo.muscles}
              onChange={(e) => handleChange(e, "muscles")}
              className="w-full"
            />
            <span>{clientInfo.muscles}%</span>
          </div>
        </div>

        <div>
          <label htmlFor="followUpDate" className="block text-lg font-medium mb-2">
            Follow-Up Date (if any)
          </label>
          <input
            type="date"
            id="followUpDate"
            name="followUpDate"
            value={clientInfo.followUpDate}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold mt-8">Weekly Meal Plan</h2>
          <p className="mb-4 text-gray-600">Enter the diet plan for each day of the week</p>
          {clientInfo.weeklyMealPlan.map((meal, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Day {index + 1}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {['breakfast', 'lunch', 'dinner', 'snack'].map((mealType) => (
                  <div key={mealType}>
                    <label htmlFor={`${mealType}-${index}`} className="block text-lg font-medium mb-2">
                      {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                    </label>
                    <textarea
                      id={`${mealType}-${index}`}
                      name={`${mealType}-${index}`}
                      value={meal[mealType]}
                      onChange={(e) => handleChange(e, index, mealType)}
                      className="w-full p-3 border border-gray-300 rounded-md"
                      rows="3"
                      required
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div>
          <button type="submit" className="w-full p-3 bg-green-700 text-white font-semibold rounded-md hover:bg-green-600">
            Submit Information
          </button>
        </div>
      </form>
    </div>
  );
};

export default DietitianAddClientInfoPage;