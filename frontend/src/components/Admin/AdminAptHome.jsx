export default function AdminApptHome() {

    // Dummy Data (replace with real  fetching later)

    return (
        <div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">
                    Pending Dietitian Approvals
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4">
                    <div className="mb-4 border-blue-500 p-4  shadow-sm border-1 rounded-2xl ">
                        <p className="font-medium text-gray-700">Dr Sarah Lee</p>
                        <div>
                            <p className="text-lg ">Information</p>
                            <p className="text-gray-600">Client:clien</p>
                            <p className="text-gray-600">
                                Date: date | Time:time
                            </p>
                        </div>
                        <div className="flex gap-4 mt-2">
                            <button className="bg-green-500 text-white px-4 py-2 rounded-md">Approve</button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded-md">Deny</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}