import { useState, useEffect } from 'react';
import { DISTROS } from '../constants';

export const useDistros = () => {
  const [distros, setDistros] = useState(DISTROS);

  useEffect(() => {
    const savedDistros = localStorage.getItem('meulinux_distros_override');
    if (savedDistros) {
      try {
        setDistros(JSON.parse(savedDistros));
      } catch (e) {
        console.error('Failed to parse saved distros', e);
      }
    }

    // Listen for storage changes in other tabs/windows
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'meulinux_distros_override') {
        if (e.newValue) {
          setDistros(JSON.parse(e.newValue));
        } else {
          setDistros(DISTROS);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return distros;
};
