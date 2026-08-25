'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 1. Check existing theme already applied on <html> or in localStorage / OS preference
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    
    let activeTheme = 'light';
    if (savedTheme === 'dark' || savedTheme === 'light') {
      activeTheme = savedTheme;
    } else if (
      root.classList.contains('dark') ||
      root.getAttribute('data-theme') === 'dark' ||
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      activeTheme = 'dark';
    }

    setTheme(activeTheme);
    setMounted(true);

    // 2. Listen to OS system theme changes (only affects users without manual override)
    const mediaQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
    if (!mediaQuery) return;

    const handleSystemChange = (e) => {
      if (!localStorage.getItem('theme')) {
        const nextTheme = e.matches ? 'dark' : 'light';
        setTheme(nextTheme);
        root.setAttribute('data-theme', nextTheme);
        if (nextTheme === 'dark') {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleSystemChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleSystemChange);
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleSystemChange);
      }
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);

    const root = document.documentElement;
    root.setAttribute('data-theme', nextTheme);
    if (nextTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  if (!mounted) {
    return (
      <div className={`h-9 w-9 rounded-xl bg-bg-subtle border border-brandborder/50 ${className}`} />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className={`relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-bg-subtle border border-brandborder text-text-main transition-all duration-300 hover:bg-brand/10 hover:text-brand hover:border-brand/40 hover:scale-105 active:scale-95 shadow-2xs group ${className}`}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-amber-400 transition-transform duration-300 group-hover:rotate-45" />
      ) : (
        <Moon className="h-4 w-4 text-slate-700 dark:text-slate-200 transition-transform duration-300 group-hover:-rotate-12" />
      )}
    </button>
  );
}
