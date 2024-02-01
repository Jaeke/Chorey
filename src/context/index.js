import { useContext } from 'react';

import { ResponsibilityContext } from './Responsibility/ResponsibilityContext';

export const useResponsibility = () => {
  const context = useContext(ResponsibilityContext);
  if (context === undefined) {
    throw new Error(
      'useResponsibility must be used within a ResponsibilityProvider'
    );
  }
  return context;
};
