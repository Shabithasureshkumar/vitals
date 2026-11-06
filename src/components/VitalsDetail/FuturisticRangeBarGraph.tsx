import React, { useState } from 'react';
import { MetricDetailConfig } from '../../types';
import { ShieldCheck, Activity, Zap, Sparkles } from 'lucide-react';

interface FuturisticRangeBarGraphProps {
  metric: MetricDetailConfig;
}

export const FuturisticRangeBarGraph: React.FC<FuturisticRangeBarGraphProps> = ({ metric }) => {
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

  // Generate 7-day realistic telemetry data points tailored to the specific metric
  const getGraphData = () => {
    switch (metric.id) {
      case 'heart-rate':
        return [
          { day: 'Mon', value: 68, label: '68 BPM', status: 'normal' },
          { day: 'Tue', value: 71, label: '71 BPM', status: 'normal' },
          { day: 'Wed', value: 65, label: '65 BPM', status: 'optimal' },
          { day: 'Thu', value: 75, label: '75 BPM', status: 'normal' },
          { day: 'Fri', value: 84, label: '84 BPM', status: 'elevated' },
          { day: 'Sat', value: 70, label: '70 BPM', status: 'optimal' },
          { day: 'Today', value: 72, label: '72 BPM', status: 'normal', current: true },
        ];
      case 'blood-pressure':
        return [
          { day: 'Mon', value: 122, label: '122/80', status: 'normal' },
          { day: 'Tue', value: 125, label: '125/82', status: 'normal' },
          { day: 'Wed', value: 128, label: '128/84', status: 'normal' },
          { day: 'Thu', value: 135, label: '135/88', status: 'elevated' },
          { day: 'Fri', value: 130, label: '130/85', status: 'borderline' },
          { day: 'Sat', value: 124, label: '124/81', status: 'normal' },
          { day: 'Today', value: 132, label: '132/86', status: 'borderline', current: true },
        ];
      case 'blood-oxygen':
        return [
          { day: 'Mon', value: 98, label: '98%', status: 'optimal' },
          { day: 'Tue', value: 97, label: '97%', status: 'normal' },
          { day: 'Wed', value: 99, label: '99%', status: 'optimal' },
          { day: 'Thu', value: 98, label: '98%', status: 'optimal' },
          { day: 'Fri', value: 97, label: '97%', status: 'normal' },
          { day: 'Sat', value: 99, label: '99%', status: 'optimal' },
          { day: 'Today', value: 98, label: '98%', status: 'optimal', current: true },
        ];
      case 'temperature':
        return [
          { day: 'Mon', value: 98.2, label: '98.2°F', status: 'optimal' },
          { day: 'Tue', value: 98.4, label: '98.4°F', status: 'normal' },
          { day: 'Wed', value: 98.3, label: '98.3°F', status: 'optimal' },
          { day: 'Thu', value: 98.8, label: '98.8°F', status: 'normal' },
          { day: 'Fri', value: 98.5, label: '98.5°F', status: 'optimal' },
          { day: 'Sat', value: 98.6, label: '98.6°F', status: 'normal' },
          { day: 'Today', value: 98.6, label: '98.6°F', status: 'optimal', current: true },
        ];
      case 'blood-weight':
        return [
          { day: 'Mon', value: 187.2, label: '187.2', status: 'normal' },
          { day: 'Tue', value: 186.8, label: '186.8', status: 'normal' },
          { day: 'Wed', value: 186.2, label: '186.2', status: 'normal' },
          { day: 'Thu', value: 185.8, label: '185.8', status: 'optimal' },
          { day: 'Fri', value: 185.4, label: '185.4', status: 'optimal' },
          { day: 'Sat', value: 185.0, label: '185.0', status: 'optimal' },
          { day: 'Today', value: 185.0, label: '185.0', status: 'optimal', current: true },
        ];
      case 'blood-glucose':
        return [
          { day: 'Mon', value: 95, label: '95 mg/dL', status: 'optimal' },
          { day: 'Tue', value: 104, label: '104 mg/dL', status: 'normal' },
          { day: 'Wed', value: 122, label: '122 mg/dL', status: 'elevated' },
          { day: 'Thu', value: 108, label: '108 mg/dL', status: 'normal' },
          { day: 'Fri', value: 114, label: '114 mg/dL', status: 'normal' },
          { day: 'Sat', value: 98, label: '98 mg/dL', status: 'optimal' },
          { day: 'Today', value: 110, label: '110 mg/dL', status: 'normal', current: true },
        ];
      case 'activity':
        return [
          { day: 'Mon', value: 7800, label: '7,800 steps', status: 'normal' },
          { day: 'Tue', value: 9200, label: '9,200 steps', status: 'optimal' },
          { day: 'Wed', value: 6900, label: '6,900 steps', status: 'borderline' },
          { day: 'Thu', value: 10450, label: '10,450 steps', status: 'optimal' },
          { day: 'Fri', value: 9120, label: '9,120 steps', status: 'optimal' },
          { day: 'Sat', value: 8900, label: '8,900 steps', status: 'normal' },
          { day: 'Today', value: 8420, label: '8,420 steps', status: 'normal', current: true },
        ];
      case 'sleep':
        return [
          { day: 'Mon', value: 6.8, label: '6.8 hrs', status: 'borderline' },
          { day: 'Tue', value: 7.2, label: '7.2 hrs', status: 'optimal' },
          { day: 'Wed', value: 6.5, label: '6.5 hrs', status: 'borderline' },
          { day: 'Thu', value: 7.5, label: '7.5 hrs', status: 'optimal' },
          { day: 'Fri', value: 8.0, label: '8.0 hrs', status: 'optimal' },
          { day: 'Sat', value: 7.3, label: '7.3 hrs', status: 'optimal' },
          { day: 'Today', value: 7.15, label: '7.15 hrs', status: 'optimal', current: true },
        ];
      default:
        return [
          { day: 'Mon', value: 70, label: '70', status: 'normal' },
          { day: 'Tue', value: 72, label: '72', status: 'normal' },
          { day: 'Wed', value: 68, label: '68', status: 'optimal' },
          { day: 'Thu', value: 74, label: '74', status: 'normal' },
          { day: 'Fri', value: 80, label: '80', status: 'elevated' },
          { day: 'Sat', value: 71, label: '71', status: 'optimal' },
          { day: 'Today', value: 72, label: '72', status: 'normal', current: true },
        ];
    }
  };

  const points = getGraphData();
  const values = points.map((p) => p.value);
  const minVal = Math.min(...values) * 0.9;
  const maxVal = Math.max(...values) * 1.08;

  return (
    <div className="w-full bg-gradient-to-br from-white via-[#FAF9FF] to-[#F3EFFF] rounded-[24px] p-5 sm:p-6 border border-purple-100 shadow-[0_4px_20px_rgba(108,92,231,0.06)] relative overflow-hidden">
      {/* Background Cybernetic Grid & Ambient Neon Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-400/10 via-cyan-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-indigo-500/10 via-violet-400/10 to-transparent rounded-full blur-2xl pointer-events-none" />

      {/* Top Header of the Futuristic Bar Graph */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)] animate-pulse" />
            <span className="text-[11px] font-black tracking-widest uppercase bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Telemetry Telemetry &bull; 7-Day Variation Spectrum
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
            Range Variation Analytics
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100/70 text-emerald-700 border border-emerald-200">
              {metric.inRangePercent}% In Target Range
            </span>
          </h3>
        </div>

        {/* Legend / Status badges */}
        <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-slate-200/60 shadow-2xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            <span>Optimal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6C5CE7] shadow-[0_0_6px_rgba(108,92,231,0.8)]" />
            <span>Normal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
            <span>Borderline</span>
          </div>
        </div>
      </div>

      {/* Main Futuristic Bar Graph Canvas Area */}
      <div className="relative pt-4 pb-2 px-2 sm:px-6">
        {/* Shaded Target Zone Background Band */}
        <div className="absolute inset-x-2 sm:inset-x-6 top-12 bottom-12 bg-gradient-to-r from-emerald-500/5 via-cyan-500/5 to-purple-500/5 rounded-2xl border-y border-dashed border-emerald-400/30 flex items-start justify-end pr-3 pt-1 pointer-events-none">
          <span className="text-[10px] font-bold text-emerald-600/80 uppercase tracking-wider flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Target Band: {metric.targetRange}
          </span>
        </div>

        {/* Dotted Baseline Line */}
        <div className="absolute inset-x-2 sm:inset-x-6 top-1/2 -translate-y-1/2 border-b border-indigo-300/40 border-dashed pointer-events-none flex justify-start pl-2">
          <span className="text-[9px] font-semibold text-indigo-400 -mt-3.5 bg-white/70 px-1 rounded">
            Median Baseline: {metric.averageValue}
          </span>
        </div>

        {/* The 7 Interactive Bars */}
        <div className="grid grid-cols-7 gap-2 sm:gap-6 items-end h-52 relative z-10">
          {points.map((pt, idx) => {
            const isHovered = hoveredBarIndex === idx;
            // Calculate proportional bar height
            const heightPercent = Math.min(
              95,
              Math.max(25, ((pt.value - minVal) / (maxVal - minVal)) * 100)
            );

            // Determine futuristic gradients
            const getBarGradient = () => {
              if (pt.current) {
                return 'from-[#6C5CE7] via-[#8B5CF6] to-[#00D2D3] shadow-[0_0_15px_rgba(108,92,231,0.5)]';
              }
              if (pt.status === 'optimal') {
                return 'from-emerald-500 via-teal-400 to-cyan-400 shadow-[0_0_10px_rgba(16,185,129,0.35)]';
              }
              if (pt.status === 'borderline' || pt.status === 'elevated') {
                return 'from-amber-500 via-orange-400 to-rose-400 shadow-[0_0_10px_rgba(245,158,11,0.35)]';
              }
              return 'from-[#7064E9] to-[#9B8CFA] shadow-[0_0_8px_rgba(112,100,233,0.3)]';
            };

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredBarIndex(idx)}
                onMouseLeave={() => setHoveredBarIndex(null)}
                className="flex flex-col items-center h-full justify-end group cursor-pointer relative"
              >
                {/* Floating HUD Tooltip on Hover */}
                {isHovered && (
                  <div className="absolute -top-12 z-30 bg-slate-900/95 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-xl border border-purple-400/40 animate-in fade-in zoom-in-95 duration-150 whitespace-nowrap pointer-events-none flex flex-col items-center">
                    <span className="text-[11px] text-cyan-300 font-extrabold">{pt.label}</span>
                    <span className="text-[9px] text-slate-300 capitalize">{pt.day} &bull; {pt.status}</span>
                    <div className="w-2 h-2 bg-slate-900 rotate-45 -mb-2 mt-0.5 border-r border-b border-purple-400/40" />
                  </div>
                )}

                {/* Top Glowing Orb / Cap */}
                <div
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 border-white -mb-2 z-20 transition-all duration-300 ${
                    pt.current
                      ? 'bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,1)] scale-110'
                      : isHovered
                      ? 'bg-purple-300 scale-125'
                      : 'bg-indigo-400'
                  }`}
                />

                {/* The Vertical Glowing Bar */}
                <div className="w-5 sm:w-8 md:w-10 bg-slate-100 rounded-2xl p-0.5 h-full flex flex-col justify-end overflow-hidden group-hover:bg-purple-50 transition-colors">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-2xl bg-gradient-to-t ${getBarGradient()} transition-all duration-500 relative flex items-center justify-center`}
                  >
                    {/* Subtle internal scanlines */}
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:4px_4px]" />
                  </div>
                </div>

                {/* Day Label at Bottom */}
                <div className="mt-2 text-center">
                  <span
                    className={`text-[11px] sm:text-xs font-bold transition-colors block ${
                      pt.current
                        ? 'text-[#6C5CE7] font-black'
                        : isHovered
                        ? 'text-slate-900 font-extrabold'
                        : 'text-slate-400'
                    }`}
                  >
                    {pt.day}
                  </span>
                  {pt.current && (
                    <span className="inline-block w-1 h-1 rounded-full bg-[#6C5CE7] -mt-1" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3 Futuristic Micro-Diagnostic Chips at Bottom */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-purple-100/70">
        <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/70 border border-purple-100/80 backdrop-blur-sm">
          <div className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Circadian Fluctuation
            </span>
            <span className="text-xs font-extrabold text-slate-800">
              Low Variation (&plusmn;3.8% Drift)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/70 border border-purple-100/80 backdrop-blur-sm">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Peak Delta Threshold
            </span>
            <span className="text-xs font-extrabold text-slate-800">
              Optimal Recovery Index
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/70 border border-purple-100/80 backdrop-blur-sm">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Clinical Stability Score
            </span>
            <span className="text-xs font-extrabold text-emerald-600">
              96 / 100 (Tier-1 Solid)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
