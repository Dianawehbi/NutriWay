import DietitianProfile from '../pages/Profile/dietitian/Profile.jsx';
import ClientProfile from '../pages/Profile/client/Profile.jsx'
import DietitianManageProfile from '../pages/Profile/dietitian/ManageProfile.jsx';
// import ClientManageProfile from '../pages/Profile/client/ManageProfile.jsx'
import DietPlanPage from '../pages/Profile/client/DietPlanPage.jsx';
import PrivateRoutes from '../utils/PrivateRoutes.jsx';
import RoleBaseRoutes from '../utils/RoleBaseRoutes.jsx';
export const profiles = [
    {
        path: '/dietitianprofile/:id', element:
            <PrivateRoutes>
                <RoleBaseRoutes requiredRole={["dietitian", "admin", "client"]}>
                    <DietitianProfile />
                </RoleBaseRoutes>
            </PrivateRoutes>
    },
    {
        path: '/dietitianmanageprofile/:id', element:
            <PrivateRoutes>
                <RoleBaseRoutes requiredRole={["dietitian", "admin"]}>
                    <DietitianManageProfile />
                </RoleBaseRoutes>
            </PrivateRoutes>
    },
    {
        path: '/user-profile/:id', element:
            <PrivateRoutes>
                <ClientProfile />
            </PrivateRoutes>
    },

    // {
    //     path: '/clientmanageprofile', element:
    //         <PrivateRoutes>
    //             <ClientManageProfile />
    //         </PrivateRoutes>
    // },
    {
        path: '/diet-plan', element:
            <PrivateRoutes>
                <DietPlanPage/>
            </PrivateRoutes>
    },
];