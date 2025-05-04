import ClientDashboard from '../pages/Dashboard/ClientDashboard.jsx';
import DietitianDashboard from '../pages/Dashboard/DietitianDashboard.jsx'
import AdminDashboard from '../pages/Dashboard/AdminDashboard.jsx'
import RoleBaseRoutes from '../utils/RoleBaseRoutes.jsx';
import PrivateRoutes from '../utils/PrivateRoutes.jsx';
import PendingApproval from '../pages/Dashboard/PendingApproval.jsx';
export const dashboardRoutes = [
    {
        path: '/DietitianDashboard', element:
            <PrivateRoutes>
                <RoleBaseRoutes requiredRole={["dietitian"]}>
                    <DietitianDashboard />
                </RoleBaseRoutes>
            </PrivateRoutes>
    },
    {
        path: '/PendingApproval', element:
            <PendingApproval />
    },
    {
        path: '/clientdashboard', element:
            <PrivateRoutes>
                <RoleBaseRoutes requiredRole={["client"]}>
                    <ClientDashboard />
                </RoleBaseRoutes>
            </PrivateRoutes>
    },
    {
        path: '/AdminDashboard', element:
            <PrivateRoutes>
                <RoleBaseRoutes requiredRole={["admin"]}>
                    <AdminDashboard />
                </RoleBaseRoutes>
            </PrivateRoutes>

    },
];