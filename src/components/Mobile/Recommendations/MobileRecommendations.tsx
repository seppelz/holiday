import React from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

interface Recommendation {
  startDate: Date;
  endDate: Date;
  efficiency: number;
  vacationDays: number;
  totalDays: number;
}

interface MobileRecommendationsProps {
  recommendations: Recommendation[];
  onSelect: (recommendation: Recommendation) => void;
  personId: 1 | 2;
}

export const MobileRecommendations: React.FC<MobileRecommendationsProps> = ({
  recommendations,
  onSelect,
  personId
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Animation for card swiping
  const [{ x }, api] = useSpring(() => ({ x: 0 }));

  // Handle card swipe
  const bind = useDrag(
    ({ movement: [mx], last, cancel, direction: [xDir] }) => {
      if (last) {
        if (Math.abs(mx) > 100) {
          const newIndex = xDir > 0 
            ? Math.max(0, currentIndex - 1)
            : Math.min(recommendations.length - 1, currentIndex + 1);
          setCurrentIndex(newIndex);
          if (navigator.vibrate) {
            navigator.vibrate(10);
          }
        }
        api.start({ x: 0 });
      } else {
        api.start({ x: mx, immediate: true });
      }
    },
    { axis: 'x', bounds: { left: -200, right: 200 } }
  );

  if (recommendations.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        Keine Empfehlungen verfügbar
      </div>
    );
  }

  const recommendation = recommendations[currentIndex];
  const accentColor = personId === 1 ? 'emerald' : 'cyan';

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">
          Brückentag-Empfehlungen
        </h2>
        <span className="text-sm text-gray-500">
          {currentIndex + 1} von {recommendations.length}
        </span>
      </div>

      <animated.div
        {...bind()}
        style={{ x }}
        className="touch-pan-x"
      >
        <div
          className={`
            bg-white rounded-xl shadow-sm border-2 border-${accentColor}-500
            p-4 space-y-3 touch-manipulation
          `}
          onClick={() => onSelect(recommendation)}
        >
          {/* Dates */}
          <div className="text-center">
            <div className="text-lg font-medium text-gray-900">
              {format(recommendation.startDate, 'd. MMM', { locale: de })} - {format(recommendation.endDate, 'd. MMM yyyy', { locale: de })}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 py-2">
            <div className="text-center">
              <div className="text-sm text-gray-500">Urlaubstage</div>
              <div className="text-lg font-medium text-gray-900">
                {recommendation.vacationDays}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Gesamttage</div>
              <div className="text-lg font-medium text-gray-900">
                {recommendation.totalDays}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Effizienz</div>
              <div className="text-lg font-medium text-gray-900">
                {recommendation.efficiency.toFixed(1)}x
              </div>
            </div>
          </div>

          {/* Swipe Hint */}
          <div className="text-center text-sm text-gray-500 mt-2">
            ← Wischen zum Navigieren →
          </div>
        </div>
      </animated.div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {recommendations.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`
              w-2 h-2 rounded-full transition-colors
              ${index === currentIndex 
                ? `bg-${accentColor}-500` 
                : 'bg-gray-300'
              }
            `}
            aria-label={`Gehe zu Empfehlung ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}; 