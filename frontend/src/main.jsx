import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import NotFoundPage from './pages/auth/NotFoundPage.jsx'
import Login from './pages/auth/Login.jsx'
import SignUp from './pages/auth/SignUp.jsx'
import Pages from './pages/pages.jsx'

import AuthContext from './context/authContext.jsx'
import { recipesRoute } from './routes/recipes.jsx'
import { dashboardRoutes } from './routes/dashboardRoutes.jsx'
import { authRoutes } from './routes/authRoutes.jsx'
import { appoinmentRoutes } from './routes/appointmentRoutes.jsx'
import { adminRoutes } from './routes/adminRoutes.jsx'
import { profiles } from './routes/profileRoutes.jsx'

const baseRoutes = [
  { path: '/', element: <App />, errorElement: <NotFoundPage /> },
  { path: '/Login', element: <Login /> },
  { path: '/SignUp', element: <SignUp /> },
  { path: '/pages', element: <Pages /> }
]

// Combine all route groups into a single router
const router = createBrowserRouter([
  ...baseRoutes,
  ...dashboardRoutes,
  ...recipesRoute,
  ...authRoutes,
  ...appoinmentRoutes,
  ...adminRoutes,
  ...profiles

]);


// Render the app to the root DOM node
createRoot(document.getElementById('root')).render(
  <AuthContext>
    <RouterProvider router={router} />
  </AuthContext>,
)
