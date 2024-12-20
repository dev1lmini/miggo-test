import { useCallback, useEffect, useState } from "react"
import { z } from "zod"

export const schema = z.object({
  position: z.object({
    latitude: z.number(),
    longitude: z.number(),
    velocity: z.number(),
    period: z.number()
  }),
  message: z.string(),
  timestamp: z.number()
})

export type ISSLocation = z.infer<typeof schema>

type Options = {
  /** Update interval for location position */
  interval?: number
}

export const useLocation = ({ interval = 10000 }: Options = {}) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<ISSLocation | null>(null)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(() => {
    setLoading(true)
    fetch("./api/location")
      .then(res => res.json())
      .then(data => {
        /** Validate incoming response */
        setData(schema.parse(data))
      })
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    fetchData()
    /** Start interval refetching */
    const current = setInterval(() => {
      fetchData()
    }, interval)
    return () => clearInterval(current)
  }, [fetchData, interval])

  return {
    data,
    error,
    loading,
    refetch: fetchData
  }
}
