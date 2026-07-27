'use client';

import { CalendarHeartIcon, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function CalendarToggle() {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);
    const today = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date());

    useEffect(() => {
        function handleOutsideClick(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);

        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    return (
        <div ref={wrapperRef} className="relative flex justify-end">
            <button
                type="button"
                onClick={() => setIsOpen((value) => !value)}
                className="rounded-full p-2 text-text-muted transition-colors hover:bg-bg-subtle hover:text-brand"
                aria-label="Open calendar"
                aria-expanded={isOpen}
            >
                <CalendarHeartIcon className="w-5 h-5" />
            </button>

            {isOpen ? (
                <div className="absolute right-0 top-12 z-50 w-72 rounded-2xl border border-brandborder bg-bg-surface p-4 shadow-md font-inter">
                    <div className="mb-2 flex items-center justify-between">
                        <p className="text-xs font-bold uppercase tracking-wider text-brand">Today</p>
                        <button 
                            onClick={() => setIsOpen(false)} 
                            className="p-1 rounded-md text-text-muted hover:text-text-main hover:bg-bg-subtle transition-colors"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                    <p className="text-sm font-semibold text-text-main">{today}</p>
                </div>
            ) : null}
        </div>
    );
}