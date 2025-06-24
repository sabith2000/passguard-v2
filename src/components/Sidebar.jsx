import React from 'react';
import { Shield, Settings, Github, UserPlus } from 'lucide-react';

const NavItem = ({ icon, text, active, onClick }) => (
    <li
        className={`flex items-center p-3 my-1 font-medium rounded-lg cursor-pointer transition-colors ${
            active
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:bg-slate-700 hover:text-white'
        }`}
        onClick={onClick}
    >
        {icon}
        <span className="ml-3">{text}</span>
    </li>
);

export function Sidebar({ activeView, setActiveView }) {
    return (
        <aside className="w-64 bg-slate-850 p-4 flex flex-col">
            <div className="flex items-center mb-8">
                 <img src="/logo.svg" alt="PassGuard Logo" className="w-10 h-10" />
                 <h1 className="text-xl font-bold ml-2 text-white">PassGuard</h1>
            </div>
            <nav className="flex-grow">
                <ul>
                    <NavItem
                        icon={<Shield size={20} />}
                        text="Generator"
                        active={activeView === 'generator'}
                        onClick={() => setActiveView('generator')}
                    />
                    <NavItem
                        icon={<Settings size={20} />}
                        text="Settings"
                        active={activeView === 'settings'}
                        onClick={() => setActiveView('settings')}
                    />
                </ul>
            </nav>
            <div className="mt-auto">
                <div className="p-3 bg-slate-800 rounded-lg text-center">
                    <UserPlus className="mx-auto w-8 h-8 text-slate-500 mb-2"/>
                    <p className="text-sm text-slate-400 mb-3">Sign up to sync your passwords securely.</p>
                     <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                        Sign Up
                    </button>
                </div>
                <div className="text-center text-slate-500 mt-4">
                    <a href="https://github.com/sabith2000/passguard-v2" target="_blank" rel="noopener noreferrer" className="inline-flex items-center hover:text-indigo-400">
                        <Github size={16} className="mr-2"/>
                        View on GitHub
                    </a>
                </div>
            </div>
        </aside>
    );
}