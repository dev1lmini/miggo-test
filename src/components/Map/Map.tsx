"use client"
import { memo, PropsWithChildren } from "react"
import { MapContainer, Marker, TileLayer } from "react-leaflet"
import { ISSLocation } from "@/hooks/location"
import L from "leaflet"
import sateliteIcon from "./assets/satelite.svg"

import "leaflet/dist/leaflet.css"

type Props = {
  position?: ISSLocation['position']
}

const icon = L.icon({
  iconUrl: sateliteIcon.src,
  iconSize: [64, 64],
  iconAnchor: [32, 64]
})

export const Map = memo<PropsWithChildren<Props>>(({ position, children }) => {
  return (
    <MapContainer
      className="w-full h-full"
      center={[0, 0]}
      zoom={2}
      scrollWheelZoom={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {position && (
        <Marker
          icon={icon}
          position={[Number(position?.latitude), Number(position?.longitude)]}
        />
      )}
      <section className="pointer-events-auto top-6 right-6 absolute z-[1000] p-2 bg-black/10 rounded-lg">
        {children}
      </section>
    </MapContainer>
  )
})

Map.displayName = "Map"
