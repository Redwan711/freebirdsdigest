'use client';

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import SearchModal from './SearchModal';

export default function SearchButton({ variant = 'icon', className = '' }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {variant === 'icon' ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={`flex items-center justify-center p-2 rounded-lg text-text-main transition-colors hover:bg-bg-subtle hover:text-brand ${className}`}
          aria-label="Search articles"
        >
          <Search className="w-5 h-5" />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl bg-bg-subtle text-text-muted hover:bg-brand/10 hover:text-brand border border-brandborder/80 transition-all text-xs font-semibold shadow-2xs group ${className}`}
          aria-label="Search articles"
        >
          <Search className="w-3.5 h-3.5 text-brand group-hover:scale-110 transition-transform" />
          <span>Search</span>
          <kbd className="px-1.5 py-0.5 text-[10px] font-bold bg-bg-surface border border-brandborder rounded text-text-muted">⌘K</kbd>
        </button>
      )}

      <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
