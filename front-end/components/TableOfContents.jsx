"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { AlignLeft, ChevronRight } from "lucide-react";

export default function TableOfContents({ headings = [] }) {
  const [activeId, setActiveId] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);
  const navRef = useRef(null);
  const rafRef = useRef(null);
  const headingElsRef = useRef([]);

  // Cache heading DOM elements once after render
  useEffect(() => {
    if (!headings || headings.length === 0) return;

    const timer = setTimeout(() => {
      headingElsRef.current = headings
        .map((h) => ({ id: h.id, el: document.getElementById(h.id) }))
        .filter((h) => h.el);
    }, 150);

    return () => clearTimeout(timer);
  }, [headings]);

  // Track page scroll with requestAnimationFrame throttling
  useEffect(() => {
    if (!headings || headings.length === 0) return;

    const handleScroll = () => {
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;

        const threshold = 140;
        const elements = headingElsRef.current;
        if (elements.length === 0) return;

        let currentId = elements[0].id;

        for (let i = 0; i < elements.length; i++) {
          const top = elements[i].el.getBoundingClientRect().top;
          if (top <= threshold) {
            currentId = elements[i].id;
          } else {
            break;
          }
        }

        setActiveId((prev) => (prev !== currentId ? currentId : prev));
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [headings]);

  // Sync TOC container scroll position with active indicator
  useEffect(() => {
    if (!activeId || !navRef.current) return;

    const activeElement = navRef.current.querySelector(
      `[data-toc-id="${activeId}"]`
    );

    if (activeElement) {
      const container = navRef.current;
      const containerRect = container.getBoundingClientRect();
      const activeRect = activeElement.getBoundingClientRect();

      const lowerThreshold = containerRect.bottom - containerRect.height * 0.3;
      const upperThreshold = containerRect.top + containerRect.height * 0.25;

      if (activeRect.bottom > lowerThreshold) {
        container.scrollBy({
          top: activeRect.bottom - lowerThreshold,
          behavior: "smooth",
        });
      } else if (activeRect.top < upperThreshold) {
        container.scrollBy({
          top: activeRect.top - upperThreshold,
          behavior: "smooth",
        });
      }
    }
  }, [activeId]);

  const scrollToHeading = useCallback((e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
    }
  }, []);

  if (!headings || headings.length === 0) return null;

  return (
    <div className="rounded-3xl border border-brandborder bg-bg-surface p-5 shadow-xs space-y-3">
      <div
        className="flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-brand border-b border-brandborder/60 pb-3 cursor-pointer select-none group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <AlignLeft className="w-4 h-4 text-brand transition-transform group-hover:scale-110" />
          <span>Table of Contents</span>
        </div>
      </div>

      {isExpanded && (
        <nav
          ref={navRef}
          className="space-y-0.5 pt-0.5 max-h-95 overflow-y-auto pr-1 text-xs scroll-smooth"
        >
          {headings.map((heading) => {
            const isActive = activeId === heading.id;

            let indentClass = "pl-3";
            if (heading.level === 3) indentClass = "pl-6";
            if (heading.level === 4) indentClass = "pl-9";

            return (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                data-toc-id={heading.id}
                onClick={(e) => scrollToHeading(e, heading.id)}
                className={`group relative flex items-center justify-between rounded-xl py-2 pr-3 text-xs transition-all duration-200 ${indentClass} ${
                  isActive
                    ? "bg-brand/10 font-bold text-brand shadow-2xs translate-x-1"
                    : "text-text-muted hover:bg-bg-subtle hover:text-text-main font-medium hover:translate-x-1"
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-brand shadow-xs" />
                )}

                <span className="min-w-0 flex-1 truncate leading-tight">
                  {heading.text}
                </span>

                <ChevronRight
                  className={`w-3.5 h-3.5 shrink-0 ml-1.5 transition-all duration-200 ${
                    isActive
                      ? "opacity-100 text-brand translate-x-0.5 scale-110"
                      : "opacity-0 group-hover:opacity-100 text-text-muted group-hover:translate-x-0.5"
                  }`}
                />
              </a>
            );
          })}
        </nav>
      )}
    </div>
  );
}
