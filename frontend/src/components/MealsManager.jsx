import { Link } from "react-router-dom";
import breakfast_image from '../assets/breakfast_home.png';
import lunch_image from '../assets/lunch_home.png';
import dinner_image from '../assets/dinner_home.png';
import snack_image from '../assets/snack_home.png';

export default function MealManager() {
    return (
        <div className="flex flex-col items-start m-4 p-4 space-y-4 w-full overflow-hidden">
            <div>
                <span className="text-2xl text-[#234403] font-bold p-5">Pick Your Meal</span>
            </div>
            <div className="flex flex-row space-x-3 overflow-auto max-w-full">
                <div  >
                    <Link to={'/ManageMeals'}>
                        <img src={breakfast_image} alt="Breakfast" className="rounded-2xl min-w-80 md:max-w-100 hover:min-w-82  md:hover:max-w-102  ransition-all duration-200 " />
                    </Link>
                </div>
                <div>
                    <Link to={'/ManageMeals'}>
                        <img src={lunch_image} alt="Lunch" className="rounded-2xl min-w-80 md:max-w-100 hover:min-w-82  md:hover:max-w-102  ransition-all duration-200" />
                    </Link></div>
                <div>
                    <Link to={'/ManageMeals'}>
                        <img src={dinner_image} alt="Dinner" className="rounded-2xl min-w-80 md:max-w-100 hover:min-w-82  md:hover:max-w-102  ransition-all duration-200" />
                    </Link>
                </div>
                <div>
                    <Link to={'/ManageMeals'}>
                        <img src={snack_image} alt="Snack" className="rounded-2xl min-w-80 md:max-w-100 hover:min-w-82  md:hover:max-w-102  ransition-all duration-200" />

                    </Link></div>
            </div>
        </div>
    );
}
