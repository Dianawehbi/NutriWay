import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import NotFoundPage from './pages/auth/NotFoundPage.jsx'
import Login from './pages/auth/Login.jsx'
import SignUp from './pages/auth/SignUp.jsx'
import Home from './pages/Home.jsx'
import ProfilePage from './pages/Client/Profile.jsx'
import Receipt from './pages/Client/Meals.jsx'
import Shop from './pages/Client/Shop.jsx'
import Bag from './pages/Client/Bag.jsx'
import Appointment from './pages/Client/Appointment.jsx'
import DietitianProfile from './pages/Dietitian/DietitianProfile.jsx'
import MoreFood from './pages/Client/CalorieGuide.jsx'
import MealPage from './pages/Client/Meals.jsx'
import MealDetail from './pages/Client/MealDetails.jsx'
import Pages from './pages/pages.jsx'
import DietPlanPage from './pages/Client/DietPlanPage.jsx'
import UserInformationPage from './pages/Client/UserInformationPage.jsx'
import DietitianAppointmentsPage from './pages/Dietitian/DietitianAppoitmentPage.jsx'
import DietitianAddClientInfoPage from './pages/Dietitian/DietitianAddClientInfoPage.jsx'
import DietitianAddRecipePage from './pages/Dietitian/DietitianAddRecipePage.jsx'
import DietitianDashboard from './pages/Dietitian/Dashboard.jsx'
import AdminDashboard from './pages/Admin/AdminDashboard.jsx'
import ManageUsers from './pages/Admin/ManageUsers.jsx'
import ManageAccount from './pages/Client/ManageProfile.jsx'
import DietitianRegistration from './pages/auth/DietitianRegistration.jsx'
import CheckoutPage from './pages/Client/CheckOutPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />
  },
  {
    path: '/Login',
    element: <Login />,
  },
  {
    path: '/SignUp',
    element: <SignUp />,
  },
  {
    path: '/Home',
    element: <Home />,
  },
  {
    path: '/UserProfile',
    element: <ProfilePage />,
  },
  {
    path: '/Receipt',
    element: <Receipt />,
  },
  {
    path: '/Shop',
    element: <Shop />,
  },
  {
    path: '/Appointment',
    element: <Appointment />,
  },
  {
    path: '/DietitianProfile',
    element: <DietitianProfile />
  },
  {
    path: '/Card',
    element: <Bag />
  },
  {
    path: '/MealsPage',
    element: <MealPage />
  }, {
    path: '/MealDetail',
    element: <MealDetail />
  }, {
    path: '/caloriesoverview',
    element: <MoreFood />
  }, {
    path: '/pages',
    element: <Pages />
  }
  , {
    path: '/DietPlan',
    element: <DietPlanPage />
  }, {
    path: '/userinformation',
    element: <UserInformationPage />
  }, {
    path: '/dietitianappointment',
    element: <DietitianAppointmentsPage />
  }, {
    path: '/DietitianAddClientInfoPage',
    element: <DietitianAddClientInfoPage />
  },{
    path: '/DietitianAddRecipes',
    element: <DietitianAddRecipePage/>
  },{
    path: '/DietitianDashboard',
    element: <DietitianDashboard/>
  },{
    path: '/AdminDashboard',
    element: <AdminDashboard/>
  },{
    path:'/ManageUsers',
    element: <ManageUsers/>
  },
  {
    path:'/ProfileManagementPage',
    element: <ManageAccount/>
  },
  {
    path : '/DietitianRegister',
    element : <DietitianRegistration/>
  },
  {
    path: '/CheckoutPage',
    element: <CheckoutPage/>
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
