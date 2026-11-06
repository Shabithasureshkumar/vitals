import React from 'react';
import { RefreshCw, Plus } from 'lucide-react';
import { Badge } from '../Common/Badge';

interface DashboardHeaderProps {
  lastSyncTime: string;
  onRefresh?: () => void;
  onAddReadingClick: () => void;
  isRefreshing?: boolean;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  lastSyncTime,
  onRefresh,
  onAddReadingClick,
  isRefreshing = false,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2 sm:py-2.5 shrink-0 select-none">
      {/* Title & Live Status */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
          Vitals
        </h1>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
          <span className="text-[11px] sm:text-xs text-slate-500 font-medium">
            Live reading connected from device
          </span>
        </div>
      </div>

      {/* Sync Status, Live Pill & Add Reading Button */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Sync Status */}
        <button
          onClick={onRefresh}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors group cursor-pointer"
        >
          <RefreshCw
            className={`w-3.5 h-3.5 text-[#6C5CE7] transition-transform ${
              isRefreshing ? 'animate-spin' : 'group-hover:rotate-180 duration-500'
            }`}
          />
          <span>Last sync updated {lastSyncTime}</span>
        </button>

        {/* Live Status Pill */}
        <Badge status="Live" />

        {/* Add Reading Action Button */}
        <button
          onClick={onAddReadingClick}
          className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-[#6C5CE7] hover:bg-[#5E4DE2] text-white font-bold text-xs shadow-sm transition-all duration-150 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Add Reading</span>
        </button>
      </div>
    </div>
  );
};
