export const formatTime = (timestamp, timezoneOffset, language = 'en') => {
  if (!timestamp) return '';
  const date = new Date((timestamp + timezoneOffset) * 1000);
  const locale = language === 'en' ? 'en-US' : language;
  return date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
};

export const formatTemperature = (temp, unit = 'metric') => {
  let finalTemp = temp;
  if (unit === 'imperial') {
    finalTemp = (temp * 9) / 5 + 32;
  }
  const symbol = unit === 'metric' ? '°C' : '°F';
  return `${Math.round(finalTemp)}${symbol}`;
};

export const capitalizeWords = (str) => {
  if (!str) return '';
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};
