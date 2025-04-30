import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoMdSearch } from "react-icons/io";
import MealCard from "../../components/MealCard";

export default function MealPage() {
  const recipes = {
    breakfast: [
      {}, {}, {}, {}, {}, {},
    ],
    lunch: [
      {}, {},
    ],
    dinner: [
      {}, {},
    ],
    snacks: [
      {}, {},
    ],
  };

  return (

    <div className="min-h-screen flex flex-row bg-gray-100 p-6 font-serif">

      {/* Fixed Header with High z-index */}
      <div className="fixed bg-white rounded-b-2xl font-serif  top-0 right-0 left-0 flex justify-between p-3 border-t-2 border-gray-300 text-2xl h-16 z-20 shadow-md">
        <div className="flex gap-3 items-center m-2">
          {role == "admin" &&
            <Link to={'/AdminDashboard'}>
              <IoMdArrowRoundBack />
            </Link>
          }
          {role == "client" &&
            <Link to={'/ClientDashboard'}>
              <IoMdArrowRoundBack />
            </Link>
          }
          {role == "dietitian" &&
            <Link to={'/DietitianDashboard'}>
              <IoMdArrowRoundBack />
            </Link>
          }
          <span>Meals</span>
        </div>
        <div className="flex gap-3 items-center m-2 text-black">
          <IoMdSearch />
          <Link to={'/UserProfile'}>
            <CgProfile />
          </Link>
        </div>
      </div>

      <div className="flex flex-col mt-12 items-start px-3 pt-3 space-y-4 w-full overflow-hidden">

        <div className="flex flex-col space-x-3 overflow-auto max-w-full">
          {Object.entries(recipes).map(([category, items]) => (
            <div key={category} className="mb-8">
              <h2 className="text-2xl text-[#234403] font-semibold  capitalize mb-4">{category}</h2>
              <div className="flex flex-row space-x-3 overflow-auto max-w-full">
                {items.map((item, index) => (
                  <div className="min-w-70">
                    <Link to={'/MealDetail'}>
                      <MealCard />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
