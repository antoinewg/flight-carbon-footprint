import { Airport } from "../api/useAirports";

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
  from: Airport;
  to: Airport;
}

export interface State {
  businessClass?: BusinessClass;
  flights: Flight[];
  travelType: TravelType;
}

export const initialState: State = {
  travelType: TravelType.roundtrip,
  flights: [],
};

export type Action =
  | { type: "INIT" }
  | { type: "SELECT_TRAVEL_TYPE"; payload: TravelType };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "INIT":
      return initialState;
    case "SELECT_TRAVEL_TYPE":
      return { ...state, travelType: action.payload };
    default:
      return state;
  }
};
