import React, { useState, useEffect, useCallback } from 'react';
import { SettingsGroup } from '../components/SettingsGroup';
import { PasswordDisplay } from '../components/PasswordDisplay';
import { StrengthMeter } from '../components/StrengthMeter';
import { generatePassword } from '../lib/password';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { RotateCcw } from 'lucide-react';

const Checkbox = ({ id, label, checked, onChange }) => (
    <div className="flex items-center">
        <input type="checkbox" id={id} name={id} checked={checked} onChange={onChange} className="w-5 h-5 text-indigo-500 bg-gray-700 border-gray-600 rounded focus:ring-indigo-600 ring-offset-slate-800 focus:ring-2"/>
        <label htmlFor={id} className="ml-3 text-sm font-medium text-slate-300">{label}</label>
    </div>
);

const initialOptions = {
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeAmbiguous: false,
    customChars: '',
    prefix: '',
    suffix: '',
    count: 3,
};

export function PasswordGeneratorPage() {
    const [passwords, setPasswords] = useState([]);
    const [options, setOptions] = useLocalStorage('passguard-options', initialOptions);
    const [history, setHistory] = useLocalStorage('passguard-history', []);
    
    const handleOptionChange = (e) => {
        const { name, value, type, checked } = e.target;
        const finalValue = type === 'number' ? parseInt(value, 10) || 0 : value;
        setOptions(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : finalValue,
        }));
    };
    
    const updateHistory = useCallback((newPasswords) => {
        setHistory(prevHistory => {
            const newHistory = [newPasswords, ...prevHistory];
            return newHistory.slice(0, 5); // Keep history at a max of 5
        });
    }, [setHistory]);

    const handleGenerate = useCallback(() => {
        try {
            const newPasswords = Array.from({ length: options.count }, () => generatePassword(options));
            const joinedPasswords = newPasswords.join('\n');
            setPasswords(newPasswords);
            
            if (joinedPasswords) {
                updateHistory(joinedPasswords);
            }
        } catch (error) {
            console.error(error.message);
            setPasswords([error.message]);
        }
    }, [options, updateHistory]);

    useEffect(() => {
        handleGenerate();
    }, []);

    const handleResetSettings = () => {
        if (window.confirm("Are you sure you want to reset all settings to their defaults?")) {
            setOptions(initialOptions);
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-white mb-6">Password Generator</h2>
            <PasswordDisplay passwords={passwords} />
            <div className="my-6"> <StrengthMeter options={options} /> </div>
            <div className="space-y-4">
                 <div className="bg-slate-800 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                        <label htmlFor="length" className="font-medium">Password Length</label>
                        <input type="number" id="length" name="length" value={options.length} onChange={handleOptionChange} className="w-24 text-center bg-slate-900 text-xl font-bold text-indigo-400 p-1 rounded-lg border-2 border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <input type="range" id="length" name="length" min="4" max="128" value={options.length} onChange={handleOptionChange} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
                 </div>
                <SettingsGroup title="Character Types" defaultOpen={true}>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Checkbox id="includeUppercase" label="Uppercase (A-Z)" checked={options.includeUppercase} onChange={handleOptionChange} />
                        <Checkbox id="includeLowercase" label="Lowercase (a-z)" checked={options.includeLowercase} onChange={handleOptionChange} />
                        <Checkbox id="includeNumbers" label="Numbers (0-9)" checked={options.includeNumbers} onChange={handleOptionChange} />
                        <Checkbox id="includeSymbols" label="Symbols (!@#$)" checked={options.includeSymbols} onChange={handleOptionChange} />
                    </div>
                </SettingsGroup>
                <SettingsGroup title="Advanced Options">
                    <div className="space-y-4">
                        <Checkbox id="excludeAmbiguous" label="Exclude Ambiguous (I, l, 1, O, 0)" checked={options.excludeAmbiguous} onChange={handleOptionChange} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" id="prefix" name="prefix" placeholder="Prefix" value={options.prefix} onChange={handleOptionChange} className="bg-slate-900 p-2 rounded-md border-2 border-slate-700 focus:ring-indigo-500 focus:border-indigo-500"/>
                            <input type="text" id="suffix" name="suffix" placeholder="Suffix" value={options.suffix} onChange={handleOptionChange} className="bg-slate-900 p-2 rounded-md border-2 border-slate-700 focus:ring-indigo-500 focus:border-indigo-500"/>
                        </div>
                        <input type="text" id="customChars" name="customChars" placeholder="Add your own custom characters" value={options.customChars} onChange={handleOptionChange} className="w-full bg-slate-900 p-2 rounded-md border-2 border-slate-700 focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>
                </SettingsGroup>
                <SettingsGroup title="Configuration">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="count" className="font-medium mb-2 block">How many passwords?</label>
                            <input type="number" id="count" name="count" value={options.count} onChange={handleOptionChange} className="w-full bg-slate-900 p-2 rounded-md border-2 border-slate-700 focus:ring-indigo-500 focus:border-indigo-500"/>
                        </div>
                        <div className="text-xs text-slate-400 p-3 bg-slate-900/50 rounded-lg">
                            <p>Your settings are saved automatically to this browser.</p>
                        </div>
                        <button onClick={handleResetSettings} className="w-full flex items-center justify-center bg-amber-600/80 hover:bg-amber-700 text-white font-semibold py-2 px-3 rounded-lg transition-all" >
                            <RotateCcw size={16} className="mr-2" />
                            Reset to Default Settings
                        </button>
                    </div>
                </SettingsGroup>
                <button onClick={handleGenerate} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-4 rounded-lg text-xl transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50" >
                    Generate Passwords
                </button>
            </div>
        </div>
    );
}