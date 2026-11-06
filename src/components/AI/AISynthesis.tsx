import React from 'react';
import { Sparkles, Heart, Activity, Zap, CheckCircle2, Cpu } from 'lucide-react';
import { AISynthesisData } from '../../types';
import brainImg from '../../assets/brain.png';

interface AISynthesisProps {
  data: AISynthesisData;
}

export const AISynthesis: React.FC<AISynthesisProps> = ({ data }) => {
  const insightIcons = [
    {
      icon: Heart,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200/50',
      tag: 'Cardio Calm',
      tagColor: 'text-emerald-700 bg-emerald-50',
    },
    {
      icon: Zap,
      color: 'text-pink-600 bg-pink-50 border-pink-200/50',
      tag: 'Metabolic Balance',
      tagColor: 'text-pink-700 bg-pink-50',
    },
    {
      icon: Activity,
      color: 'text-orange-600 bg-orange-50 border-orange-200/50',
      tag: 'Mobility Vitality',
      tagColor: 'text-orange-700 bg-orange-50',
    },
  ];

  return (
    <div className="bg-white rounded-[24px] p-4 sm:p-5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] h-full flex flex-col justify-between overflow-hidden relative">
      {/* Top Header Row with Futuristic Telemetry */}
      <div className="flex items-center justify-between mb-2 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#6C5CE7] to-indigo-500 text-white flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(108,92,231,0.3)]">
            <Sparkles className="w-4 h-4 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
                {data.title}
              </h3>
              <span className="hidden sm:inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-[#6C5CE7] border border-purple-200/50">
                <Cpu className="w-2.5 h-2.5 text-[#6C5CE7]" />
                Neural Bio-Synthesis
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {data.subtitle}
            </p>
          </div>
        </div>

        {/* Live sync pill */}
        <div className="flex items-center gap-2">
          <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Empathetic Telemetry Active
          </span>
          <span className="text-[10px] font-semibold text-[#6C5CE7] bg-[#F4F2FF] px-2.5 py-1 rounded-full border border-purple-100/60">
            {data.lastUpdated}
          </span>
        </div>
      </div>

      {/* Middle Section: Glowing Holographic Brain (Left) + Empathic Key Insights (Right) */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-4 items-center min-h-0">
        {/* Futuristic 3D Glowing Brain Container */}
        <div className="md:col-span-5 w-full h-full max-h-[175px] flex items-center justify-center overflow-hidden rounded-2xl relative group bg-gradient-to-tr from-purple-900/5 via-indigo-950/5 to-cyan-900/5 border border-purple-100/70 p-1">
          {/* Ambient Glow Aura */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-cyan-400/10 to-indigo-500/10 blur-xl pointer-events-none" />

          {/* Brain Image with drop shadow and cyber rounded frame */}
          <img
            src={brainImg}
            alt="AI Neural Brain Synthesis"
            className="w-full h-full object-cover rounded-xl select-none filter drop-shadow-[0_4px_16px_rgba(108,92,231,0.25)] transition-transform duration-300 group-hover:scale-[1.02]"
            draggable={false}
          />

          {/* Bottom Floating Telemetry Badge on Brain */}
          <div className="absolute bottom-2 inset-x-2 bg-slate-900/85 backdrop-blur-md px-2.5 py-1 rounded-xl flex items-center justify-between text-[9.5px] text-white border border-white/10 shadow-lg pointer-events-none">
            <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              Cognitive Coherence
            </span>
            <span className="text-slate-300 font-semibold">99.4% Synchronized</span>
          </div>
        </div>

        {/* Empathic Key Insights List */}
        <div className="md:col-span-7 flex flex-col justify-around h-full py-0.5 space-y-2 min-h-0">
          <div className="flex items-center justify-between mb-0.5">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <h4 className="text-xs font-bold text-slate-800 tracking-tight">
                Empathic Health Synthesis
              </h4>
            </div>
            <span className="text-[10px] font-semibold text-slate-400">
              Personalized for You
            </span>
          </div>

          {/* 3 Structured Empathic Insight Cards */}
          <div className="space-y-1.5">
            {data.keyInsights.map((insight, idx) => {
              const meta = insightIcons[idx % insightIcons.length];
              const IconComp = meta.icon;
              return (
                <div
                  key={idx}
                  className="group flex items-start gap-2.5 p-2 rounded-xl bg-slate-50/70 hover:bg-purple-50/40 border border-slate-100 hover:border-purple-200/60 transition-all duration-150 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
                >
                  <div className={`w-6 h-6 rounded-lg ${meta.color} border flex items-center justify-center shrink-0 mt-0.5 shadow-xs`}>
                    <IconComp className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${meta.tagColor}`}>
                        {meta.tag}
                      </span>
                      <span className="text-[9px] font-semibold text-emerald-600 flex items-center gap-0.5">
                        <span className="w-1 h-1 rounded-full bg-emerald-500" />
                        Optimal
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium leading-snug line-clamp-2">
                      {insight}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
