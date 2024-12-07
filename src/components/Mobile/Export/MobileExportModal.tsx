import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (type: 'ics' | 'hr' | 'celebration') => void;
}

export const MobileExportModal: React.FC<MobileExportModalProps> = ({
  isOpen,
  onClose,
  onExport
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-lg p-6 w-full max-w-sm"
          onClick={e => e.stopPropagation()}
        >
          <h2 className="text-lg font-medium text-gray-900 mb-4">Export Format wählen</h2>
          
          <div className="space-y-3">
            <button
              onClick={() => onExport('ics')}
              className="w-full flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="mr-3 text-xl">📅</div>
              <div className="text-left">
                <div className="font-medium">Digitaler Kalender</div>
                <div className="text-sm text-gray-500">Export als ICS-Datei für deinen Kalender</div>
              </div>
            </button>

            <button
              onClick={() => onExport('hr')}
              className="w-full flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="mr-3 text-xl">📋</div>
              <div className="text-left">
                <div className="font-medium">Urlaubsantrag</div>
                <div className="text-sm text-gray-500">Offizielles PDF für die Personalabteilung</div>
              </div>
            </button>

            <button
              onClick={() => onExport('celebration')}
              className="w-full flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="mr-3 text-xl">🎉</div>
              <div className="text-left">
                <div className="font-medium">Urlaubsübersicht</div>
                <div className="text-sm text-gray-500">Schöne Zusammenfassung deiner Urlaubsplanung</div>
              </div>
            </button>
          </div>

          <button
            onClick={onClose}
            className="mt-4 w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Abbrechen
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}; 