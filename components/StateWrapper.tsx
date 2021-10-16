import React, { useContext, useReducer } from "react";

import { Action, initialState, State, reducer } from "./reducer";

export interface IStateContext {
  state: State;
  dispatch: React.Dispatch<Action>;
}

export const StateContext = React.createContext<IStateContext | null>(null);

export const StateWrapper = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export const useFormState = (): Pick<IStateContext, "state" | "dispatch"> => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { state, dispatch } = useContext(StateContext)!;
  return { state, dispatch };
};
