import React, { useState } from 'react';
import { X, Heart, Activity, Droplet, Thermometer, Scale, Moon, Check } from 'lucide-react';
import { VitalStatus } from '../../types';

interface AddReadingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddReading: (data: {
    metricId: string;
    value: string | number;
    status: VitalStatus;
    notes?: string;
  }) => void;
}

export const AddReadingModal: React.FC<AddReadingModalProps> = ({
  isOpen,
  onClose,
  onAddReading,
}) => {
  const [selectedMetric, setSelectedMetric] = useState('heart-rate');
  const [readingValue, setReadingValue] = useState('75');
  const [readingStatus, setReadingStatus] = useState<VitalStatus>('Normal');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const metricOptions = [
    { id: 'heart-rate', name: 'Heart Rate', unit: 'BPM', defaultVal: '72', icon: Heart, color: 'text-rose-500' },
    { id: 'blood-pressure', name: 'Blood Pressure', unit: 'mmHg', defaultVal: '120/80', icon: Activity, color: 'text-amber-500' },
    { id: 'blood-oxygen', name: 'Blood Oxygen', unit: '%', defaultVal: '99', icon: Droplet, color: 'text-cyan-500' },
    { id: 'temperature', name: 'Temperature', unit: '°F', defaultVal: '98.6', icon: Thermometer, color: 'text-violet-500' },
    { id: 'blood-weight', name: 'Blood Weight', unit: 'mg/dL', defaultVal: '182', icon: Scale, color: 'text-indigo-500' },
    { id: 'blood-glucose', name: 'Blood Glucose', unit: 'mg/dL', defaultVal: '105', icon: Droplet, color: 'text-pink-500' },
    { id: 'activity', name: 'Activity', unit: 'steps', defaultVal: '9,200', icon: Activity, color: 'text-orange-500' },
    { id: 'sleep', name: 'Sleep', unit: 'hrs', defaultVal: '7.5', icon: Moon, color: 'text-violet-500' },
  ];

  const currentMetric = metricOptions.find((m) => m.id === selectedMetric) || metricOptions[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddReading({
      metricId: selectedMetric,
      value: readingValue,
      status: readingStatus,
      notes,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 relative animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">Add New Health Reading</h3>
            <p className="text-xs text-slate-400 font-medium">Record a manual or clinical measurement</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Select Metric */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Select Metric
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {metricOptions.map((opt) => {
                const isSelected = selectedMetric === opt.id;
                const Icon = opt.icon;
                return (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => {
                      setSelectedMetric(opt.id);
                      setReadingValue(opt.defaultVal);
                    }}
                    className={`flex flex-col items-center p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'border-violet-600 bg-violet-50/70 text-violet-700 shadow-sm'
                        : 'border-slate-200/80 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mb-1 ${opt.color}`} />
                    <span className="text-[11px] font-bold truncate w-full">{opt.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reading Value and Unit */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Reading Value ({currentMetric.unit})
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={readingValue}
                onChange={(e) => setReadingValue(e.target.value)}
                placeholder={`e.g. ${currentMetric.defaultVal}`}
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none text-slate-800 text-sm font-semibold"
              />
              <span className="absolute right-4 top-2.5 text-xs font-bold text-slate-400">
                {currentMetric.unit}
              </span>
            </div>
          </div>

          {/* Clinical Classification */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Classification
            </label>
            <div className="flex gap-2">
              {(['Normal', 'Borderline', 'Moderate', 'Good'] as VitalStatus[]).map((status) => (
                <button
                  type="button"
                  key={status}
                  onClick={() => setReadingStatus(status)}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    readingStatus === status
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Clinical Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Clinical Notes (Optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Measured 30 minutes post lunch, rested state."
              className="w-full px-4 py-2 rounded-2xl border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none text-slate-800 text-xs font-medium"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-indigo-500/25 hover:brightness-105 transition-all cursor-pointer"
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              Save Reading
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
