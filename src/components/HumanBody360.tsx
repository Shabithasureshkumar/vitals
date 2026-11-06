import React from 'react';

interface HumanBody360Props {
  onHoverPoint?: (vitalId: string | null) => void;
  activeVitalId?: string | null;
  onClickPoint?: (vitalId: string) => void;
  className?: string;
}

const HumanBody360: React.FC<HumanBody360Props> = ({
  onHoverPoint,
  activeVitalId,
  onClickPoint,
  className = '',
}) => {
  // Sensor nodes matching the glowing spots on the newly replaced high-resolution 3D holographic body
  const sensorNodes = [
    { id: 'heart-rate', label: 'Heart: 72 BPM', top: '16.8%', left: '54.3%' },
    { id: 'blood-pressure', label: 'BP: 132/86', top: '20.6%', left: '36.8%' },
    { id: 'blood-oxygen', label: 'SpO2: 98%', top: '29.8%', left: '32.3%' },
    { id: 'activity', label: 'Left Knee: Mobility', top: '52.0%', left: '44.6%' },
    { id: 'activity', label: 'Right Knee: 8,420 steps', top: '54.6%', left: '58.3%' },
  ];

  return (
    <div className={`w-full h-full flex items-center justify-center select-none ${className}`}>
      <div className="relative w-full max-w-[390px] lg:max-w-[430px] flex items-center justify-center">
        {/* High-Resolution Transparent Holographic Body Visual */}
        <img
          src="/assets/human-body-360.gif"
          alt="360 degree holographic human body"
          className="w-full h-auto max-h-[470px] object-contain select-none pointer-events-none drop-shadow-[0_15px_35px_rgba(108,92,231,0.22)]"
          draggable={false}
        />

        {/* Anatomical Sensor Nodes for Navigation & Interactivity */}
        {sensorNodes.map((node, index) => {
          const isActive = activeVitalId === node.id;
          return (
            <div
              key={index}
              style={{ top: node.top, left: node.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
              onClick={(e) => {
                e.stopPropagation();
                onClickPoint?.(node.id);
              }}
              onMouseEnter={() => onHoverPoint?.(node.id)}
              onMouseLeave={() => onHoverPoint?.(null)}
            >
              {/* Subtle pulsing aura */}
              <span className={`block w-5 h-5 rounded-full bg-cyan-400/35 animate-ping absolute -inset-0.5 ${isActive ? 'scale-125' : ''}`} />
              {/* Bright sensor core */}
              <span className={`relative block w-3.5 h-3.5 rounded-full bg-white border-2 border-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)] transition-transform duration-150 ${isActive ? 'scale-125' : 'group-hover:scale-125'}`} />

              {/* Tooltip on hover */}
              <div className="absolute left-1/2 -top-7 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/95 text-white text-[10px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap pointer-events-none shadow-lg z-30">
                {node.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HumanBody360;
export { HumanBody360 };
