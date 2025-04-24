import Home from '../pages/Home.jsx'
import ProfilePage from '../pages/Client/Profile.jsx'
import Receipt from '../pages/Client/Meals.jsx'
import Shop from '../pages/Client/Shop.jsx'
import Bag from '../pages/Client/Bag.jsx'
import Appointment from '../pages/Client/Appointment.jsx'
import MoreFood from '../pages/Client/CalorieGuide.jsx'
import MealPage from '../pages/Client/Meals.jsx'
import DietPlanPage from '../pages/Client/DietPlanPage.jsx'
import UserInformationPage from '../pages/Client/UserInformationPage.jsx'
import ManageAccount from '../pages/Client/ManageProfile.jsx'
import CheckoutPage from '../pages/Client/CheckOutPage.jsx'

// this page help us to defined all routes related to the client 
// rather put them in main.jsx (this is more simple and clear)

export const clientRoutes = [
    { path: '/Home', element: <Home /> },
    { path: '/UserProfile', element: <ProfilePage /> },
    { path: '/Receipt', element: <Receipt /> },
    { path: '/Shop', element: <Shop /> },
    { path: '/Card', element: <Bag /> },
    { path: '/Appointment', element: <Appointment /> },
    { path: '/caloriesoverview', element: <MoreFood /> },
    { path: '/MealsPage', element: <MealPage /> },
    { path: '/DietPlan', element: <DietPlanPage /> },
    { path: '/userinformation', element: <UserInformationPage /> },
    { path: '/ProfileManagementPage', element: <ManageAccount /> },
    { path: '/CheckoutPage', element: <CheckoutPage /> },
]
