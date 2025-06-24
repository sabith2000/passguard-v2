import React, { useState, useEffect, useCallback } from 'react';
import { SettingsGroup } from '../components/SettingsGroup';
import { PasswordDisplay } from '../components/PasswordDisplay';
import { StrengthMeter } from '../components/StrengthMeter';
import { Tooltip } from '../components/Tooltip'; // Import Tooltip
import { generatePassword } from '../lib/password';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { RotateCcw } from 'lucide-react';

const Checkbox = ({ id, label, checked, onChange, tooltipText }) => (
    <div className="flex items-center">
        <input type="checkbox" id={id} name={id} checked={checked} onChange={onChange} className="w-5 h-5 text-indigo-500 bg-gray-700 border-gray-600 rounded focus:ring-indigo-600 ring-offset-slate-800 focus:ring-2"/>
        <label htmlFor={id} className="ml-3 text-sm font-medium text-slate-300">{label}</label>
        {tooltipText && <Tooltip text={tooltipText} />}
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
    const [activePreset, setActivePreset] = useState(null); // State for active preset
    
    const handleOptionChange = (e) => {
        const { name, value, type, checked } = e.target;
        setActivePreset(null); // Any manual change deactivates presets
        setOptions(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const applyPreset = (preset) => {
        let newOptions;
        switch(preset) {
            case 'memorable':
                newOptions = { ...initialOptions, length: 14, includeLowercase: true, includeUppercase: true, includeNumbers: false, includeSymbols: false };
                break;
            case 'strong':
                newOptions = { ...initialOptions, length: 24, includeUppercase: true, includeLowercase: true, includeNumbers: true, includeSymbols: true };
                break;
            case 'pin':
                newOptions = { ...initialOptions, length: 6, includeUppercase: false, includeLowercase: false, includeNumbers: true, includeSymbols: false };
                break;
            default:
                newOptions = { ...initialOptions };
        }
        setOptions(newOptions);
        setActivePreset(preset);
    };
    
    const updateHistory = useCallback((newPasswords) => {
        setHistory(prevHistory => {
            const newHistory = [newPasswords, ...prevHistory];
            return newHistory.slice(0, 5);
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
    }, [options.count, options.length, options.includeLowercase, options.includeUppercase, options.includeNumbers, options.includeSymbols, options.customChars, options.prefix, options.suffix, options.excludeAmbiguous]);

    const handleResetSettings = () => {
        if (window.confirm("Are you sure you want to reset all settings to their defaults?")) {
            setOptions(initialOptions);
            setActivePreset(null);
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-white mb-6">Password Generator</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <button onClick={() => applyPreset('memorable')} className={`font-semibold py-2 px-3 rounded-lg transition-all ${activePreset === 'memorable' ? 'bg-sky-500 ring-2 ring-sky-300' : 'bg-sky-600/80 hover:bg-sky-600'}`}>Memorable</button>
                <button onClick={() => applyPreset('strong')} className={`font-semibold py-2 px-3 rounded-lg transition-all ${activePreset === 'strong' ? 'bg-emerald-500 ring-2 ring-emerald-300' : 'bg-emerald-600/80 hover:bg-emerald-600'}`}>Strong</button>
                <button onClick={() => applyPreset('pin')} className={`font-semibold py-2 px-3 rounded-lg transition-all ${activePreset === 'pin' ? 'bg-rose-500 ring-2 ring-rose-300' : 'bg-rose-600/80 hover:bg-rose-600'}`}>PIN Code</button>
            </div>
            <PasswordDisplay passwords={passwords} />
            <div className="my-6"> <StrengthMeter options={options} /> </div>
            <div className="space-y-4">
                 <div className="bg-slate-800 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                        <label htmlFor="length" className="font-medium">Password Length</label>
                        <input type="number" id="length" name="length" min="4" max="128" value={options.length} onChange={handleOptionChange} className="w-24 text-center bg-slate-900 text-xl font-bold text-indigo-400 p-1 rounded-lg border-2 border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
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
                        <Checkbox id="excludeAmbiguous" label="Exclude Ambiguous" checked={options.excludeAmbiguous} onChange={handleOptionChange} tooltipText="Excludes characters like I, l, 1, O, 0 that can be easily confused." />
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
                            <input type="number" id="count" name="count" min="1" max="50" value={options.count} onChange={handleOptionChange} className="w-full bg-slate-900 p-2 rounded-md border-2 border-slate-700 focus:ring-indigo-500 focus:border-indigo-500"/>
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
            </div>
        </div>
    );
}