import AdminAppointmentPage from '../pages/Appointment/AdminManageAppointment.jsx'
import DietitianAvailability from '../pages/Appointment/dietitian/DietitianAvailability.jsx'
import DietitianAddClientInfoPage from '../pages/Appointment/dietitian/AddClientInfo.jsx'
import { AppointmentHistory } from '../pages/Appointment/client/AppointmentHitory.jsx'
import MakesAppointment from '../pages/Appointment/client/MakesAppointment.jsx'
import ManageAppointments from '../pages/Appointment/dietitian/DietitianAppointments.jsx'
import PrivateRoutes from '../utils/PrivateRoutes.jsx'
import RoleBaseRoutes from '../utils/RoleBaseRoutes.jsx'
import AppointmentBookingPage from '../pages/Appointment/client/AppointmentBookingPage.jsx'
export const appoinmentRoutes = [
    {
        path: '/manage-appointments', element:
            <PrivateRoutes>
                <RoleBaseRoutes requiredRole={["admin", "dietitian"]}>
                    <ManageAppointments />
                </RoleBaseRoutes>
            </PrivateRoutes>
    }, {
        path: '/dietitian-availability', element:
            <PrivateRoutes>
                <RoleBaseRoutes requiredRole={["dietitian"]}>
                    <DietitianAvailability />
                </RoleBaseRoutes>
            </PrivateRoutes>

    }, {
        path: '/dietitian-add-client-info', element:
            <PrivateRoutes>
                <RoleBaseRoutes requiredRole={["dietitian"]}>
                    <DietitianAddClientInfoPage />
                </RoleBaseRoutes>
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
    },{
        path: '/AppointmentBookingPage', element:
            <PrivateRoutes>
                <AppointmentBookingPage />
            </PrivateRoutes>
    },
]
