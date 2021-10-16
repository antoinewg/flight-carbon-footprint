import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useFormState } from "@components/StateWrapper";
import { BusinessClass } from "@components/reducer";

export default function BusinessClassSection() {
  const { state, dispatch } = useFormState();

  const handleChange = (event: SelectChangeEvent) =>
    dispatch({
      type: "SELECT_BUSINESS_CLASS",
      payload: event.target.value as BusinessClass,
    });

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="business-class">Business class</InputLabel>
        <Select
          labelId="business-class"
          id="business-class"
          value={state.businessClass ?? ""}
          label="Business class"
          onChange={handleChange}
        >
          <MenuItem value={BusinessClass.economy}>Economy</MenuItem>
          <MenuItem value={BusinessClass.business}>Business</MenuItem>
          <MenuItem value={BusinessClass.firstclass}>First class</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
