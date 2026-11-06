import React from 'react';
import { VitalMetric } from '../../types';
import { Badge } from '../Common/Badge';
import { DeviceVisual } from './DeviceVisuals';
import { cn } from '../../utils/cn';

interface VitalMetricCardProps {
  metric: VitalMetric;
  isHighlighted?: boolean;
  onSelect?: () => void;
}

export const VitalMetricCard: React.FC<VitalMetricCardProps> = ({
  metric,
  isHighlighted = false,
  onSelect,
}) => {
  const getIconSvg = () => {
    switch (metric.iconType) {
      case 'heart':
        return (
          <div className="w-5 h-5 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
            <svg className="w-3 h-3 text-rose-500 fill-rose-500/20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" fill="none">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>
        );
      case 'bp':
        return (
          <div className="w-5 h-5 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
            <svg className="w-3 h-3 text-amber-500" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" fill="none">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
        );
      case 'oxygen':
        return (
          <div className="w-5 h-5 rounded-full bg-cyan-50 flex items-center justify-center shrink-0">
            <svg className="w-3 h-3 text-cyan-500 fill-cyan-500/20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" fill="none">
              <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
            </svg>
          </div>
        );
      case 'temp':
        return (
          <div className="w-5 h-5 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
            <svg className="w-3 h-3 text-purple-500" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" fill="none">
              <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
            </svg>
          </div>
        );
      case 'weight':
        return (
          <div className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
            <svg className="w-3 h-3 text-indigo-500" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" fill="none">
              <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
            </svg>
          </div>
        );
      case 'glucose':
        return (
          <div className="w-5 h-5 rounded-full bg-pink-50 flex items-center justify-center shrink-0">
            <svg className="w-3 h-3 text-pink-500 fill-pink-500/20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" fill="none">
              <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
            </svg>
          </div>
        );
      case 'activity':
        return (
          <div className="w-5 h-5 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
            <svg className="w-3 h-3 text-orange-500" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" fill="none">
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
              <line x1="4" x2="4" y1="22" y2="15" />
            </svg>
          </div>
        );
      case 'sleep':
        return (
          <div className="w-5 h-5 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
            <svg className="w-3 h-3 text-purple-500 fill-purple-500/20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" fill="none">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  // Center Empathic Content filling the gap between Header and Values
  const getCenterEmpathicContent = () => {
    switch (metric.iconType) {
      case 'heart':
        return {
          subtitle: 'Autonomic rhythm calm & balanced',
          visual: (
            <div className="w-full h-3 my-0.5 flex items-center overflow-hidden">
              <svg className="w-full h-full text-rose-500 stroke-current opacity-85" viewBox="0 0 140 20" fill="none">
                <path
                  d="M0 10 L40 10 L47 2 L54 18 L62 5 L69 14 L76 10 L140 10"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ecg-path-flow"
                />
              </svg>
            </div>
          ),
          rangeTag: 'Norm 60-100',
        };
      case 'bp':
        return {
          subtitle: 'Vascular tone steady • Peripheral flow smooth',
          visual: (
            <div className="w-full h-3 my-0.5 flex items-center overflow-hidden">
              <svg className="w-full h-full text-amber-500 stroke-current opacity-85" viewBox="0 0 140 20" fill="none">
                <path
                  d="M0 10 Q25 4 50 10 T90 10 T130 10 T140 10"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="ecg-path-flow"
                />
              </svg>
            </div>
          ),
          rangeTag: 'Target <120/80',
        };
      case 'oxygen':
        return {
          subtitle: 'Optimal cellular oxygen perfusion',
          visual: (
            <div className="w-full bg-cyan-100/70 h-1.5 rounded-full overflow-hidden my-1">
              <div className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-full w-[98%] rounded-full animate-pulse" />
            </div>
          ),
          rangeTag: 'Optimal 95-100%',
        };
      case 'temp':
        return {
          subtitle: 'Thermal homeostasis in equilibrium',
          visual: (
            <div className="w-full bg-purple-100/70 h-1.5 rounded-full overflow-hidden my-1">
              <div className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400 h-full w-[75%] rounded-full" />
            </div>
          ),
          rangeTag: 'Norm 97.8-99.1°',
        };
      case 'weight':
        return {
          subtitle: 'Lean mass stable • Hydration tone on target',
          visual: (
            <div className="w-full h-3 my-0.5 flex items-center overflow-hidden">
              <svg className="w-full h-full text-indigo-500 stroke-current opacity-85" viewBox="0 0 140 20" fill="none">
                <path
                  d="M0 12 Q35 7 70 10 T140 8"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          ),
          rangeTag: 'Target 180 lbs',
        };
      case 'glucose':
        return {
          subtitle: 'Gentle post-meal glycemic variance',
          visual: (
            <div className="w-full h-3 my-0.5 flex items-center overflow-hidden">
              <svg className="w-full h-full text-pink-500 stroke-current opacity-85" viewBox="0 0 140 20" fill="none">
                <path
                  d="M0 12 Q35 4 70 10 T140 8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="ecg-path-flow"
                />
              </svg>
            </div>
          ),
          rangeTag: 'Norm 70-110',
        };
      case 'activity':
        return {
          subtitle: '84% of daily goal • Joint cadence energized',
          visual: (
            <div className="w-full bg-orange-100/70 h-1.5 rounded-full overflow-hidden my-1">
              <div
                className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full"
                style={{ width: `${metric.secondaryValue ?? 84}%` }}
              />
            </div>
          ),
          rangeTag: 'Goal 10,000 steps',
        };
      case 'sleep':
        return {
          subtitle: 'Slow-wave REM restorative delta +30m',
          visual: (
            <div className="w-full bg-purple-100/70 h-1.5 rounded-full overflow-hidden my-1">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-600 h-full w-[91%] rounded-full animate-pulse" />
            </div>
          ),
          rangeTag: 'Target 7-9 hrs',
        };
      default:
        return null;
    }
  };

  const centerContent = getCenterEmpathicContent();
  const isActivity = metric.iconType === 'activity';

  return (
    <div
      onClick={onSelect}
      className={cn(
        'group bg-white rounded-2xl p-2.5 sm:p-3 border transition-all duration-200 cursor-pointer flex-1 flex flex-col justify-between overflow-hidden relative shadow-[0_2px_6px_rgba(0,0,0,0.03),0_1px_2px_rgba(0,0,0,0.02)]',
        isHighlighted
          ? 'ring-2 ring-violet-500 border-transparent shadow-[0_4px_14px_rgba(108,92,231,0.12)]'
          : 'border-slate-100 hover:border-purple-200/70 hover:shadow-[0_4px_12px_rgba(108,92,231,0.06)]'
      )}
    >
      {/* 1. Top Header: Icon + Metric Name & Badge */}
      <div className="flex items-center justify-between gap-1.5 mb-0.5 shrink-0">
        <div className="flex items-center gap-1.5 min-w-0">
          {getIconSvg()}
          <span className="text-xs sm:text-[13px] font-bold text-slate-800 tracking-tight truncate">
            {metric.name}
          </span>
        </div>
        <Badge status={metric.status} />
      </div>

      {/* 2. Center Empathic Telemetry Section (Fills the center gap between Title and Value) */}
      {centerContent && (
        <div className="my-auto py-1 px-1.5 bg-slate-50/70 rounded-xl border border-slate-100/70 flex flex-col justify-center">
          <div className="flex items-center justify-between gap-1 text-[9px] font-semibold text-slate-400">
            <span className="text-slate-600 font-medium truncate">
              {centerContent.subtitle}
            </span>
            <span className="text-violet-600 font-bold shrink-0 bg-violet-50/80 px-1 py-0.2 rounded text-[8.5px]">
              {centerContent.rangeTag}
            </span>
          </div>
          {centerContent.visual}
        </div>
      )}

      {/* 3. Bottom Row: Main Stats & 3D Visual Asset */}
      <div className="flex items-center justify-between gap-2 mt-auto shrink-0 pt-0.5">
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-1">
            <span className="text-lg sm:text-xl lg:text-[22px] font-black text-slate-900 tracking-tight font-sans">
              {metric.value}
            </span>
            <span className="text-[11px] font-semibold text-slate-400">
              {metric.unit}
            </span>
          </div>

          {/* Trend Indicator */}
          {isActivity ? (
            <div className="flex items-center gap-1 text-[10px] font-medium text-slate-400 mt-0.5">
              <span className="text-orange-500 font-bold text-[9px]">▲</span>
              <span className="font-semibold text-orange-500">{metric.secondaryValue ?? 84}%</span>
              <span>of daily goal</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 mt-0.5 text-[10px] font-medium">
              <span
                className={cn(
                  'flex items-center font-bold text-[9px]',
                  metric.trendType === 'warning'
                    ? 'text-orange-500'
                    : metric.id === 'sleep'
                    ? 'text-purple-600'
                    : 'text-emerald-500'
                )}
              >
                {metric.trendDirection === 'down' ? '▼' : '▲'}
              </span>
              <span
                className={cn(
                  'truncate font-semibold text-[10px]',
                  metric.trendType === 'warning'
                    ? 'text-orange-500'
                    : metric.id === 'sleep'
                    ? 'text-purple-600'
                    : 'text-emerald-600'
                )}
              >
                {metric.trendText}
              </span>
            </div>
          )}
        </div>

        {/* 3D Visual Asset */}
        <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
          <DeviceVisual type={metric.deviceVisualType} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};
