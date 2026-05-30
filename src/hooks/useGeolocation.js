import { useState, useCallback } from 'react';

export const useGeolocation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getLocation = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const err = 'Geolocation is not supported by your browser';
        setError(err);
        reject(err);
        return;
      }

      setLoading(true);
      setError(null);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLoading(false);
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (err) => {
          setLoading(false);
          let errMsg = 'Unable to retrieve your location';
          if (err.code === 1) errMsg = 'Location access denied.';
          if (err.code === 2) errMsg = 'Location unavailable.';
          if (err.code === 3) errMsg = 'Location request timed out.';
          setError(errMsg);
          reject(errMsg);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    });
  }, []);

  return { getLocation, loading, error };
};
