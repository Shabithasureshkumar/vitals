import React from 'react';
import { Lightbulb, Sparkles } from 'lucide-react';

interface RecommendationCardProps {
  recommendation: string;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
  return (
    <div className="bg-white rounded-[24px] p-3.5 sm:p-4 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] h-full flex flex-col justify-between hover:border-amber-200/60 transition-all duration-150">
      <div className="flex items-center justify-between gap-2 mb-1 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-amber-50 text-amber-600 border border-amber-200/50 flex items-center justify-center shrink-0 shadow-xs">
            <Lightbulb className="w-3.5 h-3.5" />
          </div>
          <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 tracking-tight">
            Empathetic Guidance
          </h4>
        </div>
        <span className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
          <Sparkles className="w-3 h-3 text-amber-600" />
          Next Best Step
        </span>
      </div>
      <p className="text-[11px] text-slate-600 font-medium leading-relaxed pl-0.5 line-clamp-3">
        {recommendation}
      </p>
    </div>
  );
};
