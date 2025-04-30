import React from "react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

// Sample expanded diet plan data with additional details
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
        {
          meal: "Lunch",
          time: "12:30 PM",
          foodItems: [
            { food: "Grilled Chicken Breast", calories: 200, instructions: "Grill the chicken with olive oil and seasoning." },
            { food: "Steamed Broccoli", calories: 55, instructions: "Steam broccoli until tender." },
            { food: "Sweet Potato", calories: 112, instructions: "Roast sweet potatoes with olive oil." },
          ],
        },
        {
          meal: "Dinner",
          time: "6:30 PM",
          foodItems: [
            { food: "Salmon Fillet", calories: 300, instructions: "Bake salmon with lemon and herbs." },
            { food: "Quinoa", calories: 120, instructions: "Cook quinoa in water until fluffy." },
            { food: "Mixed Greens Salad", calories: 60, instructions: "Toss mixed greens with olive oil and balsamic vinegar." },
          ],
        },
        {
          meal: "Snack",
          time: "3:30 PM",
          foodItems: [
            { food: "Greek Yogurt", calories: 100, instructions: "Plain yogurt, no added sugar." },
            { food: "Almonds", calories: 80, instructions: "Eat a small handful of raw almonds." },
          ],
        },
      ],
    },
    {
      day: "Tuesday",
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
        {
          meal: "Lunch",
          time: "12:30 PM",
          foodItems: [
            { food: "Grilled Chicken Breast", calories: 200, instructions: "Grill the chicken with olive oil and seasoning." },
            { food: "Steamed Broccoli", calories: 55, instructions: "Steam broccoli until tender." },
            { food: "Sweet Potato", calories: 112, instructions: "Roast sweet potatoes with olive oil." },
          ],
        },
        {
          meal: "Dinner",
          time: "6:30 PM",
          foodItems: [
            { food: "Salmon Fillet", calories: 300, instructions: "Bake salmon with lemon and herbs." },
            { food: "Quinoa", calories: 120, instructions: "Cook quinoa in water until fluffy." },
            { food: "Mixed Greens Salad", calories: 60, instructions: "Toss mixed greens with olive oil and balsamic vinegar." },
          ],
        },
        {
          meal: "Snack",
          time: "3:30 PM",
          foodItems: [
            { food: "Greek Yogurt", calories: 100, instructions: "Plain yogurt, no added sugar." },
            { food: "Almonds", calories: 80, instructions: "Eat a small handful of raw almonds." },
          ],
        },
      ],
    },
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
        {
          meal: "Lunch",
          time: "12:30 PM",
          foodItems: [
            { food: "Grilled Chicken Breast", calories: 200, instructions: "Grill the chicken with olive oil and seasoning." },
            { food: "Steamed Broccoli", calories: 55, instructions: "Steam broccoli until tender." },
            { food: "Sweet Potato", calories: 112, instructions: "Roast sweet potatoes with olive oil." },
          ],
        },
        {
          meal: "Dinner",
          time: "6:30 PM",
          foodItems: [
            { food: "Salmon Fillet", calories: 300, instructions: "Bake salmon with lemon and herbs." },
            { food: "Quinoa", calories: 120, instructions: "Cook quinoa in water until fluffy." },
            { food: "Mixed Greens Salad", calories: 60, instructions: "Toss mixed greens with olive oil and balsamic vinegar." },
          ],
        },
        {
          meal: "Snack",
          time: "3:30 PM",
          foodItems: [
            { food: "Greek Yogurt", calories: 100, instructions: "Plain yogurt, no added sugar." },
            { food: "Almonds", calories: 80, instructions: "Eat a small handful of raw almonds." },
          ],
        },
      ],
    },
    {
      day: "Tuesday",
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
        {
          meal: "Lunch",
          time: "12:30 PM",
          foodItems: [
            { food: "Grilled Chicken Breast", calories: 200, instructions: "Grill the chicken with olive oil and seasoning." },
            { food: "Steamed Broccoli", calories: 55, instructions: "Steam broccoli until tender." },
            { food: "Sweet Potato", calories: 112, instructions: "Roast sweet potatoes with olive oil." },
          ],
        },
        {
          meal: "Dinner",
          time: "6:30 PM",
          foodItems: [
            { food: "Salmon Fillet", calories: 300, instructions: "Bake salmon with lemon and herbs." },
            { food: "Quinoa", calories: 120, instructions: "Cook quinoa in water until fluffy." },
            { food: "Mixed Greens Salad", calories: 60, instructions: "Toss mixed greens with olive oil and balsamic vinegar." },
          ],
        },
        {
          meal: "Snack",
          time: "3:30 PM",
          foodItems: [
            { food: "Greek Yogurt", calories: 100, instructions: "Plain yogurt, no added sugar." },
            { food: "Almonds", calories: 80, instructions: "Eat a small handful of raw almonds." },
          ],
        },
      ],
    },
    // Add additional days as needed
  ],
};

const DietPlanPage = () => {
  const calculateTotalCalories = (day) =>
    day.meals
      .flatMap((meal) => meal.foodItems)
      .reduce((total, item) => total + item.calories, 0);

  return (
    <div className="bg-gradient-to-l from-[#c6d3c6] to-[#3ee11e96]  p-4 min-h-screen font-serif flex flex-col">
      {/* Fixed Header with High z-index */}
      <div className="fixed bg-white rounded-b-2xl font-serif  top-0 right-0 left-0 flex justify-between p-3 border-t-2 border-gray-300 text-2xl h-16 z-20 shadow-md">
        <div className="flex gap-3 items-center m-2">
          <Link to={'/Home'}>
            <IoMdArrowRoundBack />
          </Link>
          <span>Diet Plan</span>
        </div>
        <div className="flex gap-3 items-center m-2 text-black">
          <Link to={'/UserProfile'}>
            <CgProfile />
          </Link>
        </div>
      </div>

      <div className="mt-15">
        {dietPlan.days.map((day, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6 mb-8 " >
            <h2 className="text-3xl text-[#234403] font-semibold mb-4">{day.day}</h2>

            {day.meals.map((meal, i) => (
              <div key={i} className="mb-6">
                <h3 className="text-2xl font-semibold">{meal.meal} - {meal.time}</h3>
                <ul className="mt-2">
                  {meal.foodItems.map((food, idx) => (
                    <li key={idx} className="flex justify-between">
                      <span>{food.food}</span>
                      <span>{food.calories} kcal</span>
                      <span className="text-sm text-gray-500">{food.instructions}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="mt-4 text-lg font-bold">
              Total Calories for {day.day}: {calculateTotalCalories(day)} kcal
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DietPlanPage;
