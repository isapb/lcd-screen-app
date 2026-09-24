import { useEffect } from 'react';
import { useNeuTheme } from 'neumorui';

/* Keeps Ionic's dark palette class in sync with the neumorui theme */
const IonicThemeSync: React.FC = () => {
  const { isDark } = useNeuTheme();

  useEffect(() => {
    document.documentElement.classList.toggle('ion-palette-dark', isDark);
  }, [isDark]);

  return null;
};

export default IonicThemeSync;
