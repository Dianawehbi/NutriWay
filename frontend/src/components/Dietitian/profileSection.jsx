export default function ProfileSection({ dietitian }) {
    return (
        <div className="bg-white shadow-xl rounded-3xl p-8 mx-6 w-11/12 flex flex-col lg:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8">
            <div className="flex-shrink-0 flex items-center justify-center">
                <img
                    className="w-32 h-32 rounded-full border-4 border-green-500 shadow-md transform transition-transform hover:scale-105"
                    src={dietitian.profile_img || "/default.jpg"} // fallback image if null
                    alt="User"
                />
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between p-6 w-full space-y-4 sm:space-y-0">
                <div className="flex-grow text-center sm:text-left">
                    <h2 className="text-2xl font-bold mt-4">{dietitian.name || "Dietitian"}</h2>
                    <p className="text-gray-600 mt-1">📜 {dietitian.certification}</p>
                    <p className="text-gray-600 mt-1">⭐ {dietitian.rate || 'N/A'} / 5</p>
                    <p className="text-gray-600 mt-1">👥 Clients Worked With: {dietitian.clientsWorkedWith}</p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-8 space-y-2 text-gray-600 text-lg">
                    <p><strong>🎓 Education:</strong> {dietitian.education}</p>
                    <p><strong>🩺 Specialization:</strong> {dietitian.specialization}</p>
                    <p><strong>💼 Experience:</strong> {dietitian.experience} years</p>
                    <p><strong>🗣️ Languages Spoken:</strong> {dietitian.languages.join(', ')}</p>
                </div>
            </div>
        </div>
    );
}
