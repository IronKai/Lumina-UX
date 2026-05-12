interface LuminaLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function LuminaLogo({ size = 'md', showText = true }: LuminaLogoProps) {
  const dimensions = {
    sm: { icon: 24, text: 'text-base' },
    md: { icon: 32, text: 'text-lg' },
    lg: { icon: 40, text: 'text-xl' }
  };

  const iconSize = dimensions[size].icon;
  const textSize = dimensions[size].text;

  return (
    <div className="flex items-center gap-3">
      {/* Hexagonal Logo with L */}
      <svg 
        width={iconSize} 
        height={iconSize} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Hexagon with gradient */}
        <defs>
          <linearGradient id="luminaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9333EA" />
            <stop offset="50%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
          <linearGradient id="luminaGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        
        {/* Outer hexagon */}
        <path
          d="M50 5 L85 27.5 L85 72.5 L50 95 L15 72.5 L15 27.5 Z"
          fill="url(#luminaGradient)"
        />
        
        {/* Inner glow effect */}
        <path
          d="M50 15 L75 30 L75 70 L50 85 L25 70 L25 30 Z"
          fill="none"
          stroke="url(#luminaGlow)"
          strokeWidth="1.5"
          opacity="0.4"
        />
        
        {/* Stylized "L" */}
        <path
          d="M40 35 L40 70 L65 70 M40 35 L40 60 L55 45"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* Light beam accent */}
        <path
          d="M50 25 L50 35"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.8"
        />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <div className={`font-semibold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent ${textSize}`}>
            Lumina
          </div>
          <div className="text-xs text-slate-600 -mt-1">Business Operations Portal</div>
        </div>
      )}
    </div>
  );
}
