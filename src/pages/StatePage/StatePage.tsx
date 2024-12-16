import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { stateData, getStateInfo } from '../../config/index';
import { GERMAN_STATES } from '../../components/Navigation/Navbar';
import { Helmet } from 'react-helmet-async';
import { FaSun, FaLeaf, FaSnowflake, FaUmbrella, FaCalendarAlt, FaGraduationCap, FaArrowRight } from 'react-icons/fa';
import { FaMonument, FaMountain, FaCity, FaLandmark, FaTree, FaWater, FaLocationDot, FaPersonHiking, FaBuilding, FaUsers, FaRulerCombined, FaIndustry, FaEuroSign, FaBriefcase, FaWallet, FaCrown, FaChurch, FaMusic, FaGift, FaUtensils, FaWineGlass, FaMask, FaMasksTheater, FaMugHot } from 'react-icons/fa6';
import styles from './StatePage.module.css';
import { StatePageHoliday, StateInfo, HolidayDetails } from './types';
import { parseDateString } from '../../utils/dateUtils';

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

const calculateDuration = (start: string, end: string): number => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end days
};

const getUnsplashId = (destinationName: string): string => {
  const lowerName = destinationName.toLowerCase();
  const imageMap: { [key: string]: string } = {
    'Alpen': 'u0ZgqJD55pE',
    'Schwarzwald': 'szFUQoyvrxM',
    'Harz': 'nqZzKcwqS3E',
    'Bayerischer Wald': 'y2azHvupCVo',
    'Eifel': 'JgOeRuGD_Y4',
    'Berlin': 'K_VwS0jEjvs',
    'München': 'V5asA4gCgJA',
    'Hamburg': 'pRQWJhKZ5sc',
    'Dresden': 'vYAHgbPRpEk',
    'Heidelberg': 'e9zJh_4vVOY',
    'Ostsee': 'AX9sJ-mShw8',
    'Nordsee': 'N3t6qwV5sL8',
    'Sylt': 'YQB-QbEDSII',
    'Rügen': 'K7oqWgDJQ6E',
    'Bodensee': 'cQKKw6S3Gqc',
    'Chiemsee': 'Y7Y6J3VaVTU',
    'Rhein': 'UqP7U400AZs',
    'Mosel': 'x9yfTxHpj5U',
    'Rothenburg': 'photo-1467269204594-9661b134dd2b',
    'Wartburg': 'nKcx6jbFE-A',
    'Schloss Neuschwanstein': 'photo-1515018947777-9a6355139e68',
    'Berchtesgadener Land': 'photo-1516815231560-8f41ec531527',
    'default_city': 'q8kR_ie6WnI',
    'default_nature': 'y2azHvupCVo',
    'default_historic': 'V93Qb7EgEtA',
    'default_coastal': 'N3t6qwV5sL8'
  };

  if (imageMap[destinationName]) {
    return imageMap[destinationName];
  }

  if (lowerName.includes('stadt') || lowerName.includes('city')) {
    return imageMap.default_city;
  }
  if (lowerName.includes('wald') || lowerName.includes('berg') || lowerName.includes('park')) {
    return imageMap.default_nature;
  }
  if (lowerName.includes('schloss') || lowerName.includes('burg') || lowerName.includes('kirche')) {
    return imageMap.default_historic;
  }
  if (lowerName.includes('see') || lowerName.includes('meer') || lowerName.includes('strand')) {
    return imageMap.default_coastal;
  }

  return imageMap.default_nature;
};

const getSeasonIcon = (season: string) => {
  switch (season.toLowerCase()) {
    case 'frühling':
    case 'frühjahr':
      return <FaLeaf className={styles.seasonIcon} />;
    case 'sommer':
      return <FaSun className={styles.seasonIcon} />;
    case 'herbst':
      return <FaUmbrella className={styles.seasonIcon} />;
    case 'winter':
      return <FaSnowflake className={styles.seasonIcon} />;
    default:
      return null;
  }
};

const getDestinationImage = (destinationName: string): string => {
  const imageMap: { [key: string]: string } = {
    'Schloss Neuschwanstein': '/images/destinations/neuschwanstein.jpg',
    'Berchtesgadener Land': '/images/destinations/berchtesgaden.jpg',
    'Rothenburg ob der Tauber': '/images/destinations/rothenburg.jpg'
  };

  return imageMap[destinationName] || '/images/destinations/default.jpg';
};

