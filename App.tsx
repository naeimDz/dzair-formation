import React, { useState } from 'react';
import Home from './components/Home';
import CourseSchedule from './components/CourseSchedule';
import MachinesCatalog from './components/MachinesCatalog';
import MachineDetail from './components/MachineDetail';
import Navbar from './components/Navbar';
import Contact from './components/Contact';
import { Machine } from './types';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'schedule' | 'machines' | 'machine-detail' | 'contact'>('home');
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);

  const handleMachineSelect = (machine: Machine) => {
    setSelectedMachine(machine);
    setCurrentView('machine-detail');
  };

  return (
    <div className="min-h-screen w-full bg-industrial-dark font-sans text-right" dir="rtl">
      <Navbar
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view as any)}
      />
      {currentView === 'home' ? (
        <Home onNavigate={(page) => setCurrentView(page as any)} />
      ) : currentView === 'schedule' ? (
        <CourseSchedule onBack={() => setCurrentView('home')} />
      ) : currentView === 'machines' ? (
        <MachinesCatalog
          onBack={() => setCurrentView('home')}
          onSelectMachine={handleMachineSelect}
        />
      ) : currentView === 'contact' ? (
        <Contact onNavigate={(page) => setCurrentView(page as any)} />
      ) : (
        selectedMachine && (
          <MachineDetail
            machine={selectedMachine}
            onBack={() => setCurrentView('machines')}
          />
        )
      )}
    </div>
  );
}

export default App;