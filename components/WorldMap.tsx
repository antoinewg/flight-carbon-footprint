import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string;

export const WorldMap = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [lng, setLng] = useState<number>(4);
  const [lat, setLat] = useState<number>(50);
  const [zoom, setZoom] = useState<number>(2);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef?.current as HTMLElement,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    map.on("move", () => {
      setLng(map.getCenter().lng);
      setLat(map.getCenter().lat);
      setZoom(map.getZoom());
    });

    return () => map.remove();
  }, []);

  return <div ref={mapContainerRef} className="h-screen w-screen" />;
};
