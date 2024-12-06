import React from 'react';
import { useSpring, animated } from '@react-spring/web';

interface MobileLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  sidebar?: React.ReactNode;
  isSidebarOpen?: boolean;
  onSidebarClose?: () => void;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({
  children,
  header,
  footer,
  sidebar,
  isSidebarOpen = false,
  onSidebarClose
}) => {
  // Animation for sidebar
  const sidebarAnimation = useSpring({
    transform: isSidebarOpen ? 'translateX(0%)' : 'translateX(100%)',
    config: { tension: 300, friction: 30 }
  });

  // Animation for overlay
  const overlayAnimation = useSpring({
    opacity: isSidebarOpen ? 0.5 : 0,
    pointerEvents: isSidebarOpen ? 'auto' as const : 'none' as const,
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      {header && (
        <header className="sticky top-0 z-30 bg-white border-b">
          {header}
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1 relative">
        {children}

        {/* Sidebar Overlay */}
        {sidebar && (
          <animated.div
            style={{
              opacity: overlayAnimation.opacity,
              pointerEvents: overlayAnimation.pointerEvents,
            }}
            className="fixed inset-0 bg-black z-40"
            onClick={onSidebarClose}
          />
        )}

        {/* Sidebar */}
        {sidebar && (
          <animated.div
            style={sidebarAnimation}
            className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white shadow-lg z-50 
                     flex flex-col overflow-hidden"
          >
            {sidebar}
          </animated.div>
        )}
      </main>

      {/* Footer */}
      {footer && (
        <footer className="sticky bottom-0 z-30 bg-white border-t">
          {footer}
        </footer>
      )}
    </div>
  );
}; 