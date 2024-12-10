import React from 'react';

interface MobileEfficiencyScoreProps {
  efficiency: number;
  personId: 1 | 2;
}

export const MobileEfficiencyScore: React.FC<MobileEfficiencyScoreProps> = ({
  efficiency,
  personId
}) => {
  const accentColor = personId === 1 ? 'emerald' : 'cyan';
  
  const getEfficiencyLevel = (score: number) => {
    if (score >= 5) return { text: 'Meisterhaft', color: 'emerald', emoji: '🏆' };
    if (score >= 4) return { text: 'Sehr gut', color: 'blue', emoji: '🌟' };
    if (score >= 3) return { text: 'Gut', color: 'cyan', emoji: '👍' };
    return { text: 'Optimierbar', color: 'gray', emoji: '💡' };
  };

  const level = getEfficiencyLevel(efficiency);
  const percentage = Math.round((efficiency - 1) * 100);
  const progressPercentage = Math.min(100, (efficiency / 5) * 100);

  return (
    <div className="px-4 py-3 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Effizienz</span>
          <div 
            className={`px-2 py-1 rounded-full text-sm font-medium bg-${accentColor}-50 text-${accentColor}-600`}
            role="status"
            aria-label={`Effizienz Score: ${percentage}%`}
          >
            +{percentage}%
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500" aria-hidden="true">{level.emoji}</span>
          <span 
            className={`text-sm font-medium text-${level.color}-600`}
            role="status"
            aria-label={`Effizienz Level: ${level.text}`}
          >
            {level.text}
          </span>
        </div>
      </div>
      
      <div className="mt-2 relative">
        <div 
          className="h-2 bg-gray-100 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={progressPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div 
            className={`h-full bg-${accentColor}-500 transition-all duration-500 ease-out rounded-full`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div 
          className="absolute -top-1 left-1/2 w-0.5 h-4 bg-gray-300"
          aria-hidden="true"
        />
        <div className="mt-1 flex justify-between text-xs text-gray-400">
          <span>1x</span>
          <span>3x</span>
          <span>5x</span>
        </div>
      </div>
    </div>
  );
}; 