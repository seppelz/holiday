import React, { useEffect, useRef } from 'react';
import styles from './CulturalContext.module.css';

interface Tradition {
  season: string;
  description: string;
}

interface CulturalContextProps {
  stateName: string;
  uniqueHolidayInfo: string;
  traditionInfo: string;
  seasonalTraditions: Tradition[];
}

export const CulturalContext: React.FC<CulturalContextProps> = ({
  stateName,
  uniqueHolidayInfo,
  traditionInfo,
  seasonalTraditions,
}) => {
  const factBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const factBox = factBoxRef.current;
      if (factBox) {
        const rect = factBox.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        factBox.style.setProperty('--mouse-x', `${x}%`);
        factBox.style.setProperty('--mouse-y', `${y}%`);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={styles.culturalContext}>
      <div className={styles.didYouKnow}>
        <div className={styles.factBox} ref={factBoxRef}>
          <div className={styles.factIcon}>💡</div>
          <h3>Wussten Sie schon?</h3>
          <p>{uniqueHolidayInfo}</p>
        </div>
      </div>

      <div className={styles.traditions}>
        <h3>Traditionen in {stateName}</h3>
        <div className={styles.traditionContent}>
          <p>{traditionInfo}</p>
        </div>
      </div>

      <div className={styles.seasonalTraditions}>
        <h3>Traditionen im Jahresverlauf</h3>
        <div className={styles.seasonGrid}>
          {seasonalTraditions.map((tradition, index) => (
            <div 
              key={index} 
              className={`${styles.seasonCard} ${styles[tradition.season.toLowerCase()]}`}
            >
              <div className={styles.seasonIcon}>
                {tradition.season === 'Frühjahr' && '🌸'}
                {tradition.season === 'Sommer' && '☀️'}
                {tradition.season === 'Herbst' && '🍂'}
                {tradition.season === 'Winter' && '❄️'}
              </div>
              <h4>{tradition.season}</h4>
              <p>{tradition.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.culturalNote}>
        <div className={styles.noteIcon}>📜</div>
        <div className={styles.noteContent}>
          <h4>Kulturelle Bedeutung</h4>
          <p>
            Die Feiertage und Traditionen in {stateName} spiegeln die reiche kulturelle 
            Geschichte und regionale Identität wider. Sie verbinden religiöse Bräuche 
            mit lokalen Traditionen und schaffen einzigartige kulturelle Erlebnisse 
            über das ganze Jahr.
          </p>
        </div>
      </div>
    </div>
  );
}; 