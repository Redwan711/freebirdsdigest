"use client";

import { Home, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function MobileNav({ categories }) {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        className="rounded-lg p-2 text-text-main transition-colors hover:bg-bg-subtle hover:text-brand"
      >
        {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={closeMenu}
            className="fixed inset-0 z-40 cursor-default bg-black/20 backdrop-blur-xs"
          />
          <nav
            id="mobile-navigation"
            className="fixed inset-x-4 top-16 z-50 max-h-[calc(100dvh-5rem)] overflow-y-auto rounded-2xl border border-brandborder bg-bg-surface p-3 pt-12 shadow-xl"
          >
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close navigation menu"
              className="absolute right-3 top-3 rounded-lg p-2 text-text-main transition-colors hover:bg-bg-subtle hover:text-brand"
            >
              <X aria-hidden="true" />
            </button>
            <Link
              href="/"
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-xl px-3.5 py-3 font-poppins text-sm font-semibold text-text-main hover:bg-brand/10 hover:text-brand transition-colors"
            >
              <Home size={18} /> Home
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/${category.slug}`}
                onClick={closeMenu}
                className="block rounded-xl px-3.5 py-3 font-poppins text-sm font-semibold text-text-main hover:bg-brand/10 hover:text-brand transition-colors"
              >
                {category.name}
              </Link>
            ))}
            <Link
              href="/contribute"
              onClick={closeMenu}
              className="block rounded-xl px-3.5 py-3 font-poppins text-sm font-semibold text-text-main hover:bg-brand/10 hover:text-brand transition-colors"
            >
              Contribute
            </Link>
            <Link
              href="/about"
              onClick={closeMenu}
              className="block rounded-xl px-3.5 py-3 font-poppins text-sm font-semibold text-text-main hover:bg-brand/10 hover:text-brand transition-colors"
            >
              About Us
            </Link>

            <div className="mt-3 pt-3 border-t border-brandborder flex items-center justify-between px-3.5">
              <span className="text-xs font-semibold text-text-muted">Appearance</span>
              <ThemeToggle />
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
