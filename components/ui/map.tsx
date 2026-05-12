"use client";

import MapLibreGL, {
  type MapOptions,
  type MarkerOptions,
  type PopupOptions,
  type StyleSpecification,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { Locate, Maximize, Minus, Plus, X } from "lucide-react";

import { cn } from "@/lib/utils";

type MapContextValue = {
  map: MapLibreGL.Map | null;
  isLoaded: boolean;
};

const MapContext = createContext<MapContextValue | null>(null);

function useMap() {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a Map component");
  }
  return context;
}

const defaultStyles = {
  dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  light: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
};

type MapStyleOption = string | StyleSpecification;

type MapProps = {
  children?: ReactNode;
  styles?: {
    light?: MapStyleOption;
    dark?: MapStyleOption;
  };
  className?: string;
} & Omit<MapOptions, "container" | "style">;

const DefaultLoader = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-ivory/70">
    <div className="flex gap-1">
      <span className="size-1.5 animate-pulse rounded-full bg-navy/40" />
      <span className="size-1.5 animate-pulse rounded-full bg-navy/40 [animation-delay:150ms]" />
      <span className="size-1.5 animate-pulse rounded-full bg-navy/40 [animation-delay:300ms]" />
    </div>
  </div>
);

function Map({ children, styles, className, ...props }: MapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<MapLibreGL.Map | null>(null);
  const optionsRef = useRef(props);
  const styleRef = useRef(styles?.light ?? defaultStyles.light);

  useEffect(() => {
    if (!containerRef.current) return;

    const mapInstance = new MapLibreGL.Map({
      container: containerRef.current,
      style: styleRef.current,
      renderWorldCopies: false,
      attributionControl: {
        compact: true,
      },
      ...optionsRef.current,
    });

    const loadHandler = () => setMap(mapInstance);

    mapInstance.on("load", loadHandler);

    return () => {
      mapInstance.off("load", loadHandler);
      mapInstance.remove();
      queueMicrotask(() => setMap(null));
    };
  }, []);

  return (
    <MapContext.Provider
      value={{
        map,
        isLoaded: Boolean(map),
      }}
    >
      <div ref={containerRef} className={cn("relative h-full w-full", className)}>
        {!map && <DefaultLoader />}
        {map && children}
      </div>
    </MapContext.Provider>
  );
}

type MapMarkerProps = {
  longitude: number;
  latitude: number;
  children: ReactNode;
} & Omit<MarkerOptions, "element">;

function MapMarker({
  longitude,
  latitude,
  children,
  draggable = false,
  ...markerOptions
}: MapMarkerProps) {
  const { map, isLoaded } = useMap();
  const markerRef = useRef<MapLibreGL.Marker | null>(null);
  const [markerElement, setMarkerElement] = useState<HTMLDivElement | null>(null);
  const optionsRef = useRef(markerOptions);
  const draggableRef = useRef(draggable);

  useEffect(() => {
    if (!isLoaded || !map) return;

    const container = document.createElement("div");
    const marker = new MapLibreGL.Marker({
      ...optionsRef.current,
      element: container,
      draggable: draggableRef.current,
    })
      .setLngLat([longitude, latitude])
      .addTo(map);

    markerRef.current = marker;
    queueMicrotask(() => setMarkerElement(container));

    return () => {
      marker.remove();
      markerRef.current = null;
      queueMicrotask(() => setMarkerElement(null));
    };
  }, [map, isLoaded, longitude, latitude]);

  if (!markerElement) return null;

  return createPortal(children, markerElement);
}

type MapPopupProps = {
  longitude: number;
  latitude: number;
  onClose?: () => void;
  children: ReactNode;
  className?: string;
  closeButton?: boolean;
} & Omit<PopupOptions, "className">;

