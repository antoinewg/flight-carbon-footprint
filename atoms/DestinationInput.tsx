import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useAirports } from "../api/useAirports";
import { useDebounceValue } from "../hooks/useDebouncedValue";

interface DestinationInputProps {
  id: string;
  label: string;
}

export const DestinationInput = ({ label, id }: DestinationInputProps) => {
  const [text, setText] = useState<string>("");
  const debouncedQuery = useDebounceValue(text, 300);
  const airports = useAirports(debouncedQuery);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) =>
    setText(event.target.value);

  return (
    <Autocomplete
      disablePortal
      id={id}
      options={airports.map(({ iata, name }) => ({ label: `${iata} ${name}` }))}
      sx={{ width: 260 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          onChange={handleChange}
          placeholder="City or airport..."
        />
      )}
    />
  );
};
