import DietitianAvailability from '../pages/Appointment/dietitian/DietitianAvailability.jsx'
import DietitianAddClientInfoPage from '../pages/Appointment/dietitian/AddClientInfo.jsx'
import { AppointmentHistory } from '../pages/Appointment/client/AppointmentHitory.jsx'
import MakesAppointment from '../pages/Appointment/client/MakesAppointment.jsx'
import PrivateRoutes from '../utils/PrivateRoutes.jsx'
import RoleBaseRoutes from '../utils/RoleBaseRoutes.jsx'
import AppointmentBookingPage from '../pages/Appointment/client/AppointmentBookingPage.jsx'
import ManageAppointments from '../pages/Appointment/ManageAppointments.jsx'
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
        path: '/dietitian-add-client-info/:id', element:
            <PrivateRoutes>
                <RoleBaseRoutes requiredRole={["dietitian"]}>
                    <DietitianAddClientInfoPage />
                </RoleBaseRoutes>
            </PrivateRoutes>

    },
    // this is for client 
    {
        path: '/AppointmentHistory', element:
            <PrivateRoutes>
                <AppointmentHistory />
            </PrivateRoutes>
    }, {
        path: '/MakesAppointment', element:
            <PrivateRoutes>
                <MakesAppointment />
            </PrivateRoutes>
    }, {
        path: '/AppointmentBookingPage', element:
            <PrivateRoutes>
                <AppointmentBookingPage />
            </PrivateRoutes>
    },
]
