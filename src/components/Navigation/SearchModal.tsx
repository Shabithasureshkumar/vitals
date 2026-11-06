import React, { useState } from 'react';
import { Search, X, Heart, Activity, Droplet, User, ChevronRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectVital?: (id: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectVital,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const quickResults = [
    { id: 'heart-rate', title: 'Heart Rate Records', category: 'Vitals', value: '72 BPM (Resting)', icon: Heart, color: 'text-rose-500' },
    { id: 'blood-pressure', title: 'Blood Pressure Log', category: 'Vitals', value: '132/86 mmHg', icon: Activity, color: 'text-amber-500' },
    { id: 'blood-glucose', title: 'Blood Glucose Trending', category: 'Lab', value: '110 mg/dL', icon: Droplet, color: 'text-pink-500' },
    { id: 'patient-records', title: 'David Brock - General Physician', category: 'Staff', value: 'ID #MED-8849', icon: User, color: 'text-violet-500' },
  ];

  const filtered = quickResults.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()) ||
      item.value.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-150">
        <div className="flex items-center px-5 py-4 border-b border-slate-100">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search vitals, telemetry, patients, devices..."
            className="w-full text-sm font-semibold text-slate-800 placeholder:text-slate-400 outline-none"
          />
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-3 max-h-80 overflow-y-auto space-y-1">
          {filtered.length > 0 ? (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectVital?.(item.id);
                    onClose();
                  }}
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center">
                      <Icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 group-hover:text-violet-600 transition-colors">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-slate-400">{item.value}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                      {item.category}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-violet-500 transition-colors" />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-8 text-center text-xs text-slate-400">
              No medical records matching "{query}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
