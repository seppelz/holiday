import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { stateData } from '../../data/stateData';
import { GERMAN_STATES } from '../../components/Navigation/Navbar';
import { Helmet } from 'react-helmet-async';
import styles from './StatePage.module.css';

interface Holiday {
  name: string;
  date: string;
  type: 'public' | 'school';
  period?: string;
  isRegional?: boolean;
}

export const StatePage: React.FC = () => {
  const { state } = useParams<{ state: string }>();
  const stateInfo = stateData[state as keyof typeof stateData];
  const stateColors = GERMAN_STATES.find(s => s.slug === state)?.colors || ['#4299e1', '#2b6cb0'];
  const sectionsRef = useRef<HTMLElement[]>([]);

  // Updated holiday data for 2025
  const holidays: Holiday[] = [
    { name: 'Neujahr', date: '01.01.2025', type: 'public' },
    { name: 'Heilige Drei Könige', date: '06.01.2025', type: 'public', isRegional: true },
    { name: 'Karfreitag', date: '18.04.2025', type: 'public' },
    { name: 'Ostermontag', date: '21.04.2025', type: 'public' },
    { name: 'Tag der Arbeit', date: '01.05.2025', type: 'public' },
    { name: 'Christi Himmelfahrt', date: '29.05.2025', type: 'public' },
    { name: 'Pfingstmontag', date: '09.06.2025', type: 'public' },
    { name: 'Fronleichnam', date: '19.06.2025', type: 'public', isRegional: true },
    { name: 'Tag der Deutschen Einheit', date: '03.10.2025', type: 'public' },
    { name: 'Allerheiligen', date: '01.11.2025', type: 'public', isRegional: true },
    { name: '1. Weihnachtstag', date: '25.12.2025', type: 'public' },
    { name: '2. Weihnachtstag', date: '26.12.2025', type: 'public' },
  ];

  const schoolHolidays: Holiday[] = [
    { name: 'Winter Ferien', date: '23.12.2024', period: '04.01.2025', type: 'school' },
    { name: 'Faschings Ferien', date: '03.03.2025', period: '07.03.2025', type: 'school' },
    { name: 'Oster Ferien', date: '14.04.2025', period: '25.04.2025', type: 'school' },
    { name: 'Pfingst Ferien', date: '10.06.2025', period: '20.06.2025', type: 'school' },
    { name: 'Sommer Ferien', date: '24.07.2025', period: '06.09.2025', type: 'school' },
    { name: 'Herbst Ferien', date: '27.10.2025', period: '30.10.2025', type: 'school' },
    { name: 'Winter Ferien', date: '22.12.2025', period: '05.01.2026', type: 'school' },
  ];

  useEffect(() => {
    // Set state colors as CSS variables
    document.documentElement.style.setProperty('--state-primary-color', stateColors[0]);
    document.documentElement.style.setProperty('--state-secondary-color', stateColors[1] || stateColors[0]);

    // Initialize intersection observer for animations
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

    // Observe all sections
    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    // Mouse move effect for holiday items
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll(`.${styles.holidayContent}`);
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
      // Cleanup
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
      document.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.style.setProperty('--state-primary-color', '#4299e1');
      document.documentElement.style.setProperty('--state-secondary-color', '#2b6cb0');
    };
  }, [state, stateColors]);

  if (!stateInfo) {
    return (
      <div className={styles.errorPage}>
        <h1>Bundesland nicht gefunden</h1>
        <p>Das gesuchte Bundesland konnte leider nicht gefunden werden.</p>
      </div>
    );
  }

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className={styles.statePage}>
      <Helmet>
        <title>{`Feiertage und Schulferien ${stateInfo.name} 2025 - Übersicht & regionale Besonderheiten`}</title>
        <meta name="description" content={`Alle Feiertage und Schulferien in ${stateInfo.name} für 2025. Entdecken Sie regionale Besonderheiten, Bräuche und Ferienzeiten.`} />
        <meta property="og:title" content={`Feiertage und Schulferien ${stateInfo.name} 2025`} />
        <meta property="og:description" content={`Komplette Übersicht der Feiertage und Schulferien in ${stateInfo.name} mit regionalen Traditionen und Bräuchen.`} />
      </Helmet>

      <header className={styles.stateHeader}>
        <div className={styles.animatedBackground}>
          <div className={styles.celestialBody} />
          
          <div className={styles.cloud} />
          <div className={styles.cloud} />
          <div className={styles.cloud} />
          <div className={styles.cloud} />
          
          <div className={styles.palmTree}>
            <div className={styles.trunk} />
            <div className={styles.leaves}>
              <div className={styles.leaf} />
              <div className={styles.leaf} />
              <div className={styles.leaf} />
              <div className={styles.leaf} />
            </div>
          </div>
          
          <div className={styles.waves}>
            <div className={styles.wave} />
            <div className={styles.wave} />
            <div className={styles.wave} />
          </div>
          
          <div className={styles.holidaySymbol} /> {/* Star shape */}
          <div className={styles.holidaySymbol} /> {/* Hexagon shape */}
          <div className={styles.holidaySymbol} /> {/* Circle shape */}
        </div>
        
        <div className={styles.headerOverlay} />
        <div className={styles.headerContent}>
          <div className={styles.heroStats}>
            <div className={styles.statBadge}>
              <span className={styles.statNumber}>{stateInfo.totalHolidays}</span>
              <span className={styles.statLabel}>Feiertage</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statBadge}>
              <span className={styles.statNumber}>{stateInfo.uniqueHolidays}</span>
              <span className={styles.statLabel}>Besonderheiten</span>
            </div>
          </div>
          <h1>Feiertage und Schulferien in {stateInfo.name} 2025</h1>
          <p className={styles.heroSubtitle}>
            Entdecken Sie die einzigartigen Traditionen und optimale Urlaubsplanung
          </p>
          <div className={styles.heroActions}>
            <Link to="/app" className={styles.primaryButton}>
              Urlaub jetzt planen
              <span className={styles.buttonIcon}>→</span>
            </Link>
            <button 
              className={styles.secondaryButton} 
              onClick={() => document.querySelector('#overview')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Mehr erfahren
              <span className={styles.buttonIcon}>↓</span>
            </button>
          </div>
        </div>
      </header>

      <section className={styles.holidayOverview}>
        <div className={styles.holidayGrid}>
          <div className={styles.holidayColumn}>
            <div className={styles.columnHeader}>
              <div className={styles.headerIcon}>📅</div>
              <div>
                <h2>Gesetzliche Feiertage</h2>
                <p>{holidays.length} Feiertage in 2025</p>
              </div>
            </div>
            <div className={styles.holidayList}>
              {holidays.map((holiday, index) => (
                <div key={index} className={styles.holidayRow}>
                  <div className={styles.holidayDate}>{holiday.date}</div>
                  <div className={styles.holidayName}>
                    {holiday.name}
                    {holiday.isRegional && (
                      <span className={styles.regionalBadge}>Regional</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.holidayColumn}>
            <div className={styles.columnHeader}>
              <div className={styles.headerIcon}>🎒</div>
              <div>
                <h2>Schulferien</h2>
                <p>{schoolHolidays.length} Ferienzeiten in 2025</p>
              </div>
            </div>
            <div className={styles.holidayList}>
              {schoolHolidays.map((holiday, index) => (
                <div key={index} className={styles.holidayRow}>
                  <div className={styles.holidayDate}>
                    {holiday.date}
                    {holiday.period && (
                      <>
                        <span className={styles.dateSeparator}>-</span>
                        {holiday.period}
                      </>
                    )}
                  </div>
                  <div className={styles.holidayName}>
                    {holiday.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className={styles.content}>
        <div className={styles.mainGrid}>
          <div className={styles.leftColumn}>
            <section id="overview" className={styles.mainContent}>
              <div className={styles.intro} ref={addToRefs}>
                <h2>Überblick</h2>
                <p>
                  {stateInfo.name} zeichnet sich durch seine {stateInfo.uniqueHolidays} besonderen regionalen Feiertage aus, 
                  die die kulturelle Identität und Geschichte des Bundeslandes widerspiegeln. 
                  Mit insgesamt {stateInfo.totalHolidays} gesetzlichen Feiertagen bietet {stateInfo.name} 
                  seinen Einwohnern {stateInfo.comparison}.
                </p>
              </div>

              <section className={styles.holidaySection} ref={addToRefs}>
                <h2>Besondere regionale Feiertage</h2>
                <div className={styles.holidayList}>
                  {stateInfo.uniqueHolidays > 0 && stateData[state as keyof typeof stateData]?.seasonalTraditions.map((tradition, index) => (
                    <div key={index} className={styles.holidayItem}>
                      <div className={styles.holidayContent}>
                        <h3>{tradition.season}</h3>
                        <p>{tradition.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className={styles.seasonalSection} ref={addToRefs}>
                <h2>Traditionen im Jahresverlauf</h2>
                <div className={styles.seasonGrid}>
                  {stateInfo.seasonalTraditions.map((tradition, index) => (
                    <div key={index} className={styles.seasonCard}>
                      <h3>{tradition.season}</h3>
                      <p>{tradition.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            </section>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.stickyContent}>
              <section className={styles.quickInfo} ref={addToRefs}>
                <div className={styles.sectionDecoration} />
                <h2>Auf einen Blick</h2>
                <div className={styles.infoCard}>
                  <h3>Brückentage & Planung</h3>
                  <p>{stateInfo.bridgeDayInfo}</p>
                </div>
                <div className={styles.infoCard}>
                  <h3>Geschäftsöffnungszeiten</h3>
                  <p>{stateInfo.businessHoursInfo}</p>
                </div>
              </section>

              <section className={styles.faqSection} ref={addToRefs}>
                <div className={styles.sectionDecoration} />
                <h2>Häufige Fragen</h2>
                <div className={styles.faqList}>
                  <div className={styles.faqItem}>
                    <h3>Welche besonderen regionalen Feiertage gibt es?</h3>
                    <p>{stateInfo.uniqueHolidayAnswer}</p>
                  </div>
                  <div className={styles.faqItem}>
                    <h3>Wie unterscheidet sich {stateInfo.name}?</h3>
                    <p>{stateInfo.comparisonAnswer}</p>
                  </div>
                  <div className={styles.faqItem}>
                    <h3>Welche lokalen Bräuche gibt es?</h3>
                    <p>{stateInfo.traditionAnswer}</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        <section className={styles.bottomSection} ref={addToRefs}>
          <div className={styles.callToAction}>
            <div className={styles.ctaContent}>
              <h2>Maximieren Sie Ihre Urlaubstage</h2>
              <p>Mit unserem Urlaubsplaner finden Sie die optimalen Brückentage und verlängern Ihren Urlaub clever.</p>
              <div className={styles.ctaStats}>
                <div className={styles.ctaStat}>
                  <span className={styles.ctaNumber}>{stateInfo.totalHolidays}</span>
                  <span>Feiertage</span>
                </div>
                <div className={styles.ctaStat}>
                  <span className={styles.ctaNumber}>+10</span>
                  <span>Brückentage</span>
                </div>
                <div className={styles.ctaStat}>
                  <span className={styles.ctaNumber}>30+</span>
                  <span>Urlaubstage</span>
                </div>
              </div>
              <Link to="/app" className={styles.ctaButton}>
                Jetzt Urlaub planen
                <span className={styles.buttonIcon}>→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}; 