import { Sun, Moon, CloudSun, CloudMoon, Cloud, CloudRain, CloudDrizzle, CloudLightning, CloudSnow, CloudFog } from 'lucide-react';

const AnimatedRain = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <style>
      {`
        @keyframes fall {
          0% { transform: translateY(-4px); opacity: 0; }
          50% { transform: translateY(2px); opacity: 1; }
          100% { transform: translateY(6px); opacity: 0; }
        }
        @keyframes float-cloud {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(2px); }
        }
        .rain-1 { animation: fall 1.2s linear infinite; }
        .rain-2 { animation: fall 1.2s linear infinite 0.4s; }
        .rain-3 { animation: fall 1.2s linear infinite 0.8s; }
        .cloud-anim { animation: float-cloud 5s ease-in-out infinite; }
      `}
    </style>
    <path className="cloud-anim" d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
    <path className="rain-1" d="M8 14v6" />
    <path className="rain-2" d="M12 16v6" />
    <path className="rain-3" d="M16 14v6" />
  </svg>
);

const AnimatedLightning = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <style>
      {`
        @keyframes flash {
          0%, 90%, 100% { opacity: 0.2; stroke: currentColor; }
          92% { opacity: 1; stroke: #f59e0b; }
          94% { opacity: 0.2; stroke: currentColor; }
          96% { opacity: 1; stroke: #fde047; }
        }
        @keyframes float-cloud {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(2px); }
        }
        .flash-anim { animation: flash 3s ease-in-out infinite; }
        .cloud-anim { animation: float-cloud 5s ease-in-out infinite; }
      `}
    </style>
    <path className="cloud-anim" d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9" />
    <polyline className="flash-anim" points="13 11 9 17 15 17 11 23" />
  </svg>
);

const AnimatedCloud = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <style>
      {`
        @keyframes float-cloud {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(3px); }
        }
        .cloud-anim { animation: float-cloud 5s ease-in-out infinite; }
      `}
    </style>
    <path className="cloud-anim" d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
  </svg>
);

export default function WeatherIcon({ code, className = '' }) {
  const isDay = code.endsWith('d');
  const baseCode = code.substring(0, 2);

  switch (baseCode) {
    case '01': // Clear
      return isDay 
        ? <Sun className={`${className} text-yellow-500 animate-[spin_10s_linear_infinite]`} /> 
        : <Moon className={`${className} text-blue-200`} />;
    case '02': // Few clouds
      return isDay 
        ? <CloudSun className={`${className} text-slate-400 dark:text-slate-300`} /> 
        : <CloudMoon className={`${className} text-slate-400 dark:text-slate-300`} />;
    case '03': // Scattered clouds
    case '04': // Broken clouds
      return <AnimatedCloud className={`${className} text-slate-400 dark:text-slate-300`} />;
    case '09': // Shower rain
      return <AnimatedRain className={`${className} text-blue-500`} />;
    case '10': // Rain
      return <AnimatedRain className={`${className} text-blue-600`} />;
    case '11': // Thunderstorm
      return <AnimatedLightning className={`${className} text-purple-500`} />;
    case '13': // Snow
      return <CloudSnow className={`${className} text-sky-200 animate-[spin_4s_linear_infinite]`} />;
    case '50': // Mist/Fog
      return <CloudFog className={`${className} text-slate-400 animate-pulse`} />;
    default:
      return <AnimatedCloud className={`${className} text-slate-400`} />;
  }
}
