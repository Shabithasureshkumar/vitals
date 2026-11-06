import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  Calendar, 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle2, 
  Heart, 
  Activity, 
  Droplet, 
  Thermometer, 
  Scale, 
  Moon,
  Clock
} from 'lucide-react';
import { MetricDetailConfig, VitalStatus } from '../../types';
import { Badge } from '../Common/Badge';
import { DeviceVisual } from '../Vitals/DeviceVisuals';
import { AddReadingModal } from '../Header/AddReadingModal';
import { FuturisticRangeBarGraph } from './FuturisticRangeBarGraph';
import { cn } from '../../utils/cn';

interface MetricDetailViewProps {
  metric: MetricDetailConfig;
  allMetrics: Record<string, MetricDetailConfig>;
  onSelectMetric: (id: string) => void;
  onBack: () => void;
  onAddReading: (data: {
    metricId: string;
    value: string | number;
    status: VitalStatus;
    notes?: string;
  }) => void;
}

export const MetricDetailView: React.FC<MetricDetailViewProps> = ({
  metric,
  onSelectMetric,
  onBack,
  onAddReading,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'This Week' | 'This Month'>('All');
  const [selectedMonth, setSelectedMonth] = useState('November 2026');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const months = ['November 2026', 'October 2026', 'September 2026'];

  const metricTabs = [
    { id: 'heart-rate', name: 'Heart Rate', icon: Heart, color: 'text-rose-500' },
    { id: 'blood-pressure', name: 'Blood Pressure', icon: Activity, color: 'text-amber-500' },
    { id: 'blood-oxygen', name: 'Blood Oxygen', icon: Droplet, color: 'text-cyan-500' },
    { id: 'temperature', name: 'Temperature', icon: Thermometer, color: 'text-purple-500' },
    { id: 'blood-weight', name: 'Blood Weight', icon: Scale, color: 'text-indigo-500' },
    { id: 'blood-glucose', name: 'Blood Glucose', icon: Droplet, color: 'text-pink-500' },
    { id: 'activity', name: 'Activity', icon: Activity, color: 'text-orange-500' },
    { id: 'sleep', name: 'Sleep', icon: Moon, color: 'text-purple-500' },
  ];

  const filteredReadings = metric.readings.filter((r) => {
    if (selectedFilter === 'This Week') {
      return r.date.includes('Nov 14') || r.date.includes('Nov 13') || r.date.includes('Nov 12');
    }
    if (selectedFilter === 'This Month') {
      return r.date.includes('Nov');
    }
    return true;
  });

  return (
    <div className="w-full flex-1 flex flex-col gap-5 animate-in fade-in duration-200">
      {/* Top Header: Back Button, Breadcrumb & Vitals Switcher Tabs */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-slate-100 shadow-sm flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
              <span>Back to Overview</span>
            </button>
            <div className="h-4 w-px bg-slate-200 hidden sm:block" />
            <div className="flex items-center gap-2 hidden sm:flex">
              <span className="w-2 h-2 rounded-full bg-[#6C5CE7] animate-ping" />
              <span className="text-xs font-bold text-slate-500">
                Clinical Telemetry Spectrum &bull; <strong className="text-slate-900 font-extrabold">{metric.name}</strong>
              </span>
            </div>
          </div>

          {/* "+ Add Reading" Action Shortcut */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#6C5CE7] to-[#8B5CF6] hover:brightness-105 text-white font-extrabold text-xs shadow-md shadow-indigo-500/20 transition-all duration-150 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add {metric.name} Reading</span>
          </button>
        </div>

        {/* 8-Vitals Futuristic Selector Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          {metricTabs.map((tab) => {
            const isSelected = metric.id === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectMetric(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer',
                  isSelected
                    ? 'bg-gradient-to-r from-[#6C5CE7] to-[#8B5CF6] text-white shadow-md shadow-indigo-500/25 scale-[1.03]'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-100'
                )}
              >
                <Icon className={cn('w-3.5 h-3.5', isSelected ? 'text-white' : tab.color)} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Metric Spotlight Card */}
      <div className="bg-white rounded-[24px] p-5 sm:p-6 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-purple-50 via-slate-50 to-indigo-50 border border-purple-100/80 p-2 flex items-center justify-center shrink-0 shadow-inner">
              <DeviceVisual type={metric.deviceVisualType} className="w-full h-full" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-sans">
                  {metric.name}
                </h2>
                <Badge status={metric.status} />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-sans">
                  {metric.currentValue}
                </span>
                <span className="text-sm font-bold text-slate-400">
                  {metric.unit}
                </span>
                <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full ml-1 border border-emerald-100">
                  {metric.trendText}
                </span>
              </div>
            </div>
          </div>

          {/* Date & Filter Pickers */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60 text-xs">
              {(['All', 'This Week', 'This Month'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={cn(
                    'px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer',
                    selectedFilter === filter
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Custom Month Selector */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/60 text-xs font-semibold text-slate-700">
              <Calendar className="w-3.5 h-3.5 text-[#6C5CE7]" />
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-transparent border-none outline-none font-bold text-xs text-slate-700 cursor-pointer"
              >
                {months.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 4 Diagnostic Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-5">
          <div className="bg-[#F8F9FD] rounded-2xl p-3.5 sm:p-4 border border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Target Range
            </span>
            <div className="text-base sm:text-lg font-black text-slate-900">
              {metric.targetRange}
            </div>
            <span className="text-[10px] font-bold text-emerald-600 mt-1 block">
              &bull; Standard Clinical Norm
            </span>
          </div>

          <div className="bg-[#F8F9FD] rounded-2xl p-3.5 sm:p-4 border border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Average Reading
            </span>
            <div className="text-base sm:text-lg font-black text-slate-900">
              {metric.averageValue}
            </div>
            <span className="text-[10px] font-semibold text-slate-500 mt-1 block">
              &bull; Past 14-day median
            </span>
          </div>

          <div className="bg-[#F8F9FD] rounded-2xl p-3.5 sm:p-4 border border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Lowest (Min)
            </span>
            <div className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-1">
              <TrendingDown className="w-4 h-4 text-emerald-500" />
              <span>{metric.lowestValue}</span>
            </div>
            <span className="text-[10px] font-semibold text-slate-500 mt-1 block">
              &bull; Resting baseline
            </span>
          </div>

          <div className="bg-[#F8F9FD] rounded-2xl p-3.5 sm:p-4 border border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Highest (Max)
            </span>
            <div className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-amber-500" />
              <span>{metric.highestValue}</span>
            </div>
            <span className="text-[10px] font-semibold text-slate-500 mt-1 block">
              &bull; Peak recorded value
            </span>
          </div>
        </div>

        {/* Futuristic Range Variation Bar Graph */}
        <div className="mt-6">
          <FuturisticRangeBarGraph metric={metric} />
        </div>
      </div>

      {/* 2-Column Split: Empathic AI Insights (Left) & Readings History Table (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column: Empathic Content & Recommendations (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Empathic Note Card */}
          <div className="bg-gradient-to-br from-[#FAF8FF] via-[#F5F0FF] to-[#EBE4FF] rounded-[24px] p-5 border border-purple-200/70 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-400/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-2.5 mb-2.5 text-[#6C5CE7] relative z-10">
              <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center">
                <Sparkles className="w-4 h-4 fill-[#6C5CE7]" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">
                {metric.empathyNote.title}
              </h3>
            </div>
            <p className="text-xs text-slate-700 font-medium leading-relaxed mb-4 relative z-10">
              "{metric.empathyNote.message}"
            </p>

            <div className="pt-3 border-t border-purple-200/60 relative z-10">
              <span className="text-[11px] font-black text-[#6C5CE7] uppercase tracking-wider block mb-2">
                AI Clinical Guidance
              </span>
              <ul className="space-y-2">
                {metric.aiRecommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-600 font-medium leading-snug">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Historical & Recent Readings Log (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-[24px] p-5 sm:p-6 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Reading History & Logs
              </h3>
              <p className="text-[11px] text-slate-400">
                Showing {filteredReadings.length} telemetry entries
              </p>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-50 text-[#6C5CE7] font-bold text-xs hover:bg-purple-100 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record Reading</span>
            </button>
          </div>

          <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
            {filteredReadings.map((reading) => (
              <div
                key={reading.id}
                className="p-3 rounded-2xl bg-slate-50/70 border border-slate-100/70 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/60 flex items-center justify-center font-bold text-xs text-[#6C5CE7] shrink-0 shadow-2xs">
                    <Clock className="w-4 h-4 text-[#6C5CE7]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">
                        {reading.value} {reading.unit}
                      </span>
                      <Badge status={reading.status} />
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium">
                      {reading.date} &bull; {reading.time} via {reading.source}
                    </p>
                    {reading.notes && (
                      <p className="text-[10px] text-slate-500 italic mt-0.5">
                        "{reading.notes}"
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-right sm:self-center shrink-0">
                  <span className="text-[10px] font-semibold text-slate-400 bg-white px-2 py-0.5 rounded-md border border-slate-100">
                    Verified Telemetry
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Manual Add Reading Modal */}
      <AddReadingModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddReading={(data) => {
          onAddReading(data);
          setIsAddModalOpen(false);
        }}
      />
    </div>
  );
};
