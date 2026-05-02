import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import PatientsPage from "./pages/patients";
import ConsultationPage from "./pages/ConsultationPage";
import AnalyticsPage from "./pages/analytics";
import EmergencyDashboard from "./pages/emergency";
import Appointments from "./pages/appointments";
import Prescriptions from "./pages/Prescriptions";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN FIRST */}
        <Route path="/" element={<Login />} />

        {/* DASHBOARDS */}
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />

        {/* OTHER PAGES */}
        <Route path="/patients" element={<PatientsPage />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/consultation" element={<ConsultationPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/emergency" element={<EmergencyDashboard />} />
        <Route path="/prescriptions" element={<Prescriptions />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;