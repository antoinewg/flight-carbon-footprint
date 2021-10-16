import { Airport } from "@api/useAirports";

export enum BusinessClass {
  economy = "economy",
  business = "business",
  firstclass = "firstclass",
}

export enum TravelType {
  roundtrip = "roundtrip",
  oneway = "oneway",
  multicity = "multicity",
}

interface Flight {
  from: Airport | null;
  to: Airport | null;
}

export interface State {
  businessClass?: BusinessClass;
  flights: Array<Flight>;
  travelType: TravelType;
}

export const initialState: State = {
  travelType: TravelType.roundtrip,
  flights: [{ from: null, to: null }],
};

export type Action =
  | { type: "INIT" }
  | { type: "SELECT_TRAVEL_TYPE"; payload: TravelType }
  | { type: "SELECT_BUSINESS_CLASS"; payload: BusinessClass }
  | { type: "ADD_NEW_FLIGHT" }
  | { type: "REMOVE_FLIGHTS_INDEX"; payload: number }
  | {
      type: "SELECT_AIRPORT_FROM";
      payload: { airport: Airport; index: number };
    }
  | { type: "SELECT_AIRPORT_TO"; payload: { airport: Airport; index: number } };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "INIT":
      return initialState;
    case "SELECT_TRAVEL_TYPE":
      return {
        ...state,
        travelType: action.payload,
        flights:
          action.payload === TravelType.multicity
            ? [...state.flights, { from: null, to: null }]
            : state.flights.slice(0, 1),
      };
    case "SELECT_BUSINESS_CLASS":
      return { ...state, businessClass: action.payload };
    case "ADD_NEW_FLIGHT":
      return {
        ...state,
        flights: [...state.flights, { from: null, to: null }],
      };
    case "SELECT_AIRPORT_FROM":
      return {
        ...state,
        flights: state.flights.map((flight, index) =>
          action.payload.index === index
            ? { ...flight, from: action.payload.airport }
            : flight
        ),
      };
    case "SELECT_AIRPORT_TO":
      return {
        ...state,
        flights: state.flights.map((flight, index) => {
          if (action.payload.index === index) {
            return { ...flight, to: action.payload.airport };
          }
          if (
            action.payload.index + 1 === index &&
            state.travelType === TravelType.multicity &&
            !flight.from
          ) {
            return { ...flight, from: action.payload.airport };
          }
          return flight;
        }),
      };
    case "REMOVE_FLIGHTS_INDEX":
      return {
        ...state,
        flights: state.flights.filter((_, index) => action.payload !== index),
      };
    default:
      return state;
  }
};
