import React from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { Holiday, BridgeDay } from '../../../types/holiday';

interface MobileHolidaysViewProps {
  holidays: Holiday[];
  bridgeDays: BridgeDay[];
  onSelectBridgeDay?: (start: Date, end: Date) => void;
  personId: 1 | 2;
}

export const MobileHolidaysView: React.FC<MobileHolidaysViewProps> = ({
  holidays,
  bridgeDays,
  onSelectBridgeDay,
  personId
}) => {
  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="max-w-lg mx-auto p-4 space-y-6">
        {/* Bridge Day Recommendations */}
        {bridgeDays.length > 0 && (
          <section>
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Brückentag-Empfehlungen
            </h2>
            <div className="space-y-3">
              {bridgeDays.map((bridgeDay, index) => (
                <button
                  key={index}
                  onClick={() => onSelectBridgeDay?.(
                    bridgeDay.periodStart,
                    bridgeDay.periodEnd
                  )}
                  className="w-full p-4 bg-white rounded-lg shadow-sm border border-gray-200
                    active:bg-gray-50 transition-colors touch-manipulation"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">
                        {format(bridgeDay.periodStart, 'd. MMMM', { locale: de })}
                        {bridgeDay.periodEnd && (
                          <> - {format(bridgeDay.periodEnd, 'd. MMMM', { locale: de })}</>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {bridgeDay.name}
                      </div>
                    </div>
                    {bridgeDay.efficiency !== undefined && (
                      <div className="text-sm font-medium text-gray-900">
                        {bridgeDay.efficiency.toFixed(1)}x
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Holiday List */}
        <section>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Feiertage
          </h2>
          <div className="space-y-3">
            {holidays.map((holiday, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
              >
                <div className="font-medium text-gray-900">
                  {format(new Date(holiday.date), 'd. MMMM yyyy', { locale: de })}
                  {holiday.endDate && (
                    <> - {format(new Date(holiday.endDate), 'd. MMMM yyyy', { locale: de })}</>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  {holiday.name}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}; 