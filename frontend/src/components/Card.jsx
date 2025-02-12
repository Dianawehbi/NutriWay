import image from '../assets/bfit.jpg'
import { FiPlus } from "react-icons/fi";


export default function Card() {

    return (
        <div>
            <div className="p-3 w-56 h-96  bg-white rounded-[2px] shadow-md border border-green-200 text-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
                <div><img src={image} alt="" className='max-h-50 w-50 object-cover' />
                </div>
                <div className="mt-3">
                    <h3 className="text-lg font-semibold text-green-700">Book Appointments</h3>
                    <p className="text-gray-600 text-sm mt-1">Schedule consultations with dietitians easily.</p>
                </div>
                <div className="flex justify-between items-center mt-4 px-3">
                    <span className="text-lg font-semibold text-gray-800">$10</span>
                    <button className="px-4 py-2 bg-green-600 text-white font-medium rounded-full transition hover:bg-green-700">
                        <FiPlus />
                    </button>
                </div>
            </div>
        </div>
    );
}