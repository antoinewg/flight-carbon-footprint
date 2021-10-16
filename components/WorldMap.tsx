import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { useFlightAnimation } from "./animations/useFlightAnimation";
import { useZoomToFlights } from "./animations/useZoomToFlights";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string;

export const WorldMap = () => {
  const map = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainerRef?.current as HTMLElement,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-96, 37.8],
      zoom: 3,
    });

    return () => map.current?.remove();
  }, []);

  useFlightAnimation(map.current);
  useZoomToFlights(map.current);

  return <div ref={mapContainerRef} style={mapStyle} />;
};

const mapStyle = { height: "100vh", width: "100vw" };