const getDestinationIcon = (destinationName: string) => {
  const name = destinationName.toLowerCase();
  if (name.includes('schloss') || name.includes('burg')) return <FaMonument className={styles.destinationIcon} />;
  if (name.includes('berg') || name.includes('alpen')) return <FaMountain className={styles.destinationIcon} />;
  if (name.includes('stadt') || name.includes('city')) return <FaCity className={styles.destinationIcon} />;
  if (name.includes('wald')) return <FaTree className={styles.destinationIcon} />;
  if (name.includes('see') || name.includes('meer')) return <FaWater className={styles.destinationIcon} />;
  return <FaLandmark className={styles.destinationIcon} />;
};

const getRegionalIcon = (iconName: string, className = 'regionalIcon') => {
  const icons: { [key: string]: JSX.Element } = {
    'crown': <FaCrown className={styles[className] || ''} />,
    'church': <FaChurch className={styles[className] || ''} />,
    'music': <FaMusic className={styles[className] || ''} />,
    'gift': <FaGift className={styles[className] || ''} />,
    'food': <FaUtensils className={styles[className] || ''} />,
    'wine': <FaWineGlass className={styles[className] || ''} />,
    'mask': <FaMask className={styles[className] || ''} />,
    'theater': <FaMasksTheater className={styles[className] || ''} />,
    'monument': <FaMonument className={styles[className] || ''} />,
    'mountain': <FaMountain className={styles[className] || ''} />,
    'city': <FaCity className={styles[className] || ''} />,
    'landmark': <FaLandmark className={styles[className] || ''} />,
    'beer': <FaMugHot className={styles[className] || ''} />,
  };
  return icons[iconName] || <FaLandmark className={styles[className] || ''} />;
};

