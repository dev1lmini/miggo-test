"use client"

import { useLocation } from "../hooks/location"
import { format } from "date-fns"
import { Button } from "@/uikit"
import dynamic from "next/dynamic"
import { Suspense } from "react"

// Dynamically import map to avoid SSR errors related to browser API
const Map = dynamic(() => import("@/components/Map").then(({ Map }) => Map), {
  ssr: false
})

export default function Home() {
  /** Get current ISS location */
  const { data, error, refetch, loading } = useLocation()
  return (
    <main className="w-full h-full">
      <Suspense fallback="Loading...">
        <Map position={data?.iss_position}>
          <section className="flex flex-col gap-4">
            {data?.timestamp && (
              <section>
                <p className="font-medium text-black/60 text-md">Updated at</p>
                <p className="font-semibold text-black/80 text-md">
                  {format(new Date(data?.timestamp * 1000), "PPPpp")}
                </p>
              </section>
            )}
            {error && (
              <p className="font-semibold text-red-700">{error?.message}</p>
            )}
            <Button loading={loading} type="button" onClick={refetch}>
              Refresh
            </Button>
          </section>
        </Map>
      </Suspense>
    </main>
  )
}
