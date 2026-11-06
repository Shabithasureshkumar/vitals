import React, { useState } from 'react';
import { VitalMetric, TimeRange } from '../../types';
import { VitalMetricCard } from './VitalMetricCard';
import HumanBody360 from '../HumanBody360';
import { cn } from '../../utils/cn';

interface TodaySummaryProps {
  metrics: VitalMetric[];
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  onSelectMetric?: (metricId: string) => void;
  className?: string;
}

export const TodaySummary: React.FC<TodaySummaryProps> = ({
  metrics,
  timeRange,
  onTimeRangeChange,
  onSelectMetric,
  className,
}) => {
  const [highlightedVitalId, setHighlightedVitalId] = useState<string | null>(null);

  const leftMetrics = metrics.slice(0, 4);
  const rightMetrics = metrics.slice(4, 8);

  const ranges: TimeRange[] = ['Day', 'Week', 'Month'];

  return (
    <div className={cn("bg-white rounded-[24px] p-3.5 sm:p-4 lg:p-5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] h-full flex flex-col justify-between overflow-hidden", className)}>
      {/* Header Row */}
      <div className="flex items-center justify-between mb-2 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Today's Summary
            </h2>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Telemetry
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Click on any metric card or anatomy node to view deep AI insights & history.
          </p>
        </div>

        {/* Time Filter Pills */}
        <div className="flex items-center bg-slate-50 p-1 rounded-full border border-slate-100 text-xs">
          {ranges.map((range) => {
            const isActive = timeRange === range;
            return (
              <button
                key={range}
                onClick={() => onTimeRangeChange(range)}
                className={cn(
                  'px-3 py-1 rounded-full text-[11px] font-semibold transition-all duration-150 cursor-pointer',
                  isActive
                    ? 'bg-[#6C5CE7] text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                )}
              >
                {range}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3-Column Layout: Left 4 Cards | Center Holographic Body | Right 4 Cards */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-2.5 sm:gap-3 items-stretch min-h-0">
        {/* Left Column of Vitals (Heart Rate, Blood Pressure, Blood Oxygen, Temperature) */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-2 h-full min-h-0">
          {leftMetrics.map((metric) => (
            <VitalMetricCard
              key={metric.id}
              metric={metric}
              isHighlighted={highlightedVitalId === metric.id}
              onSelect={() => onSelectMetric?.(metric.id)}
            />
          ))}
        </div>

        {/* Center 360° Holographic Human Body Simulation */}
        <div className="lg:col-span-4 flex items-center justify-center h-full min-h-0 relative">
          <HumanBody360
            activeVitalId={highlightedVitalId}
            onHoverPoint={(id) => setHighlightedVitalId(id)}
            onClickPoint={(id) => onSelectMetric?.(id)}
          />
        </div>

        {/* Right Column of Vitals (Blood Weight, Blood Glucose, Activity, Sleep) */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-2 h-full min-h-0">
          {rightMetrics.map((metric) => (
            <VitalMetricCard
              key={metric.id}
              metric={metric}
              isHighlighted={highlightedVitalId === metric.id}
              onSelect={() => onSelectMetric?.(metric.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
