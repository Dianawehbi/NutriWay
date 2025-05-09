import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FaPlus, FaMinus } from "react-icons/fa";
import DietitianNavBar from "../../../components/Dietitian/NavBar";
import axios from "axios";

const DietitianAddClientInfoPage = () => {
  const dietitian_id = JSON.parse(localStorage.getItem("user"))._id;
  const client_id = useParams();
  const [clientInfo, setClientInfo] = useState({
    client_id: client_id.id,
    dietitian_id: dietitian_id,
    weight: 70,
    fat: "20",
    water: 50,
    bmi: "normal",
    muscle: "30",
    includeMealPlan: false, // New state for optional meal plan
    weeklyMealPlan: Array.from({ length: 7 }, () => ({
      breakfast: "",
      lunch: "",
      dinner: "",
      snack: "",
    })),    
  });

  const navigate = useNavigate();
  const handleChange = (e, key, dayIndex, mealType) => {
    if (dayIndex !== undefined && mealType !== undefined) {
      // Handle meal plan changes
      const updatedWeeklyMealPlan = [...clientInfo.weeklyMealPlan];
      updatedWeeklyMealPlan[dayIndex] = {
        ...updatedWeeklyMealPlan[dayIndex],
        [mealType]: e.target.value
      };
      setClientInfo({ ...clientInfo, weeklyMealPlan: updatedWeeklyMealPlan });
    } else {
      // Handle regular field changes
      setClientInfo({ ...clientInfo, [key]: e.target.value });
    }
  };

  const toggleMealPlan = () => {
    setClientInfo({
      ...clientInfo,
      includeMealPlan: !clientInfo.includeMealPlan
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const dataToSubmit = { ...clientInfo };
      if (!clientInfo.includeMealPlan) {
        delete dataToSubmit.weeklyMealPlan;
      }
      console.log(dataToSubmit)
      console.log("Client Information Submitted:", dataToSubmit);
      const response = await axios.post('http://localhost:5000/api/bodycomposition/add' , dataToSubmit)
      if (response.data.success) {
        console.log(response.data)
        navigate('/manage-appointments')
      } else {
        alert("Failed to Save Client Information !!");
      }
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div>
      <DietitianNavBar />
      <div className=" mx-auto p-4 bg-gray-50">
        {/* Header */}


        <form onSubmit={handleSubmit} className="space-y-6 mt-20 bg-white p-6 rounded-xl shadow-sm">
          {/* Health Metrics Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-green-700 border-b pb-2">
              Health Metrics
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: "Weight (kg)", key: "weight", min: 30, max: 150, unit: "kg" },
                { label: "Body Fat %", key: "fat", min: 5, max: 50, unit: "%" },
                { label: "Water %", key: "water", min: 30, max: 80, unit: "%" },
                { label: "Muscle %", key: "muscle", min: 10, max: 60, unit: "%" },
              ].map((metric) => (
                <div key={metric.key} className="space-y-2">
                  <label className="block text-lg font-medium text-gray-700">
                    {metric.label}
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min={metric.min}
                      max={metric.max}
                      value={clientInfo[metric.key]}
                      onChange={(e) => handleChange(e, metric.key)}
                      className="flex-1"
                    />
                    <span className="w-16 text-center font-medium">
                      {clientInfo[metric.key]}{metric.unit}
                    </span>
                  </div>
                </div>
              ))}

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-1">
                  BMI Category
                </label>
                <select
                  value={clientInfo.bmi}
                  onChange={(e) => handleChange(e, "bmi")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="underweight">Underweight</option>
                  <option value="normal">Normal</option>
                  <option value="overweight">Overweight</option>
                  <option value="obese">Obese</option>
                </select>
              </div>
            </div>
          </section>

          {/* Optional Meal Plan Section */}
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-green-700">
                Weekly Meal Plan
              </h2>
              <button
                type="button"
                onClick={toggleMealPlan}
                className={`flex items-center px-4 py-2 rounded-lg ${clientInfo.includeMealPlan ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
              >
                {clientInfo.includeMealPlan ? (
                  <>
                    <FaMinus className="mr-2" /> Remove Meal Plan
                  </>
                ) : (
                  <>
                    <FaPlus className="mr-2" /> Add Meal Plan
                  </>
                )}
              </button>
            </div>

            {clientInfo.includeMealPlan && (
              <div className="space-y-6">
                <p className="text-gray-600">Enter the diet plan for each day of the week</p>
                {clientInfo.weeklyMealPlan.map((meal, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-3">Day {index + 1}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {['breakfast', 'lunch', 'dinner', 'snack'].map((mealType) => (
                        <div key={mealType}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                          </label>
                          <textarea
                            value={meal[mealType]}
                            onChange={(e) => handleChange(e, null, index, mealType)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            rows="3"
                            placeholder={`What to eat for ${mealType}...`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition duration-200"
            >
              Save Client Information
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DietitianAddClientInfoPage;