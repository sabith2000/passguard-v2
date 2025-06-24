import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { PasswordGeneratorPage } from './pages/PasswordGeneratorPage';
import { SettingsPage } from './pages/SettingsPage';
import { Footer } from './components/Footer'; // Import the new component

function App() {
  const [activeView, setActiveView] = useState('generator');

  return (
    <div className="flex h-screen bg-slate-900">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      {/* UPDATE: The main content area is now a flex column to push the footer down */}
      <main className="flex-1 p-8 overflow-y-auto flex flex-col">
        {/* This div grows to take available space */}
        <div className="flex-grow">
          {activeView === 'generator' && <PasswordGeneratorPage />}
          {activeView === 'settings' && <SettingsPage />}
        </div>
        {/* The footer sits at the bottom */}
        <Footer />
      </main>
    </div>
  );
}

export default App;