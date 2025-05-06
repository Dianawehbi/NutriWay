import Login from '../pages/auth/Login.jsx';
import SignUp from '../pages/auth/SignUp.jsx';
import DietitianRegistration from '../pages/auth/DietitianRegistration.jsx';
import ErrorPage from '../pages/auth/ErrorPage.jsx';
// this page help us to defined all routes related to authaurization 
// rather put them in main.jsx (this is more simple and clear)

export const authRoutes = [
    { path: '/Login', element: <Login /> },
    { path: '/SignUp', element: <SignUp /> },
    { path: '/DietitianRegister', element: <DietitianRegistration /> },
    { path: '/ErrorPage', element: <ErrorPage /> },

];