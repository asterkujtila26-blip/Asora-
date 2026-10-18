import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight } from 'lucide-react';

export const JournalPage: React.FC = () => {
  const { articles, openJournalArticle } = useStore();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Campaign', 'The Symbol', 'Materials & Construction'];

  const filteredArticles = activeCategory === 'All'
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  return (
    <div className="w-full bg-[#F1EBDD] text-[#0A0A0B] py-12 sm:py-20 px-4 sm:px-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#0A0A0B]/10 pb-8 mb-10 text-center sm:text-left">
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500 block mb-2">
          EDITORIAL ESSAYS & ARCHIVES
        </span>
        <h1 className="font-editorial text-4xl sm:text-6xl font-light text-[#0A0A0B]">
          The ASORA Journal
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 max-w-xl mt-3 leading-relaxed">
          Essays on architectural fashion, material density, the pierced-horizon threshold, and the studio development of Volume 01.
        </p>

        {/* Category Filters */}
        <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-[#0A0A0B] text-[#F1EBDD] font-medium'
                  : 'bg-white/60 text-[#0A0A0B] border border-[#0A0A0B]/10 hover:border-[#0A0A0B]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Lead Article */}
      {filteredArticles.length > 0 && (
        <article
          onClick={() => openJournalArticle(filteredArticles[0].id)}
          className="cursor-pointer group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/40 border border-[#0A0A0B]/10 p-6 sm:p-8 mb-12 hover:border-[#0A0A0B]/40 transition-colors"
        >
          <div className="lg:col-span-7 aspect-[16/10] bg-[#0A0A0B]/5 overflow-hidden">
            <img
              src={filteredArticles[0].coverImage}
              alt={filteredArticles[0].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500 uppercase mb-3">
                <span>{filteredArticles[0].category}</span>
                <span>·</span>
                <span>{filteredArticles[0].readTime}</span>
              </div>
              <h2 className="font-editorial text-3xl sm:text-4xl font-light text-[#0A0A0B] group-hover:underline">
                {filteredArticles[0].title}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-700 mt-4 leading-relaxed">
                {filteredArticles[0].excerpt}
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2 text-xs font-semibold tracking-widest uppercase">
              <span>READ ESSAY</span>
              <ArrowRight size={14} />
            </div>
          </div>
        </article>
      )}

      {/* Grid of Other Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredArticles.slice(1).map((article) => (
          <article
            key={article.id}
            onClick={() => openJournalArticle(article.id)}
            className="cursor-pointer group flex flex-col bg-white/40 border border-[#0A0A0B]/10 p-6 hover:border-[#0A0A0B]/40 transition-colors"
          >
            <div className="aspect-[16/10] bg-[#0A0A0B]/5 overflow-hidden mb-5">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500 uppercase mb-2">
              <span>{article.category}</span>
              <span>·</span>
              <span>{article.readTime}</span>
            </div>
            <h3 className="font-editorial text-2xl text-[#0A0A0B] group-hover:underline">
              {article.title}
            </h3>
            <p className="text-xs text-neutral-600 mt-2 line-clamp-3 leading-relaxed">
              {article.excerpt}
            </p>
            <div className="mt-6 flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase">
              <span>READ</span>
              <ArrowRight size={12} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default JournalPage;
