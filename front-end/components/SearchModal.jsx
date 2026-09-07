'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Search, X, Loader2, ArrowRight, FileText, Calendar, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
      setResults([]);
      setHasSearched(false);
    }
  }, [isOpen]);

  // Handle ESC key and global shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Debounced search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`);
        const data = await res.json();
        setResults(data.results || []);
        setHasSearched(true);
      } catch (err) {
        console.error('Failed to search:', err);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Handle form submission (Go to full search page)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onClose();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleSelectResult = () => {
    onClose();
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/70 backdrop-blur-md transition-opacity duration-200">
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-bg-surface border border-brandborder rounded-2xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Form Header */}
        <form onSubmit={handleSubmit} className="relative flex items-center px-4 py-3.5 border-b border-brandborder bg-bg-subtle/50">
          <Search className="w-5 h-5 text-brand shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search remote work guides, tools, news..."
            className="w-full bg-transparent text-text-main placeholder:text-text-muted text-base font-medium focus:outline-none"
          />
          {isLoading && (
            <Loader2 className="w-5 h-5 text-brand animate-spin shrink-0 ml-2" />
          )}
          {query && !isLoading && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-text-muted hover:text-text-main hover:bg-bg-subtle transition-colors shrink-0 ml-2"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="ml-3 px-2 py-1 text-xs font-semibold rounded bg-bg-subtle text-text-muted border border-brandborder hover:text-text-main transition-colors shrink-0 hidden sm:block"
          >
            ESC
          </button>
        </form>

        {/* Live Search Results / States */}
        <div className="max-h-[60vh] overflow-y-auto p-3 divide-y divide-brandborder/50">
          {/* Default / Initial State */}
          {!query.trim() && (
            <div className="py-8 text-center space-y-2">
              <FileText className="w-10 h-10 text-brand/40 mx-auto" />
              <p className="text-sm font-semibold text-text-main">Search Freebirds Digest</p>
              <p className="text-xs text-text-muted max-w-xs mx-auto">
                Type keywords like <span className="text-brand font-medium">freelance</span>, <span className="text-brand font-medium">remote work</span>, or <span className="text-brand font-medium">productivity</span>.
              </p>
            </div>
          )}

          {/* No Results Found */}
          {hasSearched && results.length === 0 && !isLoading && (
            <div className="py-8 text-center space-y-2">
              <p className="text-sm font-semibold text-text-main">No articles found</p>
              <p className="text-xs text-text-muted">
                No matches for &quot;<span className="text-brand font-medium">{query}</span>&quot;. Try checking for typos or different terms.
              </p>
            </div>
          )}

          {/* Results List */}
          {results.length > 0 && (
            <div className="space-y-1">
              <div className="px-2 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-text-muted">
                Top Matches ({results.length})
              </div>
              {results.map((post) => {
                const category = post.categories?.nodes?.[0]?.name;
                const formattedDate = post.date
                  ? new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : null;

                return (
                  <Link
                    key={post.id}
                    href={`/news/${post.slug}?pid=${post.databaseId}`}
                    onClick={handleSelectResult}
                    className="flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-bg-subtle transition-all group"
                  >
                    {/* Article Thumbnail */}
                    <div className="relative w-16 h-12 rounded-lg bg-bg-subtle overflow-hidden shrink-0 border border-brandborder">
                      <Image
                        src={post.featuredImage?.node?.sourceUrl || '/freeBird-logo-new.png'}
                        alt={post.title}
                        fill
                        sizes="64px"
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>

                    {/* Article Details */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5 text-[11px] text-text-muted">
                        {category && (
                          <span className="font-semibold text-brand bg-brand/10 px-2 py-0.5 rounded-full border border-brand/20">
                            {category}
                          </span>
                        )}
                        {formattedDate && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formattedDate}
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-text-main line-clamp-1 group-hover:text-brand transition-colors">
                        {post.title}
                      </h4>
                    </div>

                    <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-brand group-hover:translate-x-0.5 transition-all shrink-0" />
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Bar */}
        {query.trim() && (
          <div className="px-4 py-3 bg-bg-subtle/70 border-t border-brandborder flex items-center justify-between">
            <span className="text-xs text-text-muted font-medium">
              Press <kbd className="px-1.5 py-0.5 text-[10px] font-semibold bg-bg-surface border border-brandborder rounded text-text-main">Enter</kbd> for full results
            </span>
            <button
              onClick={handleSubmit}
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-brand hover:underline"
            >
              <span>View all results</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </div>,
    document.body
  );
}
