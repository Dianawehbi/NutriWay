import img from '../assets/chia.jpg'

export default function MealCard() {
    const receipt = {
        name: 'Oatmeal with Berries', calories: '250 kcal', image: '' 
    }
    return (
        <div  className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
            <img src={img} alt={receipt.name} className="w-full h-40 object-cover rounded-md mb-3" />
            <h3 className="text-lg font-medium text-gray-900">{receipt.name}</h3>
            <p className="text-gray-600">{receipt.calories}</p>
        </div>
    )
}