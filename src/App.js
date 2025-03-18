import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./Components/Home";
import Services from "./Components/Services";
import Contact from "./Components/Contact";
import About from "./Components/about";
import Policy from "./Components/PrivacyPolicy";
import Terms from "./Components/Terms";
import CookieSettings from "./Components/CookieSettings";
import Login from './Components/login';
import Register from './Components/Register';
import LoginRegister from "./Components/user/LoginRegister";
import AdminDashboard from "./Components/admin/AdminDashboard";
import Reports from "./Components/admin/Reports";
import Charts from "./Components/admin/Charts";
import UsersCharts from "./Components/admin/UsersCharts";



import ScanReport from './Components/admin/ScanReport';
import MessageReport from './Components/admin/MessageReport';
import UserDashboard from "./Components/user/UserDashboard";
import EditProfile from "./Components/user/EditProfile";
import History from "./Components/user/History";
import Scan from "./Components/user/Scan";
import ScanDetail from "./Components/user/ScanDetail";
import Maps from "./Components/user/Maps";
import Game from "./Components/user/Game";
import Education from "./Components/user/Education";
import Hazardous1 from "./Components/user/hazardous_education/Hazardous1";
import Hazardous2 from "./Components/user/hazardous_education/Hazardous2";
import Hazardous3 from "./Components/user/hazardous_education/Hazardous3";
import Hazardous4 from "./Components/user/hazardous_education/Hazardous4";
import Hazardous5 from "./Components/user/hazardous_education/Hazardous5";
import Nonhazardous1 from "./Components/user/nonhazardous_education/Nonhazardous1";
import Nonhazardous2 from "./Components/user/nonhazardous_education/Nonhazardous2";
import Nonhazardous3 from "./Components/user/nonhazardous_education/Nonhazardous3";
import Nonhazardous4 from "./Components/user/nonhazardous_education/Nonhazardous4";
import Nonhazardous5 from "./Components/user/nonhazardous_education/Nonhazardous5";
import RecyclingQuiz from "./Components/user/RecyclingQuiz";
import EnvironmentalImpact from "./Components/user/EnvironmentalImpact";
import DisposalQuiz from "./Components/user/DisposalQuiz";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cookies" element={<CookieSettings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/LoginRegister" element={<LoginRegister />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/Reports" element={<Reports />} />
        <Route path="/Charts" element={<Charts />} />
        <Route path="/UsersCharts" element={<UsersCharts />} />
        <Route path="scan-report/:id" element={<ScanReport />} />
        <Route path="message-report" element={<MessageReport />} />
        <Route path="/UserDashboard" element={<UserDashboard />} />
        <Route path="/EditProfile" element={<EditProfile />} />
        <Route path="/History" element={<History />} />
        <Route path="/Scan" element={<Scan />} />
        <Route path="/ScanDetail" element={<ScanDetail />} />
        <Route path="/Maps" element={<Maps />} />
        <Route path="/Game" element={<Game />} />
        <Route path="/education" element={<Education />} />
        <Route path="/hazardous1" element={<Hazardous1 />} />
        <Route path="/hazardous2" element={<Hazardous2 />} />
        <Route path="/hazardous3" element={<Hazardous3 />} />
        <Route path="/hazardous4" element={<Hazardous4 />} />
        <Route path="/hazardous5" element={<Hazardous5 />} />
        <Route path="/nonhazardous1" element={<Nonhazardous1 />} />
        <Route path="/nonhazardous2" element={<Nonhazardous2 />} />
        <Route path="/nonhazardous3" element={<Nonhazardous3 />} />
        <Route path="/nonhazardous4" element={<Nonhazardous4 />} />
        <Route path="/nonhazardous5" element={<Nonhazardous5 />} />
        <Route path="/RecyclingQuiz" element={<RecyclingQuiz />} />
        <Route path="/EnvironmentalImpact" element={<EnvironmentalImpact />} />
        <Route path="/DisposalQuiz" element={<DisposalQuiz />} />

      </Routes>
    </Router>
  );
}

export default App;