function MapPopup({
  longitude,
  latitude,
  onClose,
  children,
  className,
  closeButton = false,
  ...popupOptions
}: MapPopupProps) {
  const { map, isLoaded } = useMap();
  const popupRef = useRef<MapLibreGL.Popup | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const optionsRef = useRef(popupOptions);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    if (!isLoaded || !map) return;

    const popupContainer = document.createElement("div");
    const popup = new MapLibreGL.Popup({
      offset: 18,
      ...optionsRef.current,
      closeButton: false,
    })
      .setMaxWidth("none")
      .setDOMContent(popupContainer)
      .setLngLat([longitude, latitude])
      .addTo(map);

    const onCloseProp = () => onCloseRef.current?.();
    popup.on("close", onCloseProp);
    popupRef.current = popup;
    queueMicrotask(() => setContainer(popupContainer));

    return () => {
      popup.off("close", onCloseProp);
      popup.remove();
      popupRef.current = null;
      queueMicrotask(() => setContainer(null));
    };
  }, [isLoaded, map, longitude, latitude]);

  const handleClose = () => {
    popupRef.current?.remove();
    onCloseRef.current?.();
  };

  if (!container) return null;

  return createPortal(
    <div
      className={cn(
        "relative rounded-xl border border-navy/10 bg-white p-3 text-navy shadow-xl",
        className
      )}
    >
      {closeButton && (
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-1 top-1 rounded-sm opacity-60 transition-opacity hover:opacity-100"
          aria-label="Close popup"
        >
          <X className="h-4 w-4" />
        </button>
      )}
      {children}
    </div>,
    container
  );
}

type MapControlsProps = {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  showZoom?: boolean;
  showLocate?: boolean;
  showFullscreen?: boolean;
  className?: string;
};

const positionClasses = {
  "top-left": "top-2 left-2",
  "top-right": "top-2 right-2",
  "bottom-left": "bottom-2 left-2",
  "bottom-right": "bottom-8 right-2",
};

function ControlButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      type="button"
      className="flex size-8 items-center justify-center border-b border-navy/10 bg-white text-navy transition-colors last:border-b-0 hover:bg-ivory"
    >
      {children}
    </button>
  );
}

function MapControls({
  position = "bottom-right",
  showZoom = true,
  showLocate = false,
  showFullscreen = false,
  className,
}: MapControlsProps) {
  const { map, isLoaded } = useMap();

  const handleZoomIn = useCallback(() => {
    map?.zoomTo(map.getZoom() + 1, { duration: 300 });
  }, [map]);

  const handleZoomOut = useCallback(() => {
    map?.zoomTo(map.getZoom() - 1, { duration: 300 });
  }, [map]);

  const handleLocate = useCallback(() => {
    if (!("geolocation" in navigator)) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      map?.flyTo({
        center: [pos.coords.longitude, pos.coords.latitude],
        zoom: 14,
        duration: 1200,
      });
    });
  }, [map]);

  const handleFullscreen = useCallback(() => {
    const container = map?.getContainer();
    if (!container) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen();
    }
  }, [map]);

  if (!isLoaded) return null;

  return (
    <div
      className={cn(
        "absolute z-10 overflow-hidden rounded-md border border-navy/10 shadow-sm",
        positionClasses[position],
        className
      )}
    >
      {showZoom && (
        <>
          <ControlButton onClick={handleZoomIn} label="Zoom in">
            <Plus className="size-4" />
          </ControlButton>
          <ControlButton onClick={handleZoomOut} label="Zoom out">
            <Minus className="size-4" />
          </ControlButton>
        </>
      )}
      {showLocate && (
        <ControlButton onClick={handleLocate} label="Find my location">
          <Locate className="size-4" />
        </ControlButton>
      )}
      {showFullscreen && (
        <ControlButton onClick={handleFullscreen} label="Toggle fullscreen">
          <Maximize className="size-4" />
        </ControlButton>
      )}
    </div>
  );
}

export { Map, MapControls, MapMarker, MapPopup, useMap };
