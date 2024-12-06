import React, { useEffect } from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { useDrag } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';

interface MobileRecommendationsProps {
  recommendations: Array<{
    startDate: Date;
    endDate: Date;
    vacationDays: number;
    totalDays: number;
    efficiency: number;
  }>;
  onSelect: (recommendation: any) => void;
  personId: 1 | 2;
}

export const MobileRecommendations: React.FC<MobileRecommendationsProps> = ({
  recommendations,
  onSelect,
  personId
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [announcement, setAnnouncement] = React.useState('');

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
          announceCurrentRecommendation(newIndex);
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

  const announceCurrentRecommendation = (index: number) => {
    if (!recommendations[index]) return;
    const rec = recommendations[index];
    setAnnouncement(
      `Empfehlung ${index + 1} von ${recommendations.length}: ` +
      `${format(rec.startDate, 'd. MMM', { locale: de })} bis ${format(rec.endDate, 'd. MMM yyyy', { locale: de })}. ` +
      `${rec.vacationDays} Urlaubstage für ${rec.totalDays} Tage frei. ` +
      `Effizienz ${rec.efficiency.toFixed(1)}x`
    );
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        if (currentIndex > 0) {
          setCurrentIndex(prev => {
            const newIndex = prev - 1;
            announceCurrentRecommendation(newIndex);
            return newIndex;
          });
        }
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (currentIndex < recommendations.length - 1) {
          setCurrentIndex(prev => {
            const newIndex = prev + 1;
            announceCurrentRecommendation(newIndex);
            return newIndex;
          });
        }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (recommendations[currentIndex]) {
          onSelect(recommendations[currentIndex]);
          setAnnouncement('Empfehlung ausgewählt');
        }
        break;
    }
  };

  // Announce initial recommendation
  useEffect(() => {
    if (recommendations.length > 0) {
      announceCurrentRecommendation(currentIndex);
    }
  }, []);

  // Clear announcements after they're read
  useEffect(() => {
    if (announcement) {
      const timer = setTimeout(() => setAnnouncement(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [announcement]);

  if (recommendations.length === 0) {
    return (
      <div 
        className="p-4 text-center text-gray-500"
        role="status"
        aria-live="polite"
      >
        Keine Empfehlungen verfügbar
      </div>
    );
  }

  const recommendation = recommendations[currentIndex];
  const accentColor = personId === 1 ? 'emerald' : 'cyan';

  return (
    <div 
      className="p-4"
      role="region"
      aria-label="Brückentag-Empfehlungen"
    >
      {/* Screen reader announcements */}
      <div 
        className="sr-only" 
        role="status" 
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>

      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">
          Brückentag-Empfehlungen
        </h2>
        <span 
          className="text-sm text-gray-500"
          aria-live="polite"
        >
          {currentIndex + 1} von {recommendations.length}
        </span>
      </div>

      <animated.div
        {...bind()}
        style={{ x }}
        className="touch-pan-x"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="listbox"
        aria-label="Empfehlungsliste"
      >
        <div
          className={`
            bg-white rounded-xl shadow-sm border-2 border-${accentColor}-500
            p-4 space-y-3 touch-manipulation
          `}
          onClick={() => onSelect(recommendation)}
          role="option"
          aria-selected="true"
          tabIndex={0}
        >
          {/* Dates */}
          <div className="text-center">
            <div className="text-lg font-medium text-gray-900">
              {format(recommendation.startDate, 'd. MMM', { locale: de })} - {format(recommendation.endDate, 'd. MMM yyyy', { locale: de })}
            </div>
          </div>

          {/* Stats */}
          <div 
            className="grid grid-cols-3 gap-4 py-2"
            role="list"
            aria-label="Details zur Empfehlung"
          >
            <div className="text-center" role="listitem">
              <div className="text-sm text-gray-500">Urlaubstage</div>
              <div className="text-lg font-medium text-gray-900">
                {recommendation.vacationDays}
              </div>
            </div>
            <div className="text-center" role="listitem">
              <div className="text-sm text-gray-500">Gesamttage</div>
              <div className="text-lg font-medium text-gray-900">
                {recommendation.totalDays}
              </div>
            </div>
            <div className="text-center" role="listitem">
              <div className="text-sm text-gray-500">Effizienz</div>
              <div className="text-lg font-medium text-gray-900">
                {recommendation.efficiency.toFixed(1)}x
              </div>
            </div>
          </div>

          {/* Swipe Hint */}
          <div 
            className="text-center text-sm text-gray-500 mt-2"
            aria-hidden="true"
          >
            ← Wischen zum Navigieren →
          </div>
        </div>
      </animated.div>

      {/* Navigation Dots */}
      <div 
        className="flex justify-center mt-4 space-x-2"
        role="tablist"
        aria-label="Empfehlungsnavigation"
      >
        {recommendations.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              announceCurrentRecommendation(index);
            }}
            className={`
              w-2 h-2 rounded-full transition-colors
              ${index === currentIndex 
                ? `bg-${accentColor}-500` 
                : 'bg-gray-300'
              }
            `}
            aria-label={`Gehe zu Empfehlung ${index + 1}`}
            aria-selected={index === currentIndex}
            role="tab"
            tabIndex={0}
          />
        ))}
      </div>
    </div>
  );
}; 