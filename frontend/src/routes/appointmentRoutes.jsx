import AdminAppointmentPage from '../pages/Appointment/AdminManageAppointment.jsx'
import { DietitianAppointmentHistory } from '../pages/Appointment/dietitian/ApointmentHistory.jsx'
import DietitianManageAppointment from '../pages/Appointment/dietitian/ManageApointments.jsx'
import DietitianAddClientInfoPage from '../pages/Appointment/dietitian/AddClientInfo.jsx'
import { AppointmentHistory } from '../pages/Appointment/client/AppointmentHitory.jsx'
import MakesAppointment from '../pages/Appointment/client/MakesAppointment.jsx'

import PrivateRoutes from '../utils/PrivateRoutes.jsx'
import RoleBaseRoutes from '../utils/RoleBaseRoutes.jsx'

export const appoinmentRoutes = [
    {
        path: '/AdminAppointmentPage', element:
            <PrivateRoutes>
                <AdminAppointmentPage />
            </PrivateRoutes>
    },
    {
        path: '/DietitianAppointmentHistory', element:
            <PrivateRoutes>
                <DietitianAppointmentHistory />
            </PrivateRoutes>
    }, {
        path: '/DietitianManageAppointment', element:
            <PrivateRoutes>
                <DietitianManageAppointment />
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
