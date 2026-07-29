'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  // Checks if dark mode is active from localStorage, HTML extension attributes, or OS settings
  const isDarkModeActive = () => {
    if (typeof window === 'undefined') return false;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') return true;
    if (savedTheme === 'light') return false;

    const html = document.documentElement;
    const body = document.body;

    const hasExtensionDarkMode =
      html.hasAttribute('native-dark-active') ||
      html.getAttribute('data-darkreader-scheme') === 'dark' ||
      html.hasAttribute('data-darkreader-inline-theme') ||
      html.getAttribute('data-darkmode') === 'true' ||
      html.getAttribute('data-theme') === 'dark' ||
      html.classList.contains('dark') ||
      (body && (body.getAttribute('data-darkreader-scheme') === 'dark' || body.classList.contains('dark')));

    if (hasExtensionDarkMode) return true;

    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  useEffect(() => {
    setMounted(true);
    const initialIsDark = isDarkModeActive();
    const initialTheme = initialIsDark ? 'dark' : 'light';
    setTheme(initialTheme);

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      applyTheme(savedTheme);
    }

    // MutationObserver to automatically detect when a browser extension injects dark mode attributes
    const observer = new MutationObserver(() => {
      if (!localStorage.getItem('theme')) {
        const detectedDark = isDarkModeActive();
        setTheme(detectedDark ? 'dark' : 'light');
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['native-dark-active', 'data-darkreader-scheme', 'data-darkmode', 'data-theme', 'class'],
    });

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e) => {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemChange);
    } else {
      mediaQuery.addListener(handleSystemChange);
    }

    return () => {
      observer.disconnect();
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleSystemChange);
      } else {
        mediaQuery.removeListener(handleSystemChange);
      }
    };
  }, []);

  const applyTheme = (newTheme) => {
    const root = document.documentElement;
    root.setAttribute('data-theme', newTheme);
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    applyTheme(nextTheme);
  };

  if (!mounted) {
    return (
      <div className={`h-9 w-9 rounded-xl bg-bg-subtle border border-brandborder/50 animate-pulse ${className}`} />
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
