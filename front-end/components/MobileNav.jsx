"use client";

import { Home, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

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
        className="rounded-md p-2 text-black transition-colors hover:bg-gray-100 hover:text-brand"
      >
        {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={closeMenu}
            className="fixed inset-0 z-40 cursor-default bg-black/5"
          />
          <nav
            id="mobile-navigation"
            className="fixed inset-x-4 top-24 z-50 max-h-[calc(100dvh-7rem)] overflow-y-auto rounded-lg border border-brandborder bg-white p-2 pt-12 shadow-lg"
          >
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close navigation menu"
              className="absolute right-2 top-2 rounded-md p-2 text-black transition-colors hover:bg-gray-100 hover:text-brand"
            >
              <X aria-hidden="true" />
            </button>
            <Link
              href="/"
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-md px-3 py-3 font-poppins text-black hover:bg-brand/5 hover:text-brand"
            >
              <Home size={18} /> Home
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/${category.slug}`}
                onClick={closeMenu}
                className="block rounded-md px-3 py-3 font-poppins text-black hover:bg-brand/5 hover:text-brand"
              >
                {category.name}
              </Link>
            ))}
            <Link
              href="/about"
              onClick={closeMenu}
              className="block rounded-md px-3 py-3 font-poppins text-black hover:bg-brand/5 hover:text-brand"
            >
              About Us
            </Link>
          </nav>
        </>
      )}
    </div>
  );
}
