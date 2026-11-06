import React, { useState } from 'react';
import { Calendar, Check } from 'lucide-react';
import { ChecklistItem } from '../../types';
import { cn } from '../../utils/cn';

interface AIChecklistProps {
  initialItems: ChecklistItem[];
}

export const AIChecklist: React.FC<AIChecklistProps> = ({ initialItems }) => {
  const [items, setItems] = useState<ChecklistItem[]>(initialItems);

  const toggleCheck = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <div className="bg-white rounded-[24px] p-4 sm:p-5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-2 shrink-0">
        <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#6C5CE7] flex items-center justify-center shrink-0">
          <Calendar className="w-4 h-4" />
        </div>
        <h3 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
          Daily AI Checklist
        </h3>
      </div>

      {/* Checklist items - Spaced out to fill height */}
      <div className="flex-1 flex flex-col justify-around space-y-1.5">
        {items.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className="flex items-start gap-2.5 cursor-pointer group select-none py-1"
            >
              {/* Checkbox square */}
              <div
                className={cn(
                  'w-4 h-4 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors',
                  item.completed
                    ? 'bg-[#6C5CE7] text-white'
                    : 'border border-slate-300 bg-white group-hover:border-[#6C5CE7]'
                )}
              >
                {item.completed && <Check className="w-3 h-3 stroke-[3]" />}
              </div>

              {/* Title & Subtitle */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-900 leading-snug">
                  {item.title}
                </p>
                {item.subtitle && (
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {item.subtitle}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
