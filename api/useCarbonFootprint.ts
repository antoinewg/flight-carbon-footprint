import { Airport } from "./useAirports";
import { useFormState } from "@components/StateWrapper";
import { TravelType } from "@components/reducer";
import { useCallback, useEffect, useState } from "react";
import { logAnalyticsEvent } from "@utils/firebase";
import axios from "axios";

interface Flight {
  from: Airport;
  to: Airport;
}

const headers = {
  "Authorization": `Bearer ${process.env.NEXT_PUBLIC_CLIMATIQ_KEY}`,
};

interface Leg {
  from: string;
  to: string;
  passengers: number;
  class: "first" | "economy"
}

interface CarbonFootprintResponse {
  co2e: number,
  co2e_unit: "kg",
  legs: LegFootprint[]
}

interface LegFootprint {
  co2e: number;
  co2e_unit: "kg";
  co2e_calculation_method: "ar4";
  co2e_calculation_origin: "source";
  emission_factor: {
      id: "passenger_flight-route_type_domestic-aircraft_type_na-distance_na-class_na-rf_na";
      source: "UBA";
      year: "2020";
      region: "DE";
      category: "Air Travel";
      lca_activity: "upstream-fuel_combustion";
      data_quality_flags: []
  };
  constituent_gases: {
      co2e_total: number;
      co2e_other: null;
      co2: null;
      ch4: null;
      n2o: null
  }
}

const getLegs = (flights: Flight[], isReturn: boolean): Leg[] => {
  if (flights.length === 0) return [];
  if (isReturn) {
    return [
      {
        from: flights[0].from.iata,
        to: flights[0].to.iata,
        passengers: 1,
        class: "economy"
      },
      {
        from: flights[0].to.iata,
        to: flights[0].from.iata,
        passengers: 1,
        class: "economy"
      }
    ]
  }

  return flights.map(flight => ({
    from: flight.from.iata,
    to: flight.to.iata,
    passengers: 1,
    class: "economy"
  }))
}

export const useCarbonFootprint = (flights: Flight[]): number => {
  const [footprint, setFootprint] = useState<number>(0);
  const { state } = useFormState();
  const isReturn = state.travelType === TravelType.roundtrip
  const legs: Leg[] = getLegs(flights, isReturn)

  const getFootprint = useCallback(async (legs: Leg[]) => {
    if (legs.length === 0) return;
    try {
      const response = await axios.post<CarbonFootprintResponse>(
        "https://beta3.api.climatiq.io/travel/flights",
        { legs },
        { headers }
      );
      setFootprint(response.data.co2e);
      logAnalyticsEvent("carbon_footprint", {
        isReturn,
        kg: Math.round(response.data.co2e),
        flights: JSON.stringify(
          flights.map(({ from, to }) => ({
            from: from.iata,
            to: to.iata,
          }))
        ),
      });
    } catch {}
  }, []);

  useEffect(() => {
    getFootprint(legs);
  }, [legs, getFootprint]);

  return footprint;
};
