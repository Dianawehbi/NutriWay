import img from '../assets/chia.jpg'
import { Link } from 'react-router-dom'
import { FaTrashAlt, FaUserEdit } from "react-icons/fa"; // Icons for delete and edit actions

export default function ManageMealCard() {
    const receipt = {
        name: 'Oatmeal with Berries', calories: '250 kcal', image: ''
    }
    return (
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col ">
            <img src={img} alt={receipt.name} className="w-full h-40 object-cover rounded-md mb-3" />
            <div className='flex flex-row justify-between space-x-2 items-start'>
                <div>
                    <h3 className="text-lg font-medium text-gray-900">{receipt.name}</h3>
                    <p className="text-gray-600">{receipt.calories}</p>
                </div>
                <div className='space-x-2 flex-row flex justify-between items-center'>
                    <div className=' text-white h-10 bg-green-500  rounded-2xl'>
                        <button className='items-center'>
                            <Link to={'/EditMeal'} className='items-center '>
                                <FaUserEdit className='m-3' />
                            </Link>
                        </button>
                    </div>
                    <div className='h-10 text-white bg-red-500 rounded-2xl'>
                        <button>
                            <FaTrashAlt  className='m-3'/>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}