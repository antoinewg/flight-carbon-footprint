import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { useFormState } from "@components/StateWrapper";
import { TravelType } from "@components/reducer";

export const TripTypeSection = () => {
  const { state, dispatch } = useFormState();

  const select = (payload: TravelType) =>
    dispatch({ type: "SELECT_TRAVEL_TYPE", payload });

  return (
    <RadioGroup value={state.travelType} row>
      <FormControlLabel
        value={TravelType.roundtrip}
        control={<Radio size="small" />}
        label="Roundtrip"
        onChange={() => select(TravelType.roundtrip)}
      />
      <FormControlLabel
        value={TravelType.oneway}
        control={<Radio size="small" />}
        label="One way"
        onChange={() => select(TravelType.oneway)}
      />
      <FormControlLabel
        value={TravelType.multicity}
        control={<Radio size="small" />}
        label="Multi city"
        onChange={() => select(TravelType.multicity)}
      />
    </RadioGroup>
  );
};
