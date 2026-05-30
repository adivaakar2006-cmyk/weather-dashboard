# 🌤️ Modern Weather Dashboard

![Weather Dashboard](https://via.placeholder.com/1200x600.png?text=Weather+Dashboard+-+Light+Mode)

A stunning, highly-optimized, and fully responsive weather application built with React, Vite, and Tailwind CSS v4. It fetches real-time meteorological data from the OpenWeatherAPI and Open-Meteo geocoding APIs.

### 🔗 [Live Demo on Vercel](#)
### 🔗 [GitHub Repository](#)

---

## 📸 Screenshots

| Light Mode | Dark Mode | Forecast & Charts |
|:---:|:---:|:---:|
| ![Light Mode](https://via.placeholder.com/400x800.png?text=Light+Mode) | ![Dark Mode](https://via.placeholder.com/400x800.png?text=Dark+Mode) | ![Forecast](https://via.placeholder.com/400x800.png?text=Interactive+Charts) |

---

## 🔥 Features Checklist (Recruiter-Wow)

### 🟢 Intermediate Features
- [x] **Auto-detect user's location** (Native Geolocation API integration)
- [x] **Temperature unit switch** (Math-driven real-time °C ↔ °F toggle)
- [x] **Recent search history** (Persists last 5 unique cities)
- [x] **Weather by coordinates** (Precision `{lat, lon}` lookups)
- [x] **Sunrise & sunset timings** (Timezone-adjusted local times)
- [x] **Advanced Metrics:** Humidity, Pressure, Wind Speed, Visibility
- [x] **UV Index & Air Quality Index (AQI)**

### 🟢 Advanced UI Features
- [x] **Dynamic backgrounds:** (Gradients auto-morph based on current weather)
- [x] **Animated weather icons:** (Using Lucide-React SVGs)
- [x] **Loading skeletons:** (Prevents layout jumps during network fetches)
- [x] **Smooth transitions:** (Tailwind fade-ins and glassmorphism UI)
- [x] **System-synced Dark/Light mode:** (Respects `prefers-color-scheme`)

### 🟢 React Features
- [x] **Custom Hooks:** (`useWeather`, `useGeolocation`, `useDebounce`, `useTranslation`)
- [x] **Context API:** (Global state management for Preferences)
- [x] **Reusable components:** (Modular dashboard architecture)
- [x] **Debounced search:** (500ms API spam-protection)
- [x] **Error boundaries:** (Prevents React crashes from taking down the app)

### 🟢 API Handling Features
- [x] **Loading state handling**
- [x] **Network error handling:** (Offline alert banner)
- [x] **Invalid city handling:** (HTTP 404 interceptors)
- [x] **API rate-limit handling:** (HTTP 429 interceptors)

### 🟢 Data Visualization
- [x] **Hourly temperature chart:** (Responsive Recharts Area Graph)
- [x] **Weekly forecast chart:** (5-day projection)
- [x] **Interactive Forecast Accordions:** (Click a day to see its detailed metrics!)

### 🟢 Recruiter-Wow Features
- [x] **Favorite cities** (localStorage pinned chips)
- [x] **Weather alerts** (Dynamic severe-weather banners)
- [x] **PWA (Install as app)** (Service workers & Web Manifest)
- [x] **Share weather report** (Native mobile `navigator.share` & desktop clipboard)
- [x] **Voice search** (Native SpeechRecognition API integration)
- [x] **Multi-language support** (English, Spanish, French, Hindi, Japanese)
- [x] **Mobile Optimization** (Tested flawlessly on 320px, 375px, 768px, and 1024px screens)

---

## 🚀 Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your OpenWeather API key:
   ```env
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🌍 Deployment to Vercel

1. Push your code to a GitHub repository.
2. Log in to [Vercel](https://vercel.com).
3. Click **Add New Project** and import your GitHub repository.
4. Add the `VITE_OPENWEATHER_API_KEY` to the **Environment Variables** section.
5. Click **Deploy**. Vercel will automatically detect the Vite build settings and launch your application!
