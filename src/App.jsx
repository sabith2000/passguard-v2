import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { PasswordGeneratorPage } from './pages/PasswordGeneratorPage';
import { SettingsPage } from './pages/SettingsPage';
import { Footer } from './components/Footer';

function App() {
  const [activeView, setActiveView] = useState('generator');

  return (
    <div className="flex h-screen bg-slate-900">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 p-8 overflow-y-auto flex flex-col">
        <div className="flex-grow">
          {activeView === 'generator' && <PasswordGeneratorPage />}
          {activeView === 'settings' && <SettingsPage />}
        </div>
        <Footer />
      </main>
    </div>
  );
}
export default App;