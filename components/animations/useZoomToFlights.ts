import { Map } from "mapbox-gl";
import { bbox, multiLineString } from "@turf/turf";
import { useEffect } from "react";
import { Airport } from "@api/useAirports";
import { useFormState } from "../StateWrapper";

interface CompletedFlight {
  from: Airport;
  to: Airport;
}

export const useZoomToFlights = (map: Map | null) => {
  const { state } = useFormState();

  const completedFlights = state.flights.filter(
    ({ from, to }) => from && to
  ) as CompletedFlight[];

  useEffect(() => {
    if (!map || completedFlights.length === 0) return;
    const box = bbox(
      multiLineString(
        completedFlights.map(({ from, to }) => [
          [from.location.lon, from.location.lat],
          [to.location.lon, to.location.lat],
        ])
      )
    );

    map.fitBounds(
      [
        [box[0], box[1]],
        [box[2], box[3]],
      ],
      { padding: 100 }
    );
  }, [map, completedFlights]);
};