const StatePage: React.FC = () => {
  const { stateId } = useParams<{ stateId: string }>();
  const [selectedHoliday, setSelectedHoliday] = useState<StatePageHoliday | null>(null);
  
  if (!stateId) {
    return (
      <div className={styles.errorPage}>
        <h1>Bundesland nicht gefunden</h1>
        <p>Das gesuchte Bundesland konnte leider nicht gefunden werden.</p>
        <Link to="/" className={styles.primaryButton}>Zur Startseite</Link>
      </div>
    );
  }

  const stateInfo = getStateInfo(stateId);
  const stateColors = GERMAN_STATES.find(s => s.slug === stateId)?.colors || ['#4299e1', '#2b6cb0'];
  const sectionsRef = useRef<HTMLElement[]>([]);

  if (!stateInfo) {
    return (
      <div className={styles.errorPage}>
        <h1>Bundesland nicht gefunden</h1>
        <p>Das gesuchte Bundesland konnte leider nicht gefunden werden.</p>
        <Link to="/" className={styles.primaryButton}>Zur Startseite</Link>
      </div>
    );
  }

  const getHolidayDetails = (holidayName: string) => {
    const stateObject = stateData[stateId];
    if (stateObject && 'stateSpecificHolidayDetails' in stateObject) {
      return (stateObject as any).stateSpecificHolidayDetails[holidayName];
    }
    return null;
  };

  const allHolidays = stateInfo?.holidays || [] as StatePageHoliday[];
  const publicHolidays = allHolidays.filter(h => {
    if (h.type !== 'public') return false;
    if (h.isRegional) return false;
    const holidayDate = h.date || h.start;
    return holidayDate?.startsWith('2025');
  }).map(holiday => ({
    ...holiday,
    details: getHolidayDetails(holiday.name) || holiday.details
  }));

  const regionalHolidays = allHolidays.filter(h => {
    if (h.type !== 'public') return false;
    if (!h.isRegional) return false;
    const holidayDate = h.date || h.start;
    return holidayDate?.startsWith('2025');
  }).map(holiday => ({
    ...holiday,
    details: getHolidayDetails(holiday.name) || holiday.details
  }));

  const schoolHolidays = (stateInfo?.schoolHolidays || []) as StatePageHoliday[];
  const filteredSchoolHolidays = schoolHolidays.filter(h => {
    return h.start && h.start.startsWith('2025');
  }).map(holiday => ({
    ...holiday,
    details: getHolidayDetails(holiday.name) || holiday.details
  }));

  const totalSchoolHolidayDays = filteredSchoolHolidays.reduce((total, holiday) => {
    if (holiday.start && holiday.end) {
      return total + calculateDuration(holiday.start, holiday.end);
    }
    return total;
  }, 0);

  useEffect(() => {
    if (stateColors) {
      const isWhiteColor = (color: string) => {
        return color.toLowerCase() === '#ffffff' || color.toLowerCase() === '#fff';
      };

      document.documentElement.style.setProperty('--state-primary-color', stateColors[0]);
      document.documentElement.style.setProperty('--state-secondary-color', stateColors[1]);

      document.documentElement.style.setProperty(
        '--header-text-color',
        isWhiteColor(stateColors[0]) && isWhiteColor(stateColors[1]) ? '#1a365d' : 'white'
      );

      document.documentElement.style.setProperty(
        '--primary-button-color',
        isWhiteColor(stateColors[0]) ? '#1a365d' : stateColors[0]
      );
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    const handleMouseMove = (e: MouseEvent) => {
      const holidayContentClass = styles.holidayContent;
      if (!holidayContentClass) return;

      const cards = document.querySelectorAll(`.${holidayContentClass}`);
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}%`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}%`);
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
      document.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.style.setProperty('--state-primary-color', '#4299e1');
      document.documentElement.style.setProperty('--state-secondary-color', '#2b6cb0');
      document.documentElement.style.setProperty('--header-text-color', 'white');
      document.documentElement.style.setProperty('--primary-button-color', '#4299e1');
    };
  }, [stateId, stateColors]);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const formatDate = (date: string): string => {
    const parsedDate = parseDateString(date);
    return parsedDate.toLocaleDateString('de-DE', { 
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const toggleHolidayDetails = (holiday: StatePageHoliday) => {
    setSelectedHoliday(selectedHoliday?.name === holiday.name ? null : holiday);
  };

  const formatHolidayDate = (holiday: StatePageHoliday) => {
    if (holiday.date) {
      return formatDate(holiday.date);
    }
    if (holiday.start && holiday.end) {
      return (
        <>
          {formatDate(holiday.start)}
          <span className={styles.dateSeparator}>-</span>
          {formatDate(holiday.end)}
        </>
      );
    }
    return holiday.start ? formatDate(holiday.start) : '';
  };

  const renderKeyFacts = (stateInfo: StateInfo) => {
    const { keyFacts } = stateInfo;
    return (
      <>
        <div className={styles.microInfoItem}>
          <FaUsers className={styles.microInfoIcon} />
          <span className={styles.microInfoLabel}>Einwohner:</span>
          <span className={styles.microInfoValue}>{keyFacts.population.toLocaleString()}</span>
        </div>
        <div className={styles.microInfoItem}>
          <FaRulerCombined className={styles.microInfoIcon} />
          <span className={styles.microInfoLabel}>Fläche:</span>
          <span className={styles.microInfoValue}>{keyFacts.area.toLocaleString()} km²</span>
        </div>
        {keyFacts.gdp && (
          <div className={styles.microInfoItem}>
            <FaEuroSign className={styles.microInfoIcon} />
            <span className={styles.microInfoLabel}>BIP p.K.:</span>
            <span className={styles.microInfoValue}>{keyFacts.gdp.toLocaleString()} €</span>
          </div>
        )}
      </>
    );
  };

  const renderHolidayDetails = (holiday: StatePageHoliday) => {
    if (!holiday.details) {
      return null;
    }

    return (
      <div className={styles.holidayDetails}>
        {holiday.details.description && (
          <p className={styles.description}>{holiday.details.description}</p>
        )}
        {holiday.type === 'school' && holiday.details.familyActivities && holiday.details.familyActivities.length > 0 && (
          <div className={styles.familyActivities}>
            <h4>Familienaktivitäten</h4>
            <ul>
              {holiday.details.familyActivities.map((activity, i) => (
                <li key={i}>{activity}</li>
              ))}
            </ul>
          </div>
        )}
        {holiday.type === 'public' && (
          <>
            {holiday.details.traditions && holiday.details.traditions.length > 0 && (
              <div className={styles.traditions}>
                <h4>Traditionen</h4>
                <ul>
                  {holiday.details.traditions.map((tradition, i) => (
                    <li key={i}>{tradition}</li>
                  ))}
                </ul>
              </div>
            )}
            {holiday.details.locations && holiday.details.locations.length > 0 && (
              <div className={styles.locations}>
                <h4>Beliebte Orte</h4>
                <ul>
                  {holiday.details.locations.map((location, i) => (
                    <li key={i}>{location}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <div className={styles.statePage}>
      <Helmet>
        <title>{`Feiertage und Schulferien ${stateInfo.fullName} 2025 - Übersicht & regionale Besonderheiten`}</title>
        <meta name="description" content={`Alle Feiertage und Schulferien in ${stateInfo.fullName} für 2025. Entdecken Sie regionale Besonderheiten, Bräuche und Ferienzeiten.`} />
        <meta property="og:title" content={`Feiertage und Schulferien ${stateInfo.fullName} 2025`} />
        <meta property="og:description" content={`Komplette Übersicht der Feiertage und Schulferien in ${stateInfo.fullName} mit regionalen Traditionen und Bräuchen.`} />
      </Helmet>

      <header className={styles.stateHeader}>
        <div className={styles.animatedBackground}>
          <div className={styles.celestialBody} />
          
          <div className={styles.cloud} />
          <div className={styles.cloud} />
          <div className={styles.cloud} />
          <div className={styles.cloud} />
          
          <div className={styles.seasonalDecorations}>
            <div className={styles.springDandelion}>
              <div className={styles.dandelionStem}></div>
              <div className={styles.dandelionHead}>
                <div className={styles.dandelionCore}></div>
                {[...Array(24)].map((_, i) => (
                  <div key={i} className={styles.seed}>
                    <div className={styles.seedCore}></div>
                    <div className={styles.seedParachute}></div>
                  </div>
                ))}
              </div>
              {[...Array(6)].map((_, i) => (
                <div key={`flying-${i}`} className={styles.flyingSeed}>
                  <div className={styles.seedCore}></div>
                  <div className={styles.seedParachute}></div>
                </div>
              ))}
            </div>

            <div className={styles.sunflower}>
              <div className={styles.sunflowerStem}></div>
              <div className={styles.sunflowerHead}>
                {[...Array(12)].map((_, i) => (
                  <div key={i} className={styles.sunflowerPetal}></div>
                ))}
                <div className={styles.sunflowerCenter}></div>
              </div>
            </div>

            <div className={styles.mapleLeaf}>
              <div className={styles.mapleTreeTrunk} />
              <div className={styles.mapleTreeBranch} />
              <div className={styles.mapleTreeBranch} />
              <div className={styles.mapleTreeBranch} />
              <div className={styles.mapleTreeBranch} />
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className={styles.fallingLeaf}
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 30}%`,
                    '--x-end': `${-50 + Math.random() * 100}px`,
                    '--y-end': `${100 + Math.random() * 50}px`,
                    '--fall-delay': `${i * 0.5}s`
                  } as React.CSSProperties}
                />
              ))}
            </div>

            <div className={styles.snowflake}>
              <div className={styles.mountainScene}>
                <div className={styles.mountain}></div>
                <div className={styles.mountain}></div>
                <div className={styles.mountain}></div>
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className={styles.snow}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      '--x-end': `${Math.random() * 60 - 30}px`,
                      '--y-end': `${Math.random() * 60 + 30}px`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${2 + Math.random() * 2}s`
                    } as React.CSSProperties}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.headerOverlay} />
          <div className={styles.headerContent}>
            <div className={styles.heroStats}>
              <div className={styles.statBadge}>
                <span className={styles.statNumber}>{publicHolidays.length}</span>
                <span className={styles.statLabel}>Feiertage</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.statBadge}>
                <span className={styles.statNumber}>{regionalHolidays.length}</span>
                <span className={styles.statLabel}>Regionale Feiertage</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.statBadge}>
                <span className={styles.statNumber}>{totalSchoolHolidayDays}</span>
                <span className={styles.statLabel}>Ferientage</span>
              </div>
            </div>
            <h1 className={styles.heroTitle}>Feiertage und Schulferien in {stateInfo.fullName} 2025</h1>
            <p className={styles.heroSubtitle}>
              Maximieren Sie Ihren Urlaub in {stateInfo.fullName} mit unserem intelligenten Urlaubsplaner.
              Nutzen Sie {publicHolidays.length + regionalHolidays.length} Feiertage für optimale Brückentage.
            </p>
            <div className={styles.heroActions}>
              <Link to="/app" className={styles.primaryButton}>
                Urlaubsplaner starten
                <span className={styles.buttonIcon}>→</span>
              </Link>
              <button 
                className={styles.secondaryButton} 
                onClick={() => document.querySelector('#overview')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Feiertage erkunden
                <span className={styles.buttonIcon}>↓</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <section id="overview" className={styles.holidayOverview}>
        <div className={styles.holidayGrid}>
          <div className={styles.holidayColumn}>
            <div className={styles.columnHeader}>
              <FaCalendarAlt className={styles.headerIcon} />
              <div>
                <h2>Gesetzliche Feiertage</h2>
                <p>{publicHolidays.length + regionalHolidays.length} Feiertage in 2025</p>
              </div>
            </div>
            <div className={styles.holidayList}>
              {[...publicHolidays, ...regionalHolidays]
                .sort((a, b) => {
                  const dateA = a.date || a.start || '';
                  const dateB = b.date || b.start || '';
                  return new Date(dateA).getTime() - new Date(dateB).getTime();
                })
                .map((holiday, index) => (
                <div key={index} className={styles.holidayItem}>
                  <div 
                    className={`${styles.holidayRow} ${styles.clickable} ${selectedHoliday?.name === holiday.name ? styles.active : ''}`}
                    onClick={() => toggleHolidayDetails(holiday)}
                  >
                    <div className={styles.holidayDate}>
                      {formatHolidayDate(holiday)}
                    </div>
                    <div className={styles.holidayName}>
                      {holiday.name}
                      {holiday.isRegional && (
                        <span className={styles.regionalBadge}>Regional</span>
                      )}
                    </div>
                    {holiday.details && (
                      <button 
                        className={`${styles.detailsButton} ${selectedHoliday?.name === holiday.name ? styles.active : ''}`}
                        aria-label="Details anzeigen"
                      >
                        +
                      </button>
                    )}
                  </div>
                  {selectedHoliday?.name === holiday.name && renderHolidayDetails(holiday)}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.holidayColumn}>
            <div className={styles.columnHeader}>
              <div className={styles.headerIcon}>🎒</div>
              <div>
                <h2>Schulferien</h2>
                <p>{totalSchoolHolidayDays} Ferientage in 2025</p>
              </div>
            </div>
            <div className={styles.holidayList}>
              {filteredSchoolHolidays
                .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
                .map((holiday, index) => {
                  const cleanName = holiday.name.split(" ")[0]
                    .charAt(0).toUpperCase() + holiday.name.split(" ")[0].slice(1).toLowerCase();

                  return (
                    <div key={index} className={styles.holidayItem}>
                      <div 
                        className={`${styles.holidayRow} ${styles.clickable} ${selectedHoliday?.name === holiday.name ? styles.active : ''}`}
                        onClick={() => toggleHolidayDetails(holiday)}
                      >
                        <div className={styles.holidayDate}>
                          {formatDate(holiday.start)}
                          <span className={styles.dateSeparator}>-</span>
                          {formatDate(holiday.end)}
                        </div>
                        <div className={styles.holidayName}>
                          {cleanName}
                          <span className={styles.duration}>
                            ({calculateDuration(holiday.start, holiday.end)} Tage)
                          </span>
                        </div>
                        {holiday.details && (
                          <button 
                            className={`${styles.detailsButton} ${selectedHoliday?.name === holiday.name ? styles.active : ''}`}
                            aria-label="Details anzeigen"
                          >
                            +
                          </button>
                        )}
                      </div>
                      {selectedHoliday?.name === holiday.name && renderHolidayDetails(holiday)}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div className={styles.plannerPromo}>
          <div className={styles.promoContent}>
            <div className={styles.promoStats}>
              <div className={styles.promoStat}>
                <span className={styles.promoValue}>4x</span>
                <span className={styles.promoLabel}>mehr freie Tage durch Brückentage</span>
              </div>
              <div className={styles.promoStat}>
                <span className={styles.promoValue}>5 Min</span>
                <span className={styles.promoLabel}>schnelle Urlaubsplanung</span>
              </div>
              <div className={styles.promoStat}>
                <span className={styles.promoValue}>100%</span>
                <span className={styles.promoLabel}>kostenlos</span>
              </div>
            </div>
            <div className={styles.promoText}>
              <h2>Clever Urlaub planen in {stateInfo.fullName}</h2>
              <p>
                Nutzen Sie unseren intelligenten Urlaubsplaner, um das Beste aus Ihren Urlaubstagen herauszuholen.
                Finden Sie die optimalen Brückentage und verlängern Sie Ihren Urlaub effizient.
              </p>
              <div className={styles.promoFeatures}>
                <div className={styles.promoFeature}>
                  <FaCalendarAlt className={styles.promoIcon} />
                  <span>Brückentage-Optimierung</span>
                </div>
                <div className={styles.promoFeature}>
                  <FaUsers className={styles.promoIcon} />
                  <span>Zwei-Personen Planung</span>
                </div>
                <div className={styles.promoFeature}>
                  <FaGraduationCap className={styles.promoIcon} />
                  <span>Schulferien-Integration</span>
                </div>
              </div>
              <Link to="/app" className={styles.promoCTA}>
                Jetzt Urlaub clever planen
                <FaArrowRight className={styles.promoArrow} />
              </Link>
            </div>
          </div>
        </div>

        {stateInfo.seasonalTraditions && stateInfo.keyFacts && (
          <div className={styles.stateOverviewSection}>
            <h2>Über {stateInfo.fullName}</h2>
            <div className={styles.microInfoBar}>
              <div className={styles.microInfoItem}>
                <FaBuilding className={styles.microInfoIcon} />
                <span className={styles.microInfoLabel}>Hauptstadt:</span>
                <span className={styles.microInfoValue}>{stateInfo.capital}</span>
              </div>
              {renderKeyFacts(stateInfo)}
              <div className={styles.microInfoItem}>
                <FaIndustry className={styles.microInfoIcon} />
                <div className={styles.microInfoTags}>
                  {stateInfo.keyFacts.economicStrength.map((strength, index) => (
                    <span key={index} className={styles.microInfoTag}>{strength}</span>
                  ))}
                </div>
              </div>
            </div>
            <p className={styles.stateDescription}>{stateInfo.description}</p>
            <div className={styles.seasonalTraditions}>
              {stateInfo.seasonalTraditions.map((tradition, index) => (
                <div key={index} className={`${styles.seasonCard} ${styles[tradition.season.toLowerCase()]}`}>
                  {getSeasonIcon(tradition.season)}
                  <div className={styles.seasonContent}>
                    <h3>{tradition.season}</h3>
                    <p>{tradition.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {stateInfo.regionalSpecialties && (
          <div className={styles.regionalSection}>
            <h2>Regionale Besonderheiten</h2>
            <div className={styles.regionalGrid}>
              {stateInfo.regionalSpecialties.map((category, index) => (
                <div key={index} className={styles.regionalCard}>
                  <div className={styles.regionalHeader}>
                    {getRegionalIcon(category.icon)}
                    <h3>{category.title}</h3>
                  </div>
                  <div className={styles.regionalContent}>
                    <ul className={styles.regionalList}>
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex} className={styles.regionalItem}>
                          {getRegionalIcon(item.icon, 'regionalItemIcon')}
                          <div className={styles.regionalItemContent}>
                            <h4 className={styles.regionalItemTitle}>{item.title}</h4>
                            <p className={styles.regionalItemDescription}>{item.description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {stateInfo.vacationDestinations && (
          <div className={styles.vacationSection}>
            <h2>Beliebte Reiseziele</h2>
            <div className={styles.vacationGrid}>
              {stateInfo.vacationDestinations.map((destination, index) => (
                <div key={index} className={styles.vacationCard}>
                  <div className={styles.destinationHeader}>
                    {getDestinationIcon(destination.name)}
                    <h3>{destination.name}</h3>
                  </div>
                  <div className={styles.destinationContent}>
                    <p className={styles.destinationDescription}>{destination.description}</p>
                    <div className={styles.destinationDetails}>
                      <div className={styles.attractionsSection}>
                        <div className={styles.sectionHeader}>
                          <FaLocationDot className={styles.sectionIcon} />
                          <h4>Sehenswürdigkeiten</h4>
                        </div>
                        <ul>
                          {destination.attractions.map((attraction, i) => (
                            <li key={i}>{attraction}</li>
                          ))}
                        </ul>
                      </div>
                      <div className={styles.activitiesSection}>
                        <div className={styles.sectionHeader}>
                          <FaPersonHiking className={styles.sectionIcon} />
                          <h4>Aktivitäten</h4>
                        </div>
                        <ul>
                          {destination.activities.map((activity, i) => (
                            <li key={i}>{activity}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Bereit für die Urlaubsplanung?</h2>
          <p className={styles.ctaDescription}>
            Optimiere deinen Urlaub mit unseren intelligenten Brückentage-Empfehlungen.
          </p>
          <Link to="/app" className={styles.ctaButton}>
            Jetzt Urlaub planen <FaArrowRight className={styles.ctaIcon} />
          </Link>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Holiday Planner. Alle Rechte vorbehalten.</p>
        <nav aria-label="Footer Navigation">
          <a href="/holiday/datenschutz">Datenschutz</a>
          <a href="/holiday/impressum">Impressum</a>
          <a href="/holiday/kontakt">Kontakt</a>
        </nav>
      </footer>
    </div>
  );
};

export default StatePage; 