import { Airport } from "@api/useAirports";
import { Action, initialState, reducer, State, TravelType } from "../reducer";

const CDG: Airport = {
  countryCode: "FR",
  iata: "CDG",
  icao: "LFPG",
  location: { lat: 49.0128, lon: 2.549999 },
  municipalityName: "Paris",
  name: "Paris, Charles de Gaulle",
  shortName: "Charles de Gaulle",
};

const LHR: Airport = {
  countryCode: "GB",
  iata: "LHR",
  icao: "EGLL",
  location: { lat: 51.4706, lon: -0.461941 },
  municipalityName: "London",
  name: "London, London Heathrow",
  shortName: "Heathrow",
};

describe("Search reducer", () => {
  const state = initialState;
  const multiFlightsState = {
    ...initialState,
    travelType: TravelType.multicity,
    flights: [
      { from: null, to: null },
      { from: null, to: null },
    ],
  };

  it("should handle INIT", () => {
    let searchState = {} as State;
    expect(reducer(searchState, { type: "INIT" })).toStrictEqual(initialState);
  });

  it("should handle SELECT_TRAVEL_TYPE - roundtrip", () => {
    const action: Action = {
      type: "SELECT_TRAVEL_TYPE",
      payload: TravelType.roundtrip,
    };
    expect(reducer(multiFlightsState, action)).toStrictEqual({
      ...initialState,
      travelType: TravelType.roundtrip,
    });
  });

  it("should handle SELECT_TRAVEL_TYPE - oneway", () => {
    const action: Action = {
      type: "SELECT_TRAVEL_TYPE",
      payload: TravelType.oneway,
    };
    expect(reducer(multiFlightsState, action)).toStrictEqual({
      ...initialState,
      travelType: TravelType.oneway,
    });
  });

  it("should handle SELECT_TRAVEL_TYPE - multicity", () => {
    const action: Action = {
      type: "SELECT_TRAVEL_TYPE",
      payload: TravelType.multicity,
    };
    expect(reducer(state, action)).toStrictEqual({
      travelType: TravelType.multicity,
      flights: [
        { from: null, to: null },
        { from: null, to: null }, // Adds a flight
      ],
    });
  });

  it("should handle ADD_NEW_FLIGHT", () => {
    const action: Action = { type: "ADD_NEW_FLIGHT" };
    const newState = reducer(state, action);
    expect(newState).toStrictEqual({
      ...initialState,
      flights: [
        { from: null, to: null },
        { from: null, to: null }, // Adds a flight
      ],
    });
    expect(reducer(newState, action)).toStrictEqual({
      ...initialState,
      flights: [
        { from: null, to: null },
        { from: null, to: null },
        { from: null, to: null }, // Adds a flight
      ],
    });
  });

  it("should handle REMOVE_FLIGHTS_INDEX", () => {
    const action: Action = { type: "REMOVE_FLIGHTS_INDEX", payload: 1 };
    const startState = {
      ...initialState,
      flights: [
        { from: CDG, to: LHR },
        { from: LHR, to: CDG },
        { from: null, to: CDG },
      ],
    };
    const newState = reducer(startState, action);
    expect(newState).toStrictEqual({
      ...initialState,
      flights: [
        { from: CDG, to: LHR },
        { from: null, to: CDG },
      ],
    });
  });

  it("should handle SELECT_AIRPORT_FROM", () => {
    const action: Action = {
      type: "SELECT_AIRPORT_FROM",
      payload: { airport: CDG, index: 0 },
    };
    expect(reducer(state, action)).toStrictEqual({
      ...initialState,
      flights: [{ from: CDG, to: null }],
    });
  });

  it("should handle SELECT_AIRPORT_TO", () => {
    const action: Action = {
      type: "SELECT_AIRPORT_TO",
      payload: { airport: CDG, index: 0 },
    };
    expect(reducer(state, action)).toStrictEqual({
      ...initialState,
      flights: [{ from: null, to: CDG }],
    });
  });

  it("should handle SELECT_AIRPORT_TO - multicity", () => {
    const action: Action = {
      type: "SELECT_AIRPORT_TO",
      payload: { airport: CDG, index: 0 },
    };
    expect(reducer(multiFlightsState, action)).toStrictEqual({
      ...multiFlightsState,
      flights: [
        { from: null, to: CDG },
        { from: CDG, to: null }, // also selects the next starting airport
      ],
    });
  });
});
