import React from "react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import ClientNavbar from "../../../components/Client/NavBar";

const dietPlan = {
  name: "John Doe's Weekly Diet Plan",
  days: [
    {
      day: "Monday",
      meals: [
        {
          meal: "Breakfast",
          time: "7:00 AM",
          foodItems: [
            { food: "Oatmeal with Berries", calories: 220, instructions: "Cook oats with water, add berries and honey." },
            { food: "Scrambled Eggs", calories: 180, instructions: "Scramble 2 eggs with a dash of milk." },
            { food: "Coffee (Black)", calories: 5, instructions: "Brew a cup of black coffee." },
          ],
        },
        // Add lunch, dinner, snack...
      ],
    },
    {
      day: "Tuesday",
      meals: [
        // Add meals...
      ],
    },
    // More days...
  ],
};

const DietPlanPage = () => {
  const calculateTotalCalories = (day) =>
    day.meals
      .flatMap((meal) => meal.foodItems)
      .reduce((total, item) => total + item.calories, 0);

  return (
    <div className="bg-[#f4f9f4] min-h-screen pb-12 pt-20 px-4 md:px-10 font-sans">
      {/* Header */}
     <ClientNavbar/>

      {/* Content */}
      <main className="mt-8">
        {dietPlan.days.map((day, index) => (
          <section key={index} className="bg-white rounded-xl shadow-lg p-6 mb-6 transition-transform hover:scale-[1.01]">
            <h2 className="text-2xl font-bold text-green-800 mb-4">{day.day}</h2>

            {day.meals.map((meal, i) => (
              <div key={i} className="mb-5 border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {meal.meal} <span className="text-sm text-gray-500">- {meal.time}</span>
                </h3>
                <ul className="space-y-2">
                  {meal.foodItems.map((food, idx) => (
                    <li key={idx} className="flex flex-col md:flex-row md:items-center justify-between text-gray-700 bg-gray-50 p-2 rounded-md">
                      <span className="font-medium">{food.food}</span>
                      <span className="text-sm text-green-700">{food.calories} kcal</span>
                      <span className="text-sm text-gray-500 italic">{food.instructions}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="text-right text-base font-semibold text-green-700">
              Total Calories: {calculateTotalCalories(day)} kcal
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default DietPlanPage;
