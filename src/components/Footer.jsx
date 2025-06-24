import React from 'react';

const currentYear = new Date().getFullYear();

export function Footer() {
    return (
        <footer className="w-full text-center py-4 mt-auto">
            <p className="text-sm text-slate-500">
                v0.2.3 | Copyright © {currentYear} PassGuard. All Rights Reserved.
            </p>
        </footer>
    );
}