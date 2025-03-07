import image from '../assets/bfit.jpg'
import { FiPlus } from "react-icons/fi";


export default function Card() {

    return (
        <div>
            <div className="p-3 w-56 h-96 bg-white rounded-2xl shadow-md border border-gray-200 text-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
                <div><img src={image} alt="" className='max-h-50 w-50 object-cover' />
                </div>
                <div className="mt-3">
                    <h3 className="text-lg font-semibold text-[#234403]">B-Fit Choclate</h3>
                    <p className="text-gray-600 text-sm mt-1">Milk Choclate 70 colories </p>
                </div>
                <div className="flex justify-between items-center mt-4 px-3">
                    <span className="text-lg font-semibold text-gray-800">$0.8</span>
                    <button className="px-4 py-2 bg-[#7d807a] text-white font-medium rounded-full transition hover:cursor-pointer hover:bg-[#525351] ">
                        <FiPlus />
                    </button>
                </div>
            </div>
        </div>
    );
}