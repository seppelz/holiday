import React from 'react';
import { GermanState, stateNames } from '../../../types/GermanState';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

interface MobileStateSelectorProps {
  selectedState: GermanState;
  onChange: (state: GermanState) => void;
}

export const MobileStateSelector: React.FC<MobileStateSelectorProps> = ({
  selectedState,
  onChange
}) => {
  const states = Object.values(GermanState);
  const currentIndex = states.indexOf(selectedState);
  
  // Animation for swipe
  const [{ x }, api] = useSpring(() => ({ x: 0 }));

  // Handle swipe
  const bind = useDrag(
    ({ movement: [mx], last, cancel, direction: [xDir] }) => {
      if (last) {
        if (Math.abs(mx) > 50) {
          const newIndex = Math.min(
            Math.max(0, currentIndex + (xDir > 0 ? -1 : 1)),
            states.length - 1
          );
          onChange(states[newIndex]);
          if (navigator.vibrate) {
            navigator.vibrate(10);
          }
        }
        api.start({ x: 0 });
      } else {
        api.start({ x: mx, immediate: true });
      }
    },
    { axis: 'x', bounds: { left: -100, right: 100 } }
  );

  return (
    <div className="bg-white border-b">
      <div className="px-4 py-3">
        <div className="text-sm font-medium text-gray-500 mb-2">Bundesland</div>
        <animated.div
          {...bind()}
          style={{ x }}
          className="touch-pan-x"
        >
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                const newIndex = Math.max(0, currentIndex - 1);
                onChange(states[newIndex]);
              }}
              disabled={currentIndex === 0}
              className="p-2 -ml-2 text-gray-400 disabled:opacity-30 touch-manipulation"
              aria-label="Vorheriges Bundesland"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex-1 text-center">
              <div className="text-lg font-medium text-gray-900">
                {stateNames[selectedState]}
              </div>
              <div className="text-sm text-gray-500">
                {selectedState}
              </div>
            </div>

            <button
              onClick={() => {
                const newIndex = Math.min(states.length - 1, currentIndex + 1);
                onChange(states[newIndex]);
              }}
              disabled={currentIndex === states.length - 1}
              className="p-2 -mr-2 text-gray-400 disabled:opacity-30 touch-manipulation"
              aria-label="Nächstes Bundesland"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </animated.div>
      </div>

      {/* Quick Jump Slider */}
      <div className="px-4 pb-3 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 min-w-max">
          {states.map((state) => (
            <button
              key={state}
              onClick={() => onChange(state)}
              className={`
                px-3 py-1 rounded-full text-sm font-medium touch-manipulation
                ${state === selectedState
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-500 active:bg-gray-100'
                }
              `}
            >
              {state}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}; 