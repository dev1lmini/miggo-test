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
        <Map position={data?.position}>
          <section className="flex flex-col gap-2">
            {data?.position && (
              <section className="bg-black/10 px-2 py-1 rounded-md">
                <section>
                  <span className="font-medium text-black/60 text-md">
                    Latitude:{" "}
                  </span>
                  <span className="font-semibold text-black/80 text-md">
                    {data.position.latitude}
                  </span>
                </section>
                <section>
                  <span className="font-medium text-black/60 text-md">
                    Longitude:{" "}
                  </span>
                  <span className="font-semibold text-black/80 text-md">
                    {data.position.longitude}
                  </span>
                </section>
                <section>
                  <span className="font-medium text-black/60 text-md">
                    Velocity:{" "}
                  </span>
                  <span className="font-semibold text-black/80 text-md">
                    {data.position.velocity} km/h
                  </span>
                </section>
                <section>
                  <span className="font-medium text-black/60 text-md">
                    Velocity:{" "}
                  </span>
                  <span className="font-semibold text-black/80 text-md">
                    92.88 min
                  </span>
                </section>
              </section>
            )}
            {data?.timestamp && (
              <section className="bg-black/10 px-2 py-1 rounded-md">
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
