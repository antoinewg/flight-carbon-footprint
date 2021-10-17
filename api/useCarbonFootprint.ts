import { Airport } from "./useAirports";
import {
  AVERAGE_AIRCRAFT_SPEED,
  CO2_CONSUMPTION_PER_PAX_PER_HOUR_OF_FLIGHT,
} from "./constants";
import { distance, point } from "@turf/turf";
import { useFormState } from "@components/StateWrapper";
import { TravelType } from "@components/reducer";
import { useEffect } from "react";
import { logAnalyticsEvent } from "@utils/firebase";

interface Flight {
  from: Airport;
  to: Airport;
}

export const useCarbonFootprint = (flights: Flight[]): number => {
  const { state } = useFormState();
  const isReturn = state.travelType === TravelType.roundtrip;

  let hoursFlying: number = 0;

  flights.forEach(({ from, to }) => {
    const distanceKm = distance(
      point([from.location.lon, from.location.lat]),
      point([to.location.lon, to.location.lat]),
      { units: "kilometers" }
    );
    hoursFlying += distanceKm / AVERAGE_AIRCRAFT_SPEED;
    if (isReturn) hoursFlying *= 2;
  });

  const carbonFootprint =
    hoursFlying * CO2_CONSUMPTION_PER_PAX_PER_HOUR_OF_FLIGHT;

  useEffect(() => {
    if (flights.length === 0) return;

    logAnalyticsEvent("carbon_footprint", {
      hoursFlying,
      isReturn,
      kg: Math.round(carbonFootprint),
      flights: JSON.stringify(
        flights.map(({ from, to }) => ({
          from: from.iata,
          to: to.iata,
        }))
      ),
    });
  }, [flights.length, carbonFootprint]);

  return carbonFootprint;
};
