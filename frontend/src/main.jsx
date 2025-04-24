import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import NotFoundPage from './pages/auth/NotFoundPage.jsx'
import Login from './pages/auth/Login.jsx'
import SignUp from './pages/auth/SignUp.jsx'
import Pages from './pages/pages.jsx'


import { adminRoutes } from './routes/adminRoutes.jsx'
import { clientRoutes } from './routes/clientRoutes.jsx'
import { dietitianRoutes } from './routes/dietitianRoutes.jsx'
import { authRoutes } from './routes/authRoutes.jsx'
import { recipesRoute } from './routes/recipes.jsx'
import AuthContext from './context/authContext.jsx'

const baseRoutes = [
  { path: '/', element: <App />, errorElement: <NotFoundPage /> },
  { path: '/Login', element: <Login /> },
  { path: '/SignUp', element: <SignUp /> },
  { path: '/pages', element: <Pages /> }
]

// Combine all route groups into a single router
const router = createBrowserRouter([
  ...baseRoutes,
  ...adminRoutes,
  ...clientRoutes,
  ...dietitianRoutes,
  ...authRoutes,
  ...recipesRoute
]);


// Render the app to the root DOM node
createRoot(document.getElementById('root')).render(
  <AuthContext>
    <RouterProvider router={router} />
  </AuthContext>,
)
