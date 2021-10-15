import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { indigo } from "@mui/material/colors";
import { SelectInput } from "../atoms/SelectInput";
import { DestinationInput } from "../atoms/DestinationInput";

const sx = { color: indigo[400], "&.Mui-checked": { color: indigo[400] } };

export const SideBar = () => {
  return (
    <div className="absolute m-6 p-6 z-10 bg-white w-1/3 rounded-lg border-2 border-indigo-600 border-opacity-50">
      {/* Roundtrip / One-way / Multi-city */}
      <div className="flex gap-8 mt-2 mb-10 flex-col md:flex-row center">
        <RadioGroup defaultValue="roundtrip" row name="trip-type-radio-buttons">
          <FormControlLabel
            value="roundtrip"
            control={<Radio sx={sx} size="small" />}
            label="Roundtrip"
          />
          <FormControlLabel
            value="oneway"
            control={<Radio sx={sx} size="small" />}
            label="One way"
          />
          <FormControlLabel
            value="multicity"
            control={<Radio sx={sx} size="small" />}
            label="Multi city"
          />
        </RadioGroup>
      </div>

      {/* From* / To* */}
      <div className="flex gap-6 mb-4 flex-col md:flex-row center">
        <DestinationInput id="departure" placeholder="From..." label="From" />
        <DestinationInput id="arrival" placeholder="To..." label="To" />
      </div>

      {/* From* / To* if multi-city */}
      {/* Add another flight if multi-city */}
      <div className="flex gap-6 mb-10 flex-col md:flex-row center">
        <DestinationInput id="departure" placeholder="From..." label="From" />
        <DestinationInput id="arrival" placeholder="To..." label="To" />
      </div>

      {/* Economy/Business/First class */}

      <div className="mb-10 w-4/6">
        <SelectInput
          id="businessclass"
          label="Class"
          options={["Economy", "Business", "First class"]}
        />
      </div>
    </div>
  );
};
