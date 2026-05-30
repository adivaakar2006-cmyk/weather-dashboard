export const mockCurrentWeather = {
  name: "Demo City",
  sys: { country: "US", sunrise: Math.floor(Date.now() / 1000) - 21600, sunset: Math.floor(Date.now() / 1000) + 21600 },
  weather: [{ description: "scattered clouds", icon: "03d" }],
  main: { temp: 22, temp_max: 26, temp_min: 18, humidity: 60, pressure: 1015 },
  wind: { speed: 5.2 },
  visibility: 10000,
  timezone: 0,
};

export const mockForecastData = {
  list: Array.from({ length: 40 }).map((_, i) => ({
    dt: Math.floor(Date.now() / 1000) + (i * 10800),
    main: {
      temp: 22 + Math.sin(i * 0.5) * 6,
      temp_max: 24 + Math.sin(i * 0.5) * 6,
      temp_min: 18 + Math.sin(i * 0.5) * 6,
    },
    weather: [{
      description: i % 3 === 0 ? "light rain" : "clear sky",
      icon: i % 3 === 0 ? "10d" : "01d"
    }],
  })),
};
