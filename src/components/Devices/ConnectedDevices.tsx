import React, { useState } from 'react';
import { Wifi, ChevronRight } from 'lucide-react';
import { ConnectedDevice } from '../../types';
import deviceBpImg from '../../assets/device_bp.png';
import deviceWatchImg from '../../assets/device_watch.png';
import deviceOxiImg from '../../assets/device_oxi.png';

interface ConnectedDevicesProps {
  devices: ConnectedDevice[];
  onSyncDevice?: (id: string) => void;
}

export const ConnectedDevices: React.FC<ConnectedDevicesProps> = ({
  devices,
  onSyncDevice,
}) => {
  const [selectedDevice, setSelectedDevice] = useState<ConnectedDevice | null>(null);

  const getDeviceThumb = (type: ConnectedDevice['type']) => {
    switch (type) {
      case 'bp':
        return deviceBpImg;
      case 'watch':
        return deviceWatchImg;
      case 'oximeter':
        return deviceOxiImg;
      default:
        return deviceBpImg;
    }
  };

  return (
    <div className="bg-white rounded-[24px] p-4 sm:p-5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] h-full flex flex-col justify-between">
      {/* Card Header */}
      <div className="flex items-start gap-2.5 mb-2 shrink-0">
        <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#6C5CE7] flex items-center justify-center shrink-0">
          <Wifi className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
            Connected Devices
          </h3>
          <p className="text-[11px] font-semibold text-[#10B981] mt-0.5">
            {devices.filter((d) => d.status === 'active').length} Devices Active
          </p>
        </div>
      </div>

      {/* Devices List - Spaces out to fill height */}
      <div className="flex-1 flex flex-col justify-around space-y-1">
        {devices.map((device) => {
          return (
            <div
              key={device.id}
              onClick={() => setSelectedDevice(device)}
              className="flex items-center justify-between py-1.5 px-1 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 bg-slate-50 border border-slate-100 flex items-center justify-center">
                  <img
                    src={getDeviceThumb(device.type)}
                    alt={device.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-800 group-hover:text-[#6C5CE7] transition-colors leading-tight truncate">
                    {device.name}
                  </h4>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shrink-0" />
                    <span className="text-[10px] text-slate-400 font-medium truncate">
                      {device.lastSynced}
                    </span>
                  </div>
                </div>
              </div>

              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors shrink-0" />
            </div>
          );
        })}
      </div>

      {/* Diagnostic Modal */}
      {selectedDevice && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-5 max-w-xs w-full shadow-xl border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-900">Device Diagnostic</span>
              <button
                onClick={() => setSelectedDevice(null)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold"
              >
                ✕
              </button>
            </div>
            <div className="mt-3 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Device</span>
                <span className="font-bold text-slate-800">{selectedDevice.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status</span>
                <span className="text-[#10B981] font-semibold">Active & Paired</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Last Telemetry</span>
                <span className="text-slate-600">{selectedDevice.lastSynced}</span>
              </div>
            </div>
            <button
              onClick={() => {
                onSyncDevice?.(selectedDevice.id);
                setSelectedDevice(null);
              }}
              className="mt-4 w-full py-2 bg-[#6C5CE7] text-white rounded-xl text-xs font-bold"
            >
              Sync Telemetry Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
