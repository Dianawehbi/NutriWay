import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaRuler, FaTint, FaRunning, FaAppleAlt, FaUser, FaEnvelope,
  FaBirthdayCake, FaVenusMars, FaCalendarAlt, FaClipboardList, FaWeight
} from "react-icons/fa";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from "recharts";
import ClientNavbar from "../../../components/Client/NavBar";
import axios from "axios";

const ClientProfile = () => {
  const [user, setUser] = useState(null);
  const [bodyComposition, setBodyComposition] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  console.log(bodyComposition)
  const ProfileDetail = ({ icon, label, value }) => (
    <div className="flex items-center gap-2">
      <span className="text-blue-500">{icon}</span>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
  
  const QuickAction = ({ title, description, buttonText, color, link }) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-800',
      green: 'bg-green-100 text-green-800',
      red: 'bg-red-100 text-red-800'
    };

    const buttonColor = {
      blue: 'bg-blue-500 hover:bg-blue-600',
      green: 'bg-green-500 hover:bg-green-600',
      red: 'bg-red-500 hover:bg-red-600'
    };

    return (
      <div className={`${colorMap[color]} p-5 rounded-xl flex flex-col h-full`}>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="mb-4 flex-1">{description}</p>
        <Link to={link}>
          <button className={`${buttonColor[color]} text-white px-4 py-2 rounded-lg w-full transition-colors`}>
            {buttonText}
          </button>
        </Link>
      </div>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:5000/api/client/${id}`);
        if (userResponse.data.success) {
          setUser(userResponse.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetBodyData = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:5000/api/bodycomposition/${id}`);
        if (userResponse.data.success) {
          setBodyComposition(userResponse.data.bodyComposition);
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    }
    fetBodyData();
    fetchData();
  }, [id]);

  // Format body composition data for charts
  const formatChartData = (data) => {
    return data.map(item => ({
      date: new Date(item.date).toLocaleDateString(),
      weight: parseFloat(item.weight),
      bmi: item.bmi,
      fat: item.fat,
      muscle: parseFloat(item.muscle),
      water: parseFloat(item.water)
    }));
  };

  // Get latest body composition
  const latestComposition = bodyComposition.length > 0
    ? bodyComposition[bodyComposition.length - 1]
    : null;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-blue-500 rounded-full mb-4"></div>
          <p className="text-2xl font-bold text-gray-700">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-2xl font-bold text-red-500 mb-4">No Data Available</p>
          <Link to="/" className="text-blue-500 hover:underline">Return to homepage</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <ClientNavbar />

      <main className="container mx-auto px-4 py-20">
        {/* Profile Header */}
        <section className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-blue-100 rounded-full flex items-center justify-center">
              <FaUser className="text-blue-500 text-4xl" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800 mb-1">{user.user_id.username}</h1>
              <p className="text-lg text-blue-600 font-medium capitalize">{user.activityLevel}</p>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-gray-600">
                <ProfileDetail icon={<FaEnvelope />} label="Email" value={user.user_id.email} />
                <ProfileDetail icon={<FaBirthdayCake />} label="Age" value={user.age} />
                <ProfileDetail icon={<FaRuler />} label="Height" value={`${user.height} cm`} />
                <ProfileDetail icon={<FaVenusMars />} label="Gender" value={user.gender} />
              </div>
            </div>
          </div>
        </section>

        {/* Body Composition Overview */}
        {latestComposition && (
          <section className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Current Body Composition</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <HealthStat
                icon={<FaWeight className="text-blue-500 text-3xl" />}
                label="Weight"
                value={`${latestComposition.weight} kg`}
              />
              <HealthStat
                icon={<FaRunning className="text-blue-500 text-3xl" />}
                label="BMI"
                value={latestComposition.bmi}
                status={latestComposition.bmi}
              />
              <HealthStat
                icon={<FaAppleAlt className="text-blue-500 text-3xl" />}
                label="Body Fat"
                value={`${latestComposition.fat}%`}
              />
              <HealthStat
                icon={<FaTint className="text-blue-500 text-3xl" />}
                label="Water"
                value={`${latestComposition.water}%`}
              />
            </div>
          </section>
        )}

        {/* Health Metrics */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <MetricChart
            title="Weight Trend"
            data={formatChartData(bodyComposition)}
            dataKey="weight"
            color="#22c55e"
            emptyMessage="No weight data available"
            unit="kg"
          />
          <MetricChart
            title="Body Fat Trend"
            data={formatChartData(bodyComposition)}
            dataKey="fat"
            color="#ef4444"
            emptyMessage="No body fat data available"
            unit="%"
          />
        </section>

        {/* Additional Metrics */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <MetricChart
            title="Muscle Mass Trend"
            data={formatChartData(bodyComposition)}
            dataKey="muscle"
            color="#3b82f6"
            emptyMessage="No muscle mass data available"
            unit="%"
          />
          <MetricChart
            title="Water Percentage Trend"
            data={formatChartData(bodyComposition)}
            dataKey="water"
            color="#06b6d4"
            emptyMessage="No water data available"
            unit="%"
          />
        </section>

        {/* Health Stats */}
        <section className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Health Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <HealthStat icon={<FaRuler className="text-blue-500 text-3xl" />} label="Height" value={`${user.height} cm`} />
            <HealthStat icon={<FaRunning className="text-blue-500 text-3xl" />} label="Activity Level" value={user.activityLevel} />
            <HealthStat icon={<FaTint className="text-blue-500 text-3xl" />} label="Water Intake" value={`${user.waterIntake || 'N/A'} L/day`} />
          </div>
        </section>

        {/* Quick Actions */}
        <section className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <QuickAction
              title="Make Appointment"
              description="Book a session with your dietitian"
              buttonText="Book Now"
              color="blue"
              link="/AppointmentBookingPage"
            />
            <QuickAction
              title="Appointment History"
              description="View all past and upcoming sessions"
              buttonText="View History"
              color="green"
              link="/AppointmentHistory"
            />
            <QuickAction
              title="Your Diet Plans"
              description="See your current and past diet plans"
              buttonText="View Plans"
              color="red"
              link="/diet-plan"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

// Updated HealthStat component to handle status indicators
const HealthStat = ({ icon, label, value, status }) => {
  const getStatusColor = (status) => {
    if (!status) return '';
    if (status === 'underweight') return 'text-yellow-500';
    if (status === 'normal') return 'text-green-500';
    if (status === 'overweight') return 'text-orange-500';
    if (status === 'obese') return 'text-red-500';
    return '';
  };

  return (
    <div className="bg-blue-50 p-5 rounded-xl flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className="bg-white p-3 rounded-full shadow-sm">{icon}</div>
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <p className={`text-xl font-bold ${getStatusColor(status)}`}>{value}</p>
      </div>
    </div>
  );
};

// Updated MetricChart component to handle units
const MetricChart = ({ title, data, dataKey, color, emptyMessage, unit }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
    {data && data.length > 0 ? (
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fill: '#6b7280' }} />
            <YAxis tick={{ fill: '#6b7280' }} />
            <Tooltip
              formatter={(value) => [`${value} ${unit}`, dataKey]}
              labelFormatter={(value) => `Date: ${value}`}
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              dot={{ r: 4, fill: color }}
              activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    ) : (
      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    )}
  </div>
);

// ... (keep the other components the same)

export default ClientProfile;