import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function BusinessClass() {
  const [businessClass, setBusinessClass] = useState<string>("");

  const handleChange = (event: SelectChangeEvent) =>
    setBusinessClass(event.target.value as string);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="business-class">Business class</InputLabel>
        <Select
          labelId="business-class"
          id="business-class"
          value={businessClass}
          label="Business class"
          onChange={handleChange}
        >
          <MenuItem value="economy">Economy</MenuItem>
          <MenuItem value="business">Business</MenuItem>
          <MenuItem value="first-class">First class</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
