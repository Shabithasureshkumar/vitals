import React from 'react';
import { cn } from '../../utils/cn';
import { VitalStatus } from '../../types';

interface BadgeProps {
  status: VitalStatus | 'Live' | 'Syncing' | 'Offline';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ status, className }) => {
  const getStyles = () => {
    switch (status) {
      case 'Normal':
        return 'bg-[#EBFDF5] text-[#10B981] font-medium';
      case 'Good':
        return 'bg-[#EBFDF5] text-[#10B981] font-medium';
      case 'Borderline':
        return 'bg-[#FEF3C7] text-[#D97706] font-medium';
      case 'Moderate':
        return 'bg-[#FFF7ED] text-[#EA580C] font-medium';
      case 'Critical':
        return 'bg-[#FEE2E2] text-[#EF4444] font-medium';
      case 'Live':
        return 'bg-[#E8FAF2] text-[#10B981] font-semibold px-2.5 py-0.5 flex items-center gap-1.5';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  if (status === 'Live') {
    return (
      <span className={cn('inline-flex items-center text-[11px] rounded-full', getStyles(), className)}>
        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
        Live
      </span>
    );
  }

  return (
    <span
      className={cn(
        'inline-flex items-center text-[10px] px-2 py-0.5 rounded-full transition-colors leading-none',
        getStyles(),
        className
      )}
    >
      {status}
    </span>
  );
};
