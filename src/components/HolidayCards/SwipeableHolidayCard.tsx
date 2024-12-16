import React, { useState } from 'react';
import styles from './SwipeableHolidayCard.module.css';

interface Holiday {
  name: string;
  date: string;
  type: 'public' | 'school';
  period?: string;
  isRegional?: boolean;
  details?: {
    description?: string;
    traditions?: string[];
    locations?: string[];
  };
}

interface SwipeableHolidayCardProps {
  holiday: Holiday;
}

const calculateDays = (startDate: string, endDate: string): number => {
  const start = new Date(startDate.split('.').reverse().join('-'));
  const end = new Date(endDate.split('.').reverse().join('-'));
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end days
};

export const SwipeableHolidayCard: React.FC<SwipeableHolidayCardProps> = ({
  holiday
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const renderDateSection = () => {
    if (holiday.type === 'school' && holiday.period) {
      const days = calculateDays(holiday.date, holiday.period);
      return (
        <div className={styles.dateSection}>
          <div className={styles.dateRange}>
            <span className={styles.date}>{holiday.date}</span>
            <span className={styles.dateSeparator}>-</span>
            <span className={styles.date}>{holiday.period}</span>
          </div>
          <span className={styles.duration}>({days} Tage)</span>
        </div>
      );
    }

    return (
      <div className={styles.dateSection}>
        <span className={styles.date}>{holiday.date}</span>
        {holiday.period && (
          <>
            <span className={styles.dateSeparator}>-</span>
            <span className={styles.date}>{holiday.period}</span>
          </>
        )}
      </div>
    );
  };

  return (
    <div className={`${styles.card} ${styles[holiday.type]}`}>
      <div className={styles.mainContent}>
        {renderDateSection()}
        
        <div className={styles.nameSection}>
          <h3 className={styles.name}>{holiday.name}</h3>
        </div>

        <button 
          className={`${styles.detailsButton} ${showDetails ? styles.active : ''}`}
          onClick={() => setShowDetails(!showDetails)}
          aria-label={showDetails ? "Details ausblenden" : "Details anzeigen"}
        >
          {showDetails ? '−' : '+'}
        </button>
      </div>

      {showDetails && holiday.details && (
        <div className={styles.detailsContent}>
          {holiday.details.description && (
            <p className={styles.description}>{holiday.details.description}</p>
          )}
          {holiday.details.traditions && (
            <div className={styles.traditions}>
              <h4>Traditionen</h4>
              <ul>
                {holiday.details.traditions.map((tradition, index) => (
                  <li key={index}>{tradition}</li>
                ))}
              </ul>
            </div>
          )}
          {holiday.details.locations && (
            <div className={styles.locations}>
              <h4>Besondere Orte</h4>
              <ul>
                {holiday.details.locations.map((location, index) => (
                  <li key={index}>{location}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}; 