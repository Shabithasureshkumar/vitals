import React from 'react';
import heartImg from '../../assets/heart.png';
import bpDeviceImg from '../../assets/bp_device.png';
import oximeterImg from '../../assets/oximeter.png';
import thermometerImg from '../../assets/thermometer.png';
import scaleImg from '../../assets/scale.png';
import glucometerImg from '../../assets/glucometer.png';
import runnerImg from '../../assets/runner.png';
import sleepMoonImg from '../../assets/sleep_moon.png';

interface DeviceVisualProps {
  type: 'heart-3d' | 'bp-monitor' | 'oximeter' | 'thermometer' | 'scale' | 'glucometer' | 'runner' | 'sleep-moon';
  className?: string;
}

export const DeviceVisual: React.FC<DeviceVisualProps> = ({ type, className = 'w-16 h-16' }) => {
  const getImage = () => {
    switch (type) {
      case 'heart-3d':
        return heartImg;
      case 'bp-monitor':
        return bpDeviceImg;
      case 'oximeter':
        return oximeterImg;
      case 'thermometer':
        return thermometerImg;
      case 'scale':
        return scaleImg;
      case 'glucometer':
        return glucometerImg;
      case 'runner':
        return runnerImg;
      case 'sleep-moon':
        return sleepMoonImg;
      default:
        return heartImg;
    }
  };

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <img
        src={getImage()}
        alt={type}
        className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-200 hover:scale-105 select-none"
        draggable={false}
      />
    </div>
  );
};
