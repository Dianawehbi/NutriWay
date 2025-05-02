import { Link } from "react-router-dom";
import { 
  FaUserMd, 
  FaUsers, 
  FaDollarSign,
  FaArrowRight,
  FaChartLine
} from "react-icons/fa";

export default function Statistic() {
  // Sample data - replace with your actual data fetching
  const stats = [
    {
      title: "Dietitians",
      value: 24,
      link: "/ManageUsers",
      linkText: "Manage",
      icon: <FaUserMd className="text-green-600" />,
      trend: "↑ 3 this month",
      bgColor: "bg-green-50"
    },
    {
      title: "Clients",
      value: 198,
      link: "/ManageUsers",
      linkText: "View All",
      icon: <FaUsers className="text-blue-600" />,
      trend: "↑ 12% from last month",
      bgColor: "bg-blue-50"
    },
    {
      title: "Sales",
      value: "$3,708",
      link: "/SalesPage",
      linkText: "View Reports",
      icon: <FaDollarSign className="text-purple-600" />,
      trend: <span>↑ <FaChartLine className="inline" /> 8.5% growth</span>,
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-5 ">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className={`${stat.bgColor} p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100`}
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-white shadow-xs">
                  {stat.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-700">{stat.title}</h3>
              </div>
              <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500 mb-4">{stat.trend}</p>
            </div>
          </div>
          
          <Link 
            to={stat.link} 
            className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-700 group transition-colors"
          >
            {stat.linkText}
            <FaArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      ))}
    </div>
  );
}