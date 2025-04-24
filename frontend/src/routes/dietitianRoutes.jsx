import DietitianProfile from '../pages/Dietitian/DietitianProfile.jsx';
import DietitianAppointmentsPage from '../pages/Dietitian/DietitianAppoitmentPage.jsx';
import DietitianAddClientInfoPage from '../pages/Dietitian/DietitianAddClientInfoPage.jsx';
import DietitianDashboard from '../pages/Dietitian/Dashboard.jsx';
import DietitianManageProfile from '../pages/Dietitian/dietitianManageProfile.jsx';


// this page help us to defined all routes related to the dietitian 
// rather put them in main.jsx (this is more simple and clear)

export const dietitianRoutes = [
    { path: '/DietitianProfile', element: <DietitianProfile /> },
    { path: '/dietitianappointment', element: <DietitianAppointmentsPage /> },
    { path: '/DietitianAddClientInfoPage', element: <DietitianAddClientInfoPage /> },
    { path: '/DietitianDashboard', element: <DietitianDashboard /> },
    { path: '/DietitianManageProfile', element: <DietitianManageProfile /> },
];
