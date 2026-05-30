import { useState, useCallback } from 'react';
import { fetchWeatherData, fetchAirQuality, fetchDailyDetails } from '../services/api';

export const useWeather = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getWeather = useCallback(async (query) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchWeatherData(query);
      
      // If we got the current weather, use its coordinates to fetch AQI and UV Index
      if (result && result.current && result.current.coord) {
        const { lat, lon } = result.current.coord;
        const [aqiData, dailyDetails] = await Promise.all([
          fetchAirQuality(lat, lon),
          fetchDailyDetails(lat, lon)
        ]);
        
        result.aqi = aqiData;
        result.uvi = dailyDetails?.uv_index_max?.[0] || null;
        result.dailyDetails = dailyDetails;
      }
      
      setData(result);
      return true;
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
      setData(null);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, getWeather, setError };
};
