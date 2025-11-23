import { SpeedInsights } from "@vercel/speed-insights/react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CourseSchedule from './components/CourseSchedule';
import MachinesCatalog from './components/MachinesCatalog';
import MachineDetail from './components/MachineDetail';
import Navbar from './components/Navbar';
import Contact from './components/Contact';

function AppContent() {
  return (
    <div className="min-h-screen w-full bg-industrial-dark font-sans text-right" dir="rtl">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<CourseSchedule />} />
        <Route path="/machines" element={<MachinesCatalog />} />
        <Route path="/machines/:id" element={<MachineDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <SpeedInsights />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;