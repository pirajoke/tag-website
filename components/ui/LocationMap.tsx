"use client";

import { ExternalLink } from "lucide-react";
import { Map, MapControls, MapMarker, MapPopup } from "@/components/ui/map";

interface LocationMapProps {
  location?: string;
  address?: string;
  className?: string;
}

const TAG_COORDINATES = {
  longitude: -73.9764,
  latitude: 40.7529,
};

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=420+Lexington+Ave+Suite+1402+New+York+NY+10170";

export function LocationMap({
  location = "TAG Headquarters",
  address = "420 Lexington Ave, Suite 1402, New York, NY 10170",
  className,
}: LocationMapProps) {
  return (
    <div className={className || ""}>
      <div className="relative h-[360px] overflow-hidden rounded-2xl border border-navy/10 bg-ivory shadow-sm">
        <Map
          center={[TAG_COORDINATES.longitude, TAG_COORDINATES.latitude]}
          zoom={15.8}
          pitch={34}
          bearing={-18}
          cooperativeGestures
          minZoom={11}
        >
          <MapMarker
            longitude={TAG_COORDINATES.longitude}
            latitude={TAG_COORDINATES.latitude}
            anchor="bottom"
          >
            <div className="relative">
              <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/20 animate-ping" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gold text-navy shadow-xl">
                <span className="font-serif text-sm font-bold">TAG</span>
              </div>
            </div>
          </MapMarker>

          <MapPopup
            longitude={TAG_COORDINATES.longitude}
            latitude={TAG_COORDINATES.latitude}
            closeOnClick={false}
            closeOnMove={false}
          >
            <div className="w-[220px] pr-1">
              <p className="font-serif text-base font-bold text-navy">{location}</p>
              <p className="mt-1 text-xs leading-relaxed text-steel">{address}</p>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold hover:text-navy"
              >
                Open directions
                <ExternalLink className="size-3.5" />
              </a>
            </div>
          </MapPopup>

          <MapControls showLocate showFullscreen />
        </Map>
      </div>
      <p className="mt-3 text-center text-[11px] tracking-wide text-steel/60">
        Scroll to zoom, drag to explore Midtown Manhattan.
      </p>
    </div>
  );
}
