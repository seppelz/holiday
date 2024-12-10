import React from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { DesktopVacationPicker } from './Desktop/VacationPicker/DesktopVacationPicker';
import { MobileVacationPicker } from './Mobile/VacationPicker/MobileVacationPicker';
import { BaseVacationPickerProps } from './Shared/BaseVacationPicker';

export const VacationPicker: React.FC<BaseVacationPickerProps> = (props) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return isMobile ? (
    <MobileVacationPicker {...props} />
  ) : (
    <DesktopVacationPicker {...props} />
  );
};

export default VacationPicker; 