import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Airport, useAirports } from "@api/useAirports";
import { useDebounceValue } from "@hooks/useDebouncedValue";

interface DestinationInputProps {
  id: string;
  label: string;
  value: Airport | null;
  onSelect: (data: Airport) => void;
}

export const DestinationInput = ({
  label,
  id,
  value,
  onSelect,
}: DestinationInputProps) => {
  const [text, setText] = useState<string>("");
  const debouncedQuery = useDebounceValue(text, 300);
  const airports = useAirports(debouncedQuery);

  return (
    <Autocomplete
      disablePortal
      id={id}
      options={airports}
      value={value}
      onChange={(_, airport) => airport && onSelect(airport)}
      onInputChange={(_, newInputValue) => setText(newInputValue)}
      getOptionLabel={(airport) => `${airport.iata} ${airport.name}`}
      isOptionEqualToValue={(option, value) => option.iata === value.iata}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder="City or airport..." />
      )}
    />
  );
};
