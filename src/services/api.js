import axios from 'axios';
import { mockCurrentWeather, mockForecastData } from './mockData';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const weatherApi = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: 'metric', // Default to metric
  },
});

export const fetchCitySuggestions = async (query, language = 'en') => {
  if (!query || query.trim().length < 2) return [];
  try {
    const res = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
      params: {
        name: query,
        count: 5,
        language: language,
        format: 'json'
      }
    });
    
    if (!res.data.results) return [];
    
    return res.data.results.map(item => ({
      name: item.name,
      state: item.admin1 || '',
      country: item.country_code
    }));
  } catch (error) {
    console.error('Failed to fetch city suggestions:', error);
    return [];
  }
};

export const fetchWeatherData = async (query) => {
  try {
    const [currentRes, forecastRes] = await Promise.all([
      weatherApi.get('/weather', { params: query }),
      weatherApi.get('/forecast', { params: query })
    ]);
    
    return {
      current: currentRes.data,
      forecast: forecastRes.data,
    };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error('City not found. Please try another search.');
      }
      if (error.response.status === 401) {
        throw new Error('Invalid API Key. Please check your OpenWeather API key.');
      }
      if (error.response.status === 429) {
        throw new Error('Too many requests. You have exceeded your API rate limit. Please try again later.');
      }
      if (error.response.status >= 500) {
        throw new Error('Weather service unavailable. OpenWeather servers are currently down.');
      }
      throw new Error(error.response.data.message || 'Failed to fetch weather data.');
    }
    throw new Error('Failed to fetch weather data. Please check your connection.');
  }
};

export const fetchAirQuality = async (lat, lon) => {
  try {
    const res = await weatherApi.get('/air_pollution', { params: { lat, lon } });
    return res.data.list[0];
  } catch (error) {
    console.error('Failed to fetch AQI:', error);
    return null;
  }
};

export const fetchDailyDetails = async (lat, lon) => {
  try {
    const res = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=sunrise,sunset,uv_index_max&timezone=auto`);
    return res.data.daily;
  } catch (error) {
    console.error('Failed to fetch daily details:', error);
    return null;
  }
};
