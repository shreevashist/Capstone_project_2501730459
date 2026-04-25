import { useState, useEffect } from 'react'
import axios from 'axios'

const API_KEY = 'b6907d289e10d714a6e88b30761fad96'

export function useWeather(city = 'New Delhi') {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: { q: city, appid: API_KEY, units: 'metric' }
    })
      .then(res => { setData(res.data); setError(null) })
      .catch(() => setError('Could not load weather'))
      .finally(() => setLoading(false))
  }, [city])

  return { data, loading, error }
}
