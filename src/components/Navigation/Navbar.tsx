import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

interface State {
  id: string;
  name: string;
  slug: string;
  colors: string[];
}

// German states data with their colors based on flags
export const GERMAN_STATES: State[] = [
  { id: 'bw', name: 'Baden-Württemberg', slug: 'baden-wuerttemberg', colors: ['#000000', '#FFDF00', '#FF0000'] },
  { id: 'by', name: 'Bayern', slug: 'bayern', colors: ['#FFFFFF', '#0066B3'] },
  { id: 'be', name: 'Berlin', slug: 'berlin', colors: ['#FF0000', '#FFFFFF'] },
  { id: 'bb', name: 'Brandenburg', slug: 'brandenburg', colors: ['#FF0000', '#FFFFFF'] },
  { id: 'hb', name: 'Bremen', slug: 'bremen', colors: ['#FF0000', '#FFFFFF'] },
  { id: 'hh', name: 'Hamburg', slug: 'hamburg', colors: ['#FF0000', '#FFFFFF'] },
  { id: 'he', name: 'Hessen', slug: 'hessen', colors: ['#FF0000', '#FFFFFF'] },
  { id: 'mv', name: 'Mecklenburg-Vorpommern', slug: 'mecklenburg-vorpommern', colors: ['#0066B3', '#FFFFFF', '#FFDF00', '#FF0000'] },
  { id: 'ni', name: 'Niedersachsen', slug: 'niedersachsen', colors: ['#FF0000', '#FFFFFF', '#000000'] },
  { id: 'nw', name: 'Nordrhein-Westfalen', slug: 'nordrhein-westfalen', colors: ['#FF0000', '#FFFFFF', '#00AB39'] },
  { id: 'rp', name: 'Rheinland-Pfalz', slug: 'rheinland-pfalz', colors: ['#000000', '#FFDF00', '#FF0000'] },
  { id: 'sl', name: 'Saarland', slug: 'saarland', colors: ['#0066B3', '#FFFFFF', '#FF0000'] },
  { id: 'sn', name: 'Sachsen', slug: 'sachsen', colors: ['#FFFFFF', '#00AB39'] },
  { id: 'st', name: 'Sachsen-Anhalt', slug: 'sachsen-anhalt', colors: ['#000000', '#FFDF00'] },
  { id: 'sh', name: 'Schleswig-Holstein', slug: 'schleswig-holstein', colors: ['#0066B3', '#FF0000', '#FFFFFF'] },
  { id: 'th', name: 'Thüringen', slug: 'thueringen', colors: ['#FF0000', '#FFFFFF'] },
];

export const Navbar: React.FC = () => {
  const [isStatesMenuOpen, setIsStatesMenuOpen] = useState(false);
  const location = useLocation();

  const toggleStatesMenu = () => {
    setIsStatesMenuOpen(!isStatesMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <Link to="/" className={styles.logo}>
          🏖️ Holiday Planner
        </Link>

        <div className={styles.navLinks}>
          <Link to="/" className={styles.navLink}>
            Home
          </Link>
          
          <div className={styles.statesDropdown}>
            <button 
              className={styles.statesButton}
              onClick={toggleStatesMenu}
              aria-expanded={isStatesMenuOpen}
            >
              Bundesländer
              <span className={`${styles.arrow} ${isStatesMenuOpen ? styles.arrowUp : ''}`}>▼</span>
            </button>

            {isStatesMenuOpen && (
              <div className={styles.statesMenu}>
                <div className={styles.statesGrid}>
                  {GERMAN_STATES.map((state) => (
                    <Link
                      key={state.id}
                      to={`/state/${state.slug}`}
                      className={styles.stateLink}
                      style={{
                        '--state-gradient': `linear-gradient(135deg, ${state.colors.join(', ')})`,
                      } as React.CSSProperties}
                      onClick={() => setIsStatesMenuOpen(false)}
                    >
                      {state.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link to="/app" className={styles.navLink}>
            Zum Planer
          </Link>
        </div>
      </div>
    </nav>
  );
}; 