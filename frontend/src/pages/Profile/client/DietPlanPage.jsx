import React, { useEffect, useState } from "react";
import ClientNavbar from "../../../components/Client/NavBar";
import axios from "axios";
import { FiPlusCircle, FiMeh } from "react-icons/fi";

const DietPlanPage = () => {
  const [dietPlan, setDietPlan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const id = JSON.parse(localStorage.getItem("user"))._id;

  useEffect(() => {
    const fetchBodyData = async () => {
      try {
        setLoading(true);
        const userResponse = await axios.get(`http://localhost:5000/api/bodycomposition/${id}`);
        
        if (userResponse.data.success) {
          const plans = userResponse.data.bodyComposition.filter(b => b.includeMealPlan);
          
          if (plans.length > 0) {
            const latestPlan = plans[plans.length - 1].weeklyMealPlan;
            setDietPlan(latestPlan || []);
          } else {
            setDietPlan([]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to load diet plan. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchBodyData();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-[#f4f9f4] min-h-screen pb-12 pt-20 px-4 md:px-10 font-sans">
        <ClientNavbar />
        <main className="mt-8 flex justify-center">
          <div className="animate-pulse bg-white rounded-lg p-8 w-full max-w-md text-center">
            <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6 mx-auto"></div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#f4f9f4] min-h-screen pb-12 pt-20 px-4 md:px-10 font-sans">
        <ClientNavbar />
        <main className="mt-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        </main>
      </div>
    );
  }

  if (dietPlan.length === 0) {
    return (
      <div className="bg-[#f4f9f4] min-h-screen pb-12 pt-20 px-4 md:px-10 font-sans">
        <ClientNavbar />
        <main className="mt-8 flex flex-col items-center justify-center text-center">
          <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full">
            <FiMeh className="mx-auto text-4xl text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">No Diet Plan Found</h3>
            <p className="text-gray-600 mb-6">
              You don't have any active diet plans. Please consult with your nutritionist.
            </p>
           
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-[#f4f9f4] min-h-screen pb-12 pt-20 px-4 md:px-10 font-sans">
      <ClientNavbar />
      <main className="mt-8 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Weekly Diet Plan</h1>
        
        {dietPlan.map((day, index) => (
          <section
            key={index}
            className="bg-white rounded-lg shadow-sm p-4 mb-4 transition-all hover:shadow-md border border-gray-100"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium bg-green-50 text-green-600 rounded-full px-3 py-1">
                Day {index + 1}
              </span>
              <span className="text-xs text-gray-500">
                {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
              </span>
            </div>

            <div className="space-y-3">
              {['breakfast', 'lunch', 'dinner', 'snack'].map((mealType) => (
                day[mealType] && (
                  <div key={mealType} className="group">
                    <div className="flex items-start">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-0.5 mr-2 w-16 flex-shrink-0">
                        {mealType}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-md whitespace-pre-line group-hover:bg-green-50 transition-colors">
                          {day[mealType]}
                        </p>
                        {day[`${mealType}Notes`] && (
                          <p className="text-xs text-gray-500 mt-1 italic">
                            {day[`${mealType}Notes`]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default DietPlanPage;