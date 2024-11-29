import React from 'react';

interface CalendarProps {
  selectedState: string;
  holidays: Array<{
    date: string;
    name: string;
    type: 'school' | 'public' | 'bridge';
  }>;
}

export const Calendar: React.FC<CalendarProps> = ({ selectedState, holidays }) => {
  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-4">
        Kalender für {selectedState}
      </h2>
      {/* Calendar grid will be implemented here */}
      <div className="grid grid-cols-7 gap-1">
        {/* Calendar implementation */}
      </div>
    </div>
  );
}; 