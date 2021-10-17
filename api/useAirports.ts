import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { logAnalyticsEvent } from "@utils/firebase";

export interface Airport {
  icao: string;
  iata: string;
  name: string;
  shortName: string;
  municipalityName: string;
  location: {
    lat: number;
    lon: number;
  };
  countryCode: string;
}

const headers = {
  "x-rapidapi-host": "aerodatabox.p.rapidapi.com",
  "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY as string,
};

export const useAirports = (query: string): Airport[] => {
  const [airports, setAirports] = useState<Airport[]>([]);

  const getAirports = useCallback(async (q: string) => {
    if (!q || q.length < 3) return;
    try {
      logAnalyticsEvent("airport_search", { query: q });
      const response = await axios.get<{ items: Airport[] }>(
        "https://aerodatabox.p.rapidapi.com/airports/search/term",
        { params: { q, limit: "10" }, headers }
      );
      setAirports(response.data.items);
    } catch {}
  }, []);

  useEffect(() => {
    getAirports(query);
  }, [query, getAirports]);

  return airports;
};
