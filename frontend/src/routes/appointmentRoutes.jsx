import AdminAppointmentPage from '../pages/Appointment/AdminManageAppointment.jsx'
import DietitianAvailability from '../pages/Appointment/dietitian/DietitianAvailability.jsx'
import DietitianAddClientInfoPage from '../pages/Appointment/dietitian/AddClientInfo.jsx'
import { AppointmentHistory } from '../pages/Appointment/client/AppointmentHitory.jsx'
import MakesAppointment from '../pages/Appointment/client/MakesAppointment.jsx'
import DietitianAppointments from '../pages/Appointment/dietitian/DietitianAppointments.jsx'
import PrivateRoutes from '../utils/PrivateRoutes.jsx'
import RoleBaseRoutes from '../utils/RoleBaseRoutes.jsx'

export const appoinmentRoutes = [
    {
        path: '/admin-manage-appointments', element:
            <PrivateRoutes>
                <AdminAppointmentPage />
            </PrivateRoutes>
    },
    {
        path: '/DietitianAppointments', element:
            <PrivateRoutes>
                <DietitianAppointments />
            </PrivateRoutes>
    }, {
        path: '/DietitianAvailability', element:
            <PrivateRoutes>
                <DietitianAvailability />
            </PrivateRoutes>
    }, {
        path: '/DietitianAddClientInfoPage', element:
            <PrivateRoutes>
                <DietitianAddClientInfoPage />
            </PrivateRoutes>
    }, {
        path: '/AppointmentHistory', element:
            <PrivateRoutes>
                <AppointmentHistory />
            </PrivateRoutes>
    }, {
        path: '/MakesAppointment', element:
            <PrivateRoutes>
                <MakesAppointment />
            </PrivateRoutes>
    },
]
