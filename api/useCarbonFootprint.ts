import { Airport } from "./useAirports";
import {
  AVERAGE_AIRCRAFT_SPEED,
  CO2_CONSUMPTION_PER_PAX_PER_HOUR_OF_FLIGHT,
} from "./constants";
import { distance, point } from "@turf/turf";

interface Flight {
  from: Airport;
  to: Airport;
}

// No need to be a hook but we were supposed to use an endpoint at first.
export const useCarbonFootprint = (flights: Flight[]): number => {
  let hoursFlying: number = 0;

  flights.forEach(({ from, to }) => {
    const distanceKm = distance(
      point([from.location.lon, from.location.lat]),
      point([to.location.lon, to.location.lat]),
      { units: "kilometers" }
    );
    hoursFlying += distanceKm / AVERAGE_AIRCRAFT_SPEED;
  });

  return hoursFlying * CO2_CONSUMPTION_PER_PAX_PER_HOUR_OF_FLIGHT;
};
