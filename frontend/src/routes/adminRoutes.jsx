import AdminDashboard from '../pages/Admin/AdminDashboard.jsx';
import UserManagementPage from '../pages/Admin/ManageUsers.jsx';
import SalesPage from '../pages/Admin/Sales.jsx';
import OrderManagementPage from '../pages/Admin/OrderManagementPage.jsx';
import AppointmentAdminPage from '../pages/Admin/ManageAppoitments.jsx';
import ManageProduct from '../pages/Admin/ManageProducts.jsx';
import PrivateRoutes from '../utils/PrivateRoutes.jsx';
import RoleBaseRoutes from '../utils/RoleBaseRoutes.jsx';

// this page help us to defined all routes related to the admin 
// rather put them in main.jsx (this is more simple and clear)
export const adminRoutes = [
    {
        path: '/AdminDashboard',
        element: <AdminDashboard />
    },
    {
        path: '/ManageUsers', element:
            <PrivateRoutes >
                <RoleBaseRoutes requiredRole="admin">
                    <UserManagementPage />
                </RoleBaseRoutes>
            </PrivateRoutes>
    },
    { path: '/SalesPage', element: <SalesPage /> },
    { path: '/OrderManagementPage', element: <OrderManagementPage /> },
    { path: '/AppointmentAdminPage', element: <AppointmentAdminPage /> },
    { path: '/ManageProduct', element: <ManageProduct /> }
];
