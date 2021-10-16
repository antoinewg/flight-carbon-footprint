import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { along, bearing, point, length } from "@turf/turf";
import { FeatureCollection, LineString, Point } from "@turf/helpers";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string;

// San Francisco
const origin = [-122.414, 37.776];

// Washington DC
const destination = [-77.032, 38.913];

// A simple line from origin to destination.
const route: FeatureCollection<LineString, {}> = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "LineString", coordinates: [origin, destination] },
      properties: {},
    },
  ],
};

// A single point that animates along the route.
// Coordinates are initially set to origin.
const plane: FeatureCollection<Point, Record<string, unknown>> = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: { type: "Point", coordinates: origin },
    },
  ],
};

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

    const lineDistance = length(route.features[0]);
    const arc = [];
    const steps = 250;

    for (let i = 0; i < lineDistance; i += lineDistance / steps) {
      const segment = along(route.features[0], i);
      arc.push(segment.geometry.coordinates);
    }

    route.features[0].geometry.coordinates = arc;

    let counter = 0;

    map.current?.on("load", () => {
      map.current?.addSource("route", { type: "geojson", data: route });
      map.current?.addSource("plane", { type: "geojson", data: plane });

      map.current?.addLayer({
        id: "route",
        source: "route",
        type: "line",
        paint: { "line-width": 2, "line-color": "#007cbf" },
      });

      map.current?.addLayer({
        id: "plane",
        source: "plane",
        type: "symbol",
        layout: {
          "icon-image": "airport-15",
          "icon-rotate": ["get", "bearing"],
          "icon-rotation-alignment": "map",
          "icon-allow-overlap": true,
          "icon-ignore-placement": true,
        },
      });

      function animate() {
        const start =
          route.features[0].geometry.coordinates[
            counter >= steps ? counter - 1 : counter
          ];
        const end =
          route.features[0].geometry.coordinates[
            counter >= steps ? counter : counter + 1
          ];
        if (!start || !end) return;

        plane.features[0].geometry.coordinates =
          route.features[0].geometry.coordinates[counter];

        plane.features[0].properties.bearing = bearing(
          point(start),
          point(end)
        );

        (map.current?.getSource("plane") as any).setData(plane);

        if (counter < steps) requestAnimationFrame(animate);

        counter = counter + 1;
      }

      animate();
    });

    return () => map.current?.remove();
  }, []);

  return <div ref={mapContainerRef} style={mapStyle} />;
};

const mapStyle = { height: "100vh", width: "100vw" };
