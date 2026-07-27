'use client';

import { CalendarHeartIcon, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function CalendarToggle() {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);
    const today = new Intl.DateTimeFormat('bn-BD', {
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
                className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-black"
                aria-label="Open calendar"
                aria-expanded={isOpen}
            >
                <CalendarHeartIcon />
            </button>

            {isOpen ? (
                <div className="absolute right-0 top-12 z-50 w-72 rounded-2xl border border-gray-200 bg-white p-4 shadow-lg">
                    <div className="mb-4 flex items-center justify-between">
                        
                        <p className="mb-2 text-sm font-semibold text-gray-700">Today</p>
                        <X
                        className="h-5 w-5 text-gray-500 hover:text-black"
                            onClick={() => setIsOpen(false)} />
                    </div>
                    <p className="text-base font-bangali text-gray-900">{today}</p>
                </div>
            ) : null}
        </div>
    );
}