import React, { useState, useRef } from 'react';
import bodyImg from '../../assets/body.png';
import { RotateCcw, Play, Pause, Compass, Sparkles } from 'lucide-react';

interface HolographicBodyProps {
  onHoverPoint?: (vitalId: string | null) => void;
  activeVitalId?: string | null;
  onClickPoint?: (vitalId: string) => void;
}

export const HolographicBody: React.FC<HolographicBodyProps> = ({
  onHoverPoint,
  activeVitalId,
  onClickPoint,
}) => {
  // Default to 3D Turntable Scan so the body always displays full 3D depth and nodes
  const [rotationMode, setRotationMode] = useState<'spin360' | 'oscillate' | 'manual'>('oscillate');
  const [isRotating, setIsRotating] = useState(true);
  const [manualRotationY, setManualRotationY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const currentRotationRef = useRef(0);

  // Sensor nodes matching the glowing spots on the 3D human body
  const sensorNodes = [
    { id: 'heart-rate', label: 'Heart: 72 BPM', top: '19.5%', left: '57.6%' },
    { id: 'blood-pressure', label: 'BP: 132/86', top: '25.5%', left: '42.3%' },
    { id: 'blood-oxygen', label: 'SpO2: 98%', top: '33.0%', left: '39.8%' },
    { id: 'activity', label: 'Left Knee: Mobility', top: '56.2%', left: '49.2%' },
    { id: 'activity', label: 'Right Knee: 8,420 steps', top: '58.4%', left: '60.6%' },
  ];

  // Mouse / Touch Drag to manually rotate 3D body
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    currentRotationRef.current = manualRotationY;
    setRotationMode('manual');
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startXRef.current;
    setManualRotationY(currentRotationRef.current + deltaX * 0.6);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const toggleRotateMode = () => {
    if (rotationMode === 'spin360') {
      setRotationMode('oscillate');
      setIsRotating(true);
    } else if (rotationMode === 'oscillate') {
      setRotationMode('spin360');
      setIsRotating(true);
    } else {
      setRotationMode('oscillate');
      setIsRotating(true);
      setManualRotationY(0);
    }
  };

  const getRotationClass = () => {
    if (!isRotating || rotationMode === 'manual') return '';
    return rotationMode === 'spin360' ? 'holo-rotate-360' : 'holo-rotate-oscillate';
  };

  return (
    <div 
      className="relative w-full h-full min-h-[440px] lg:min-h-[500px] flex flex-col items-center justify-center select-none overflow-visible py-1"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Top Floating Futuristic Turntable Control Badge */}
      <div className="absolute top-0 z-30 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-purple-200/70 shadow-xs text-[11px] font-bold text-slate-700">
        <button
          onClick={toggleRotateMode}
          className="flex items-center gap-1.5 hover:text-[#6C5CE7] transition-colors cursor-pointer group"
          title="Click to toggle between 3D Scan and 360° Spin"
        >
          <Compass className="w-3.5 h-3.5 text-[#6C5CE7] animate-spin" style={{ animationDuration: rotationMode === 'spin360' ? '4s' : '8s' }} />
          <span className="font-semibold text-slate-800 group-hover:text-[#6C5CE7]">
            {rotationMode === 'spin360' ? '360° Spin' : rotationMode === 'oscillate' ? '3D Turntable Scan' : 'Manual View'}
          </span>
        </button>

        <span className="w-1 h-1 rounded-full bg-slate-300" />

        <button
          onClick={() => {
            setIsRotating(!isRotating);
            if (!isRotating && rotationMode === 'manual') setRotationMode('oscillate');
          }}
          className="p-1 hover:text-[#6C5CE7] transition-colors cursor-pointer"
          title={isRotating ? 'Pause rotation' : 'Resume rotation'}
        >
          {isRotating ? <Pause className="w-3 h-3 text-slate-500 hover:text-slate-800" /> : <Play className="w-3 h-3 text-emerald-600" />}
        </button>

        {rotationMode === 'manual' && (
          <button
            onClick={() => {
              setRotationMode('oscillate');
              setIsRotating(true);
              setManualRotationY(0);
            }}
            className="p-1 hover:text-[#6C5CE7] transition-colors cursor-pointer"
            title="Reset to 3D auto rotation"
          >
            <RotateCcw className="w-3 h-3 text-purple-600" />
          </button>
        )}
      </div>

      {/* Main 3D Stage Container with 1200px perspective */}
      <div className="relative h-full max-h-[480px] w-full flex items-center justify-center [perspective:1200px]">
        {/* Background Ambient Holographic Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-cyan-400/15 via-indigo-500/10 to-violet-500/15 blur-3xl animate-pulse" />
        </div>

        {/* 3D Cybernetic Orbital Scanning Rings (Chest and Waist level) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none [transform-style:preserve-3d]">
          {/* Upper Orbit Ring */}
          <div className="absolute w-52 h-52 rounded-full border border-dashed border-cyan-400/35 holo-orbit-ring pointer-events-none">
            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
          </div>
          {/* Lower Counter-Orbit Ring */}
          <div className="absolute w-60 h-60 rounded-full border border-dotted border-violet-400/30 holo-orbit-ring-rev pointer-events-none">
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_8px_#a78bfa]" />
          </div>
        </div>

        {/* Unified 3D Holographic Human Body & Pedestal Layer */}
        <div
          onMouseDown={handleMouseDown}
          style={rotationMode === 'manual' ? { transform: `perspective(1200px) rotateY(${manualRotationY}deg)` } : undefined}
          className={`relative h-[92%] max-h-[450px] w-auto flex items-center justify-center cursor-grab active:cursor-grabbing ${getRotationClass()}`}
        >
          {/* Laser Holographic Scanning Beam */}
          <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent laser-scan-line pointer-events-none z-20 opacity-80 shadow-[0_0_12px_rgba(34,211,238,1)]">
            <div className="absolute -inset-x-4 -inset-y-1 bg-cyan-400/25 blur-xs" />
          </div>

          {/* Unified Holographic Body & Pedestal Image */}
          <img
            src={bodyImg}
            alt="3D Holographic Human Body Simulation"
            className="h-full w-auto object-contain holo-body-sheen select-none pointer-events-none drop-shadow-[0_15px_35px_rgba(108,92,231,0.25)]"
            draggable={false}
          />

          {/* Holographic Interactive Sensor Nodes (Aligned directly on the glowing body spots) */}
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
                {/* Outer glowing pulsing aura */}
                <span className={`block w-5 h-5 rounded-full bg-cyan-400/35 animate-ping absolute -inset-0.5 ${isActive ? 'scale-125' : ''}`} />
                {/* Bright core sensor node */}
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

      {/* Subtle Hint text for interaction */}
      <span className="text-[10px] text-slate-400 font-semibold mt-1 flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity cursor-default">
        <Sparkles className="w-3 h-3 text-[#6C5CE7]" />
        <span>3D Telemetry Active &bull; Drag to rotate or click sensors to inspect</span>
      </span>
    </div>
  );
};
