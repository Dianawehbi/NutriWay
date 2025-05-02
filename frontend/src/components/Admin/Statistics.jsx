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
      title: "Users",
      values: [
        { label: "Dietitians", value: 24, link: "/manage-users" },
        { label: "Clients", value: 198, link: "/manage-users" }
      ],
      trend: "↑ 15 total this month",
      icon: <><FaUserMd className="text-green-600" /> <FaUsers className="text-blue-600 ml-1" /></>,
      bgColor: "bg-gray-50"
    },
    {
      title: "Sales",
      value: "$3,708",
      link: "/Profite",
      linkText: "View Reports",
      icon: <FaDollarSign className="text-purple-600" />,
      trend: <span>↑ <FaChartLine className="inline" /> 8.5% growth</span>,
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mx-5">
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

              {stat.values ? (
                <div className="mb-3">
                  {stat.values.map((item, i) => (
                    <div key={i} className="mb-2">
                      <p className="text-lg font-semibold text-gray-800 inline-block mr-4">
                        {item.value} <span className="text-sm font-normal text-gray-600">{item.label}</span>
                      </p>
                      <Link
                        to={item.link}
                        className="inline-flex items-center text-xs font-medium text-green-600 hover:text-green-700 group transition-colors"
                      >
                        Manage
                        <FaArrowRight className="ml-1 group-hover:translate-x-1 transition-transform text-xs" />
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-500 mb-4">{stat.trend}</p>
                </>
              )}
            </div>
          </div>

          {stat.trend && !stat.values && (
            <p className="text-sm text-gray-500 mb-4">{stat.trend}</p>
          )}

          {stat.linkText && (
            <Link
              to={stat.link}
              className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-700 group transition-colors"
            >
              {stat.linkText}
              <FaArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}