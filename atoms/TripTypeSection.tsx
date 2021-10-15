import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export const TripTypeSection = () => {
  return (
    <RadioGroup defaultValue="roundtrip" row name="trip-type-radio-buttons">
      <FormControlLabel
        value="roundtrip"
        control={<Radio size="small" />}
        label="Roundtrip"
      />
      <FormControlLabel
        value="oneway"
        control={<Radio size="small" />}
        label="One way"
      />
      <FormControlLabel
        value="multicity"
        control={<Radio size="small" />}
        label="Multi city"
      />
    </RadioGroup>
  );
};
