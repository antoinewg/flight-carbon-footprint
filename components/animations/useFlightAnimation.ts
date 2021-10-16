import { useEffect } from "react";
import { Map } from "mapbox-gl";
import { along, bearing, point, length } from "@turf/turf";
import { FeatureCollection, LineString, Point } from "@turf/helpers";
import { Airport } from "@api/useAirports";
import { useFormState } from "../StateWrapper";

interface CompleteFlight {
  from: Airport;
  to: Airport;
}

type Route = FeatureCollection<LineString, {}>;
type Plane = FeatureCollection<Point, Record<string, unknown>>;

const steps = 200;

const PLANE_SOURCE_ID = "plane";
const PLANE_LAYER_ID = "plane";
const ROUTE_SOURCE_ID = "route";
const ROUTE_LAYER_ID = "route";

export const useFlightAnimation = (map: Map | null) => {
  const { plane, route } = usePlaneRoute();
  useInitSourceAndLayers(route, plane, map);
  useAnimatePlane(route, plane, map);
};

const usePlaneRoute = (): { plane: Plane | null; route: Route | null } => {
  const { state } = useFormState();

  const completeFlights = state.flights.filter(
    ({ from, to }) => from && to
  ) as CompleteFlight[];

  if (completeFlights.length === 0) return { route: null, plane: null };

  const route: Route = {
    type: "FeatureCollection",
    features: completeFlights.map(({ from, to }) => ({
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [from.location.lon, from.location.lat],
          [to.location.lon, to.location.lat],
        ],
      },
      properties: {},
    })),
  };

  const plane: Plane = {
    type: "FeatureCollection",
    features: completeFlights.map(({ from }) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [from.location.lon, from.location.lat],
      },
      properties: {},
    })),
  };

  route.features.forEach((feature, index) => {
    const lineDistance = length(feature);

    const arc = [];
    for (let i = 0; i < lineDistance; i += lineDistance / steps) {
      const segment = along(feature, i);
      arc.push(segment.geometry.coordinates);
    }

    route.features[index].geometry.coordinates = arc;
  });

  return { plane, route };
};

const useInitSourceAndLayers = (
  route: Route | null,
  plane: Plane | null,
  map: Map | null
) => {
  useEffect(() => {
    if (!map || !plane || !route) return;
    if (map.getLayer(ROUTE_LAYER_ID)) map.removeLayer(ROUTE_LAYER_ID);
    if (map.getLayer(PLANE_LAYER_ID)) map.removeLayer(PLANE_LAYER_ID);
    if (map.getSource(ROUTE_SOURCE_ID)) map.removeSource(ROUTE_SOURCE_ID);
    if (map.getSource(PLANE_SOURCE_ID)) map.removeSource(PLANE_SOURCE_ID);

    map.addSource(ROUTE_SOURCE_ID, { type: "geojson", data: route });
    map.addLayer({
      id: ROUTE_LAYER_ID,
      source: ROUTE_SOURCE_ID,
      type: "line",
      paint: { "line-width": 2, "line-color": "#007cbf" },
    });

    map.addSource(PLANE_SOURCE_ID, { type: "geojson", data: plane });
    map.addLayer({
      id: PLANE_LAYER_ID,
      source: PLANE_SOURCE_ID,
      type: "symbol",
      layout: {
        "icon-image": "airport-15",
        "icon-rotate": ["get", "bearing"],
        "icon-rotation-alignment": "map",
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,
      },
    });

    return () => {
      if (map?.getLayer(ROUTE_LAYER_ID)) map.removeLayer(ROUTE_LAYER_ID);
      if (map?.getLayer(PLANE_LAYER_ID)) map.removeLayer(PLANE_LAYER_ID);
      if (map?.getSource(ROUTE_SOURCE_ID)) map.removeSource(ROUTE_SOURCE_ID);
      if (map?.getSource(PLANE_SOURCE_ID)) map.removeSource(PLANE_SOURCE_ID);
    };
  }, [route, plane, map]);
};

const useAnimatePlane = (
  route: Route | null,
  plane: Plane | null,
  map: Map | null
) => {
  useEffect(() => {
    if (!map || !plane || !route) return;
    const animatedPlane = { ...plane };
    const { features } = route;

    let step = 0;
    const intervalId = setInterval(() => {
      features.forEach(({ geometry }, index) => {
        const { coordinates } = geometry;
        const start = coordinates[step >= steps ? step - 1 : step];
        const end = coordinates[step >= steps ? step : step + 1];
        if (!start || !end) {
          step = (step + 1) % steps;
          return;
        }

        animatedPlane.features[index].geometry.coordinates = coordinates[step];

        animatedPlane.features[index].properties.bearing = bearing(
          point(start),
          point(end)
        );
      });

      const planeSource = map.getSource(PLANE_SOURCE_ID);
      if (planeSource && "setData" in planeSource) {
        planeSource.setData(animatedPlane);
      }

      step = (step + 1) % steps;
    }, 50);

    return () => clearInterval(intervalId);
  }, [plane, route, map]);
};
