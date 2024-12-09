import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (type: 'ics' | 'hr' | 'celebration', personId?: 1 | 2) => void;
  hasTwoPersons?: boolean;
}

interface HRPersonSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (personId: 1 | 2) => void;
}

const HRPersonSelectModal: React.FC<HRPersonSelectModalProps> = ({
  isOpen,
  onClose,
  onSelect
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[60]">
      <div className="bg-white rounded-xl shadow-xl max-w-sm w-full">
        <div className="p-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">
            HR-Export
          </h3>
        </div>
        <div className="p-4 space-y-4">
          <p className="text-sm text-gray-600">
            Für welche Person möchten Sie den HR-Export erstellen?
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                onSelect(1);
                onClose();
              }}
              className="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg 
                hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Person 1
            </button>
            <button
              onClick={() => {
                onSelect(2);
                onClose();
              }}
              className="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg 
                hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Person 2
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MobileExportModal: React.FC<MobileExportModalProps> = ({
  isOpen,
  onClose,
  onExport,
  hasTwoPersons
}) => {
  const [showHRSelect, setShowHRSelect] = useState(false);

  const exportOptions = [
    {
      id: 'ics',
      label: 'Als iCal exportieren',
      description: 'Für Kalender-Apps',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'hr',
      label: 'HR-Format',
      description: 'Für Personalverwaltung',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: 'celebration',
      label: 'Urlaubsübersicht',
      description: 'Übersicht aller Urlaubstage',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    }
  ] as const;

  const handleExportClick = (type: 'ics' | 'hr' | 'celebration') => {
    if (type === 'hr' && hasTwoPersons) {
      setShowHRSelect(true);
    } else {
      onExport(type);
      onClose();
    }
  };

  const handleHRPersonSelect = (personId: 1 | 2) => {
    onExport('hr', personId);
    onClose();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black"
              onClick={onClose}
              aria-hidden="true"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-xl shadow-xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby="export-modal-title"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 id="export-modal-title" className="text-lg font-medium text-gray-900">
                    Export
                  </h2>
                  <button
                    onClick={onClose}
                    className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
                    aria-label="Schließen"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-2">
                  {exportOptions.map(({ id, label, description, icon }) => (
                    <button
                      key={id}
                      onClick={() => handleExportClick(id)}
                      className="w-full flex items-center p-3 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <div className="flex-shrink-0 text-gray-500">{icon}</div>
                      <div className="ml-4 text-left">
                        <p className="text-sm font-medium text-gray-900">{label}</p>
                        <p className="text-sm text-gray-500">{description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Safe area spacer */}
              <div className="h-6 bg-white" />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <HRPersonSelectModal
        isOpen={showHRSelect}
        onClose={() => setShowHRSelect(false)}
        onSelect={handleHRPersonSelect}
      />
    </>
  );
}; 