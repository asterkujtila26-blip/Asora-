import React from 'react';
import { useStore } from '../context/StoreContext';
import { AsoraEmblem } from '../components/brand/AsoraEmblem';
import { ArrowLeft, ArrowRight, Share2 } from 'lucide-react';

export const JournalArticlePage: React.FC = () => {
  const { selectedArticleId, articles, setCurrentPage, openJournalArticle } = useStore();

  const article = articles.find((a) => a.id === selectedArticleId) || articles[0];

  if (!article) return null;

  const otherArticles = articles.filter((a) => a.id !== article.id);

  return (
    <article className="w-full bg-[#F1EBDD] text-[#0A0A0B] py-10 sm:py-16 px-4 sm:px-10">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Back */}
        <button
          onClick={() => setCurrentPage('journal')}
          className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-neutral-600 hover:text-black mb-8"
        >
          <ArrowLeft size={14} />
          <span>RETURN TO JOURNAL</span>
        </button>

        {/* Article Meta */}
        <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500 mb-4">
          <span>{article.category}</span>
          <span>·</span>
          <span>{article.publishedDate}</span>
          <span>·</span>
          <span>{article.readTime}</span>
        </div>

        {/* Title */}
        <h1 className="font-editorial text-4xl sm:text-6xl font-light text-[#0A0A0B] leading-tight mb-8">
          {article.title}
        </h1>

        {/* Lead Excerpt */}
        <p className="font-editorial text-xl sm:text-2xl text-neutral-700 font-light leading-relaxed mb-10 pb-8 border-b border-[#0A0A0B]/10 italic">
          {article.excerpt}
        </p>

        {/* Cover Asset */}
        <div className="aspect-[16/9] bg-[#0A0A0B]/5 border border-[#0A0A0B]/10 overflow-hidden mb-12">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Article Body */}
        <div className="space-y-6 text-sm sm:text-base text-neutral-800 leading-relaxed max-w-2xl mx-auto font-sans">
          {article.content.map((paragraph, idx) => (
            <p key={idx} className="first-of-type:first-letter:text-4xl first-of-type:first-letter:font-editorial first-of-type:first-letter:mr-2">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Emblem Break */}
        <div className="my-16 flex flex-col items-center justify-center text-center">
          <AsoraEmblem size={32} color="#0A0A0B" />
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500 mt-2">
            ASORA PARIS // STUDIO ESSAYS
          </span>
        </div>

        {/* Other Stories */}
        <div className="pt-12 border-t border-[#0A0A0B]/10">
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-neutral-500 block mb-6">
            FURTHER READING
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {otherArticles.map((other) => (
              <div
                key={other.id}
                onClick={() => openJournalArticle(other.id)}
                className="cursor-pointer p-5 bg-white/40 border border-[#0A0A0B]/10 hover:border-[#0A0A0B] transition-colors"
              >
                <span className="text-[10px] font-mono text-neutral-500 uppercase">{other.category}</span>
                <h4 className="font-editorial text-xl text-[#0A0A0B] mt-1 hover:underline">{other.title}</h4>
                <div className="mt-3 text-[11px] font-semibold tracking-wider uppercase flex items-center gap-1">
                  <span>READ ESSAY</span>
                  <ArrowRight size={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default JournalArticlePage;
