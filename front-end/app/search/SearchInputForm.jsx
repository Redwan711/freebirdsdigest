'use client';

import React, { useState } from 'react';
import { Search, ArrowRight, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SearchInputForm({ initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-lg mx-auto flex items-center">
      <div className="relative w-full">
        <Search className="w-5 h-5 text-brand absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles, guides, topics..."
          className="w-full bg-bg-surface border border-brandborder text-text-main text-sm font-medium rounded-2xl pl-12 pr-24 py-3 shadow-xs focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all placeholder:text-text-muted"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-20 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-text-main transition-colors"
            aria-label="Clear query"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand text-white text-xs font-bold px-3.5 py-1.5 rounded-xl hover:bg-brand/90 transition-all flex items-center gap-1 shadow-xs"
        >
          <span>Search</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </form>
  );
}
