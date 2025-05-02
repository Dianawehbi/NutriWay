import DietitianProfile from '../pages/Profile/dietitian/Profile.jsx';
// import ClientProfile from '../pages/Profile/client/Profile.jsx'
// import DietitianManageProfile from '../pages/Profile/dietitian/ManageProfile.jsx';
// import ClientManageProfile from '../pages/Profile/client/ManageProfile.jsx'
// import ClientInformationPage from '../pages/Profile/client/ClientInformationPage.jsx';
// import DietPlanPage from '../pages/Profile/client/DietPlanPage.jsx';
import PrivateRoutes from '../utils/PrivateRoutes.jsx';

export const profiles = [
    {
        path: '/dietitianprofile/:id', element:
            <PrivateRoutes>
                <DietitianProfile />
            </PrivateRoutes>
    },
    // {
    //     path: '/clientprofile', element:
    //         <PrivateRoutes>
    //             <ClientProfile />
    //         </PrivateRoutes>
    // },
    // {
    //     path: '/dietitianmanageprofile/:id', element:
    //         <PrivateRoutes>
    //             <DietitianManageProfile />
    //         </PrivateRoutes>
    // },
    // {
    //     path: '/clientmanageprofile', element:
    //         <PrivateRoutes>
    //             <ClientManageProfile />
    //         </PrivateRoutes>
    // },
    // {
    //     path: '/ClientInformationPage', element:
    //         <PrivateRoutes>
    //             <ClientInformationPage />
    //         </PrivateRoutes>
    // },
    // {
    //     path: '/diet-plan', element:
    //         <PrivateRoutes>
    //             <DietPlanPage/>
    //         </PrivateRoutes>
    // },
];