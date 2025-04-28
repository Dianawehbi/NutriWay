import AdminDashboard from '../pages/Dashboard/AdminDashboard.jsx';
import ClientDashboard from '../pages/Dashboard/ClientDashboard.jsx';
import DietitianDashboard from '../pages/Dashboard/DietitianDashboard.jsx'

import PrivateRoutes from '../utils/PrivateRoutes.jsx';

export const dashboardRoutes = [
    {
        path: '/DietitianDashboard', element:
            <PrivateRoutes>
                <DietitianDashboard />
            </PrivateRoutes>
    },
    {
        path: '/ClientDashboard', element:
            <PrivateRoutes>
                <ClientDashboard />
            </PrivateRoutes>
    },
    {
        path: '/AdminDashboard', element:
            <PrivateRoutes>
                <AdminDashboard />
            </PrivateRoutes>
    },
];