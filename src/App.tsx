import React, { useState } from 'react';
import { Navbar } from './components/Navigation/Navbar';
import { SearchModal } from './components/Navigation/SearchModal';
import { DashboardHeader } from './components/Header/DashboardHeader';
import { AddReadingModal } from './components/Header/AddReadingModal';
import { TodaySummary } from './components/Vitals/TodaySummary';
import { ConnectedDevices } from './components/Devices/ConnectedDevices';
import { AIChecklist } from './components/Checklist/AIChecklist';
import { AISynthesis } from './components/AI/AISynthesis';
import { ObservationCard } from './components/AI/ObservationCard';
import { RecommendationCard } from './components/AI/RecommendationCard';
import { MetricDetailView } from './components/VitalsDetail/MetricDetailView';
import { vitalsByRange, initialDevices, initialChecklist, initialAISynthesis } from './data/mockData';
import { initialMetricDetails } from './data/metricDetailData';
import { TimeRange, VitalMetric, VitalStatus, MetricDetailConfig, VitalReading } from './types';

export const App: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('Week');
  const [metrics, setMetrics] = useState<VitalMetric[]>(vitalsByRange['Week']);
  const [metricDetails, setMetricDetails] = useState<Record<string, MetricDetailConfig>>(initialMetricDetails);
  const [selectedMetricId, setSelectedMetricId] = useState<string | null>(null);

  const [devices, setDevices] = useState(initialDevices);
  const [checklist] = useState(initialChecklist);
  const [aiSynthesis] = useState(initialAISynthesis);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('Today 11:20 AM');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleTimeRangeChange = (range: TimeRange) => {
    setTimeRange(range);
    setMetrics(vitalsByRange[range]);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const now = new Date();
      const timeStr = `Today ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      setLastSyncTime(timeStr);
      setIsRefreshing(false);
      showToast('All vitals & telemetry updated from connected devices');
    }, 900);
  };

  const handleAddReading = (data: {
    metricId: string;
    value: string | number;
    status: VitalStatus;
    notes?: string;
  }) => {
    const now = new Date();
    const timeFormatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateFormatted = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    // 1. Update general overview metrics list
    setMetrics((prev) =>
      prev.map((metric) => {
        if (metric.id === data.metricId) {
          return {
            ...metric,
            value: data.value,
            status: data.status,
            trendText: 'Manual reading recorded',
            trendDirection: 'neutral',
          };
        }
        return metric;
      })
    );

    // 2. Update deep clinical metric details & prepend to history
    setMetricDetails((prev) => {
      const currentConfig = prev[data.metricId];
      if (!currentConfig) return prev;

      const newReading: VitalReading = {
        id: `reading-${Date.now()}`,
        date: dateFormatted,
        time: timeFormatted,
        value: data.value,
        numericValue: typeof data.value === 'number' ? data.value : parseFloat(String(data.value)) || undefined,
        unit: currentConfig.unit,
        status: data.status,
        source: 'Manual Physician Entry',
        notes: data.notes || 'Recorded via clinical interface',
      };

      return {
        ...prev,
        [data.metricId]: {
          ...currentConfig,
          currentValue: data.value,
          status: data.status,
          trendText: 'Just logged now',
          readings: [newReading, ...currentConfig.readings],
        },
      };
    });

    const metricName = metricDetails[data.metricId]?.name || data.metricId;
    showToast(`Saved new reading for ${metricName}: ${data.value}`);
  };

  const handleSyncDevice = (deviceId: string) => {
    setDevices((prev) =>
      prev.map((dev) =>
        dev.id === deviceId
          ? { ...dev, lastSynced: 'Synced just now' }
          : dev
      )
    );
    showToast('Device telemetry packet synchronized');
  };

  const activeMetricConfig = selectedMetricId ? metricDetails[selectedMetricId] : null;

  return (
    <div className="min-h-screen lg:h-screen w-full bg-[#FAFAFC] flex flex-col font-sans text-slate-800 antialiased selection:bg-[#6C5CE7] selection:text-white lg:overflow-hidden">
      {/* Top Navbar */}
      <Navbar
        onSearchClick={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 pb-3 sm:pb-4 flex flex-col min-h-0 overflow-y-auto lg:overflow-visible">
        {/* If a vital is selected, show its full dedicated AI insights and history screen */}
        {activeMetricConfig ? (
          <div className="flex-1 w-full py-2 min-h-0 flex flex-col overflow-y-auto">
            <MetricDetailView
              metric={activeMetricConfig}
              allMetrics={metricDetails}
              onSelectMetric={(id) => setSelectedMetricId(id)}
              onBack={() => setSelectedMetricId(null)}
              onAddReading={handleAddReading}
            />
          </div>
        ) : (
          /* Full Overview Dashboard */
          <>
            <DashboardHeader
              lastSyncTime={lastSyncTime}
              onRefresh={handleRefresh}
              onAddReadingClick={() => setIsAddModalOpen(true)}
              isRefreshing={isRefreshing}
            />

            {/* 2-Column Responsive Layout */}
            <div className="flex-1 flex flex-col lg:flex-row gap-3 sm:gap-4 items-stretch min-h-0 pb-1">
              {/* Main Left Column (Today's Summary) */}
              <div className="w-full lg:w-[54%] h-full flex flex-col min-h-0">
                <TodaySummary
                  metrics={metrics}
                  timeRange={timeRange}
                  onTimeRangeChange={handleTimeRangeChange}
                  onSelectMetric={(metricId) => setSelectedMetricId(metricId)}
                  className="flex-1"
                />
              </div>

              {/* Right Column (Connected Devices, Checklist, AI Synthesis, Observation & Recommendation) */}
              <div className="w-full lg:w-[46%] h-full flex flex-col justify-between gap-3 min-h-0">
                {/* Row 1: Connected Devices & Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 min-h-0">
                  <ConnectedDevices
                    devices={devices}
                    onSyncDevice={handleSyncDevice}
                  />
                  <AIChecklist initialItems={checklist} />
                </div>

                {/* Row 2: AI Synthesis Card */}
                <div className="flex-1 min-h-0">
                  <AISynthesis data={aiSynthesis} />
                </div>

                {/* Row 3: Observation & Recommendation Separate Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 min-h-[96px] sm:min-h-[102px] shrink-0">
                  <ObservationCard observation={aiSynthesis.observation} />
                  <RecommendationCard recommendation={aiSynthesis.recommendation} />
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-bottom-5">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Add Reading Modal */}
      <AddReadingModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddReading={handleAddReading}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectVital={(id) => setSelectedMetricId(id)}
      />
    </div>
  );
};

export default App;
