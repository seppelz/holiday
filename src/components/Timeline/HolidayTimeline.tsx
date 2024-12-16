import React, { useRef, useEffect, useState } from 'react';
import styles from './HolidayTimeline.module.css';

interface Holiday {
  name: string;
  date?: string;
  start?: string;
  end?: string;
  type: 'public' | 'school';
  period?: string;
  isRegional?: boolean;
}

interface HolidayTimelineProps {
  holidays: Holiday[];
  onHolidayClick?: (holiday: Holiday) => void;
}

export const HolidayTimeline: React.FC<HolidayTimelineProps> = ({
  holidays,
  onHolidayClick
}) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Sort all holidays by date, handling both single dates and date ranges
  const sortedHolidays = [...holidays].sort((a, b) => {
    const dateA = new Date(a.date ? a.date.split('.').reverse().join('-') : a.start!);
    const dateB = new Date(b.date ? b.date.split('.').reverse().join('-') : b.start!);
    return dateA.getTime() - dateB.getTime();
  });

  // Calculate timeline positions
  const startDate = new Date('2024-01-01');
  const endDate = new Date('2026-12-31');
  const timelineWidth = 2000; // Fixed width for the timeline

  const getHolidayPosition = (holiday: Holiday) => {
    const date = holiday.date 
      ? new Date(holiday.date.split('.').reverse().join('-'))
      : new Date(holiday.start!);
    const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    const daysPassed = (date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    return (daysPassed / totalDays) * timelineWidth;
  };

  // Handle mouse/touch events for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (timelineRef.current?.offsetLeft || 0));
    setScrollLeft(timelineRef.current?.scrollLeft || 0);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (timelineRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (timelineRef.current) {
      timelineRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  // Handle touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (timelineRef.current?.offsetLeft || 0));
    setScrollLeft(timelineRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - (timelineRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (timelineRef.current) {
      timelineRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  // Scroll to current date on mount
  useEffect(() => {
    const scrollToCurrentDate = () => {
      const today = new Date();
      const position = getHolidayPosition({
        name: 'current',
        date: `${today.getDate().toString().padStart(2, '0')}.${(today.getMonth() + 1)
          .toString()
          .padStart(2, '0')}.${today.getFullYear()}`,
        type: 'public'
      });
      if (timelineRef.current) {
        timelineRef.current.scrollLeft = position - timelineRef.current.clientWidth / 2;
      }
    };

    scrollToCurrentDate();
  }, []);

  return (
    <div className={styles.timelineContainer}>
      <div 
        ref={timelineRef}
        className={styles.timeline}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleMouseUp}
        onTouchMove={handleTouchMove}
      >
        <div 
          className={styles.timelineTrack}
          style={{ width: `${timelineWidth}px` }}
        >
          {sortedHolidays.map((holiday, index) => (
            <div
              key={`${holiday.name}-${index}`}
              className={`${styles.holidayMarker} ${styles[holiday.type]} ${
                holiday.isRegional ? styles.regional : ''
              }`}
              onClick={() => onHolidayClick?.(holiday)}
              style={{
                left: `${getHolidayPosition(holiday)}px`,
                position: 'absolute'
              }}
            >
              <div className={styles.holidayContent}>
                <span className={styles.holidayDate}>
                  {holiday.date || `${holiday.start} - ${holiday.end}`}
                </span>
                <span className={styles.holidayName}>{holiday.name}</span>
                {holiday.period && (
                  <span className={styles.holidayPeriod}>- {holiday.period}</span>
                )}
                {holiday.isRegional && (
                  <span className={styles.regionalBadge}>Regional</span>
                )}
              </div>
            </div>
          ))}
          <div 
            className={styles.currentDate}
            style={{
              left: `${getHolidayPosition({
                name: 'current',
                date: new Date().toLocaleDateString('de-DE', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                }),
                type: 'public'
              })}px`
            }}
          />
        </div>
      </div>
    </div>
  );
}; 