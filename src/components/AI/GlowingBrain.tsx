import React from 'react';

export const GlowingBrain: React.FC<{ className?: string }> = ({ className = 'w-full h-48' }) => {
  return (
    <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0c1222] via-[#101b38] to-[#1e1b4b] flex items-center justify-center border border-indigo-900/50 shadow-inner ${className}`}>
      {/* Background Neural EEG waves */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <svg viewBox="0 0 400 120" className="w-full h-full">
          <path
            d="M0,60 Q50,60 80,40 T130,70 T170,20 T210,90 T250,50 T310,60 T400,60"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />
          <path
            d="M0,65 Q60,65 110,35 T180,85 T230,30 T280,75 T350,65 T400,65"
            fill="none"
            stroke="#818cf8"
            strokeWidth="1"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Cybernetic Pedestal Base Rings */}
      <div className="absolute bottom-2 inset-x-0 flex justify-center pointer-events-none">
        <svg viewBox="0 0 200 40" className="w-48 h-10">
          <ellipse cx="100" cy="20" rx="80" ry="12" fill="none" stroke="#6366f1" strokeWidth="1" strokeDasharray="6 3" />
          <ellipse cx="100" cy="20" rx="55" ry="8" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
          <ellipse cx="100" cy="20" rx="30" ry="4" fill="#818cf8" fillOpacity="0.3" />
        </svg>
      </div>

      {/* 3D Holographic Brain SVG */}
      <svg
        viewBox="0 0 240 180"
        className="w-44 h-36 filter drop-shadow-[0_0_20px_rgba(129,140,248,0.7)] z-10 transition-transform duration-300 hover:scale-105"
      >
        <defs>
          <radialGradient id="brainGlowCore" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="25%" stopColor="#93c5fd" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#6366f1" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#312e81" stopOpacity="0.2" />
          </radialGradient>
          <filter id="neonBlur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Brain Left Hemisphere Sulci & Gyri (Folds) */}
        <path
          d="
            M116,42
            C100,40 82,46 72,58
            C60,72 54,92 62,110
            C66,120 74,130 84,136
            C94,142 108,140 114,134
            L116,42 Z
          "
          fill="url(#brainGlowCore)"
          stroke="#38bdf8"
          strokeWidth="1.5"
          opacity="0.85"
        />

        {/* Brain Right Hemisphere Sulci & Gyri (Folds) */}
        <path
          d="
            M124,42
            C140,40 158,46 168,58
            C180,72 186,92 178,110
            C174,120 166,130 156,136
            C146,142 132,140 126,134
            L124,42 Z
          "
          fill="url(#brainGlowCore)"
          stroke="#818cf8"
          strokeWidth="1.5"
          opacity="0.85"
        />

        {/* Intricate Neural Fold Curves - Left */}
        <g stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.75">
          <path d="M80,64 C90,66 96,78 88,86 C82,92 88,102 96,104" />
          <path d="M96,54 C104,60 106,72 98,82 C94,88 102,96 112,96" />
          <path d="M70,82 C76,86 80,96 74,106 C72,112 80,120 90,120" />
          <path d="M94,116 C100,122 108,122 112,126" />
        </g>

        {/* Intricate Neural Fold Curves - Right */}
        <g stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.75">
          <path d="M160,64 C150,66 144,78 152,86 C158,92 152,102 144,104" />
          <path d="M144,54 C136,60 134,72 142,82 C146,88 138,96 128,96" />
          <path d="M170,82 C164,86 160,96 166,106 C168,112 160,120 150,120" />
          <path d="M146,116 C140,122 132,122 128,126" />
        </g>

        {/* Glowing Synapses Nodes (Firing Sparks) */}
        <circle cx="88" cy="86" r="3" fill="#ffffff" filter="url(#neonBlur)" className="animate-ping" style={{ animationDuration: '2s' }} />
        <circle cx="152" cy="86" r="3" fill="#ffffff" filter="url(#neonBlur)" className="animate-ping" style={{ animationDuration: '2.5s' }} />
        <circle cx="120" cy="50" r="2.5" fill="#38bdf8" />
        <circle cx="106" cy="100" r="2.5" fill="#a855f7" />
        <circle cx="134" cy="100" r="2.5" fill="#a855f7" />
        <circle cx="82" cy="114" r="2" fill="#38bdf8" />
        <circle cx="158" cy="114" r="2" fill="#38bdf8" />

        {/* Brain stem & glowing energy connection */}
        <path d="M116,134 L114,152 Q120,156 126,152 L124,134" fill="#4338ca" opacity="0.7" />
        <line x1="120" y1="135" x2="120" y2="154" stroke="#38bdf8" strokeWidth="2" strokeDasharray="2 2" />
      </svg>
    </div>
  );
};
