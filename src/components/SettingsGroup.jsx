import React from 'react';
import { ChevronRight } from 'lucide-react';

export function SettingsGroup({ title, children, defaultOpen = false }) {
    return (
        <details className="bg-slate-800 rounded-lg overflow-hidden" open={defaultOpen}>
            <summary className="p-4 font-semibold text-lg cursor-pointer flex items-center justify-between">
                {title}
                <ChevronRight className="transition-transform details-arrow" size={20} />
            </summary>
            {/* The animation happens on this wrapper */}
            <div className="content-wrapper">
                <div>
                    <div className="border-t border-slate-700 p-4">
                        {children}
                    </div>
                </div>
            </div>
            {/* This style is necessary for the arrow rotation */}
            <style>{`details[open] .details-arrow { transform: rotate(90deg); }`}</style>
        </details>
    );
}