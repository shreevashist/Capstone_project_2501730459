import { useState } from 'react'
import { useWeather } from '../hooks/useWeather'

const iconMap = { Clear:'☀', Clouds:'☁', Rain:'🌧', Drizzle:'🌦', Thunderstorm:'⛈', Snow:'❄', Mist:'🌫', Haze:'🌫' }

export default function Weather() {
  const [city, setCity] = useState('New Delhi')
  const [query, setQuery] = useState('New Delhi')
  const { data, loading, error } = useWeather(query)

  return (
    <div style={{ maxWidth: 480 }}>
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: '1rem' }}>Weather</div>

      <div style={{ display: 'flex', gap: 8, marginBottom: '1.25rem' }}>
        <input value={city} onChange={e => setCity(e.target.value)} onKeyDown={e => e.key === 'Enter' && setQuery(city)} placeholder="Enter city..." />
        <button className="btn-primary" onClick={() => setQuery(city)}>Search</button>
      </div>

      <div className="card-base" style={{ textAlign: 'center' }}>
        {loading && <div style={{ fontSize: 13, color: '#aaa', padding: '2rem' }}>Loading weather...</div>}
        {error && <div style={{ fontSize: 13, color: '#D85A30', padding: '2rem' }}>{error}</div>}
        {data && !loading && (
          <>
            <div style={{ fontSize: 48 }}>{iconMap[data.weather[0].main] || '🌡'}</div>
            <div style={{ fontSize: 52, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>{Math.round(data.main.temp)}°C</div>
            <div style={{ fontSize: 14, color: '#888', fontFamily: 'var(--font-mono)', marginTop: 6 }}>{data.name}, {data.sys.country}</div>
            <div style={{ fontSize: 13, color: '#aaa', marginTop: 4, textTransform: 'capitalize' }}>{data.weather[0].description}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginTop: '1.25rem' }}>
              {[
                { label: 'feels like', val: `${Math.round(data.main.feels_like)}°C` },
                { label: 'humidity', val: `${data.main.humidity}%` },
                { label: 'wind', val: `${Math.round(data.wind.speed * 3.6)} km/h` },
                { label: 'pressure', val: `${data.main.pressure} hPa` },
              ].map((d, i) => (
                <div key={i} style={{ background: '#f5f4f0', borderRadius: 8, padding: '10px 8px' }} className="dark:bg-neutral-800">
                  <div style={{ fontSize: 9, color: '#999', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: 0.5 }}>{d.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 500, marginTop: 4 }}>{d.val}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
