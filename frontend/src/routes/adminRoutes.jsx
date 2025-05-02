import Profite from '../pages/Admin/Profite.jsx';
import AdminManageUsers from '../pages/Admin/ManageUsers.jsx'
import AddServicePage from '../pages/Admin/AddServicePage.jsx';
import ManageServicesPage from '../pages/Admin/ManageServicesPage.jsx';

import PrivateRoutes from '../utils/PrivateRoutes.jsx';
import RoleBaseRoutes from '../utils/RoleBaseRoutes.jsx';

// this page help us to defined all routes related to the admin 
// rather put them in main.jsx (this is more simple and clear)
export const adminRoutes = [
    {
        path: '/Profite', element:
            <PrivateRoutes>
                <RoleBaseRoutes requiredRole={["admin"]}>
                    <Profite />
                </RoleBaseRoutes>
            </PrivateRoutes>
    },
    {
        path: '/manage-users', element:
            <PrivateRoutes>
                <RoleBaseRoutes requiredRole={["admin"]}>
                    <AdminManageUsers />
                </RoleBaseRoutes>
            </PrivateRoutes>
    },
    {
        path: '/add-service', element:
            <PrivateRoutes>
                <RoleBaseRoutes requiredRole={["admin"]}>
                    <AddServicePage />
                </RoleBaseRoutes>
            </PrivateRoutes>
    },
    {
        path: '/services', element:
            <PrivateRoutes>
                <RoleBaseRoutes requiredRole={["admin"]}>
                    <ManageServicesPage />
                </RoleBaseRoutes>
            </PrivateRoutes>
    },
];
