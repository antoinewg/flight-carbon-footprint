import React from "react";
import Box from "@mui/material/Box";
import SwapHoriz from "@mui/icons-material/SwapHoriz";
import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";
import Clear from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";

import { DestinationInput } from "./DestinationInput";
import { useFormState } from "../components/StateWrapper";
import { TravelType } from "../components/reducer";

export const DestinationsSection = () => {
  const { state } = useFormState();

  console.log(state.travelType);

  const handleSwap = () => {
    console.log("swapping");
  };
  const handleClear = () => {
    console.log("clearing");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={flex6}>
        <DestinationInput id="from" label="From" />
      </Box>

      <Box sx={flex0}>
        {state.travelType === TravelType.roundtrip ? (
          <IconButton aria-label="swap" onClick={handleSwap}>
            <SwapHoriz color="primary" fontSize="large" />
          </IconButton>
        ) : (
          <IconButton aria-label="forward" disabled>
            <ArrowRightAlt color="primary" fontSize="large" />
          </IconButton>
        )}
      </Box>

      <Box sx={flex6}>
        <DestinationInput id="to" label="To" />
      </Box>

      {state.travelType === TravelType.multicity ? (
        <Box sx={flex0}>
          <IconButton aria-label="clear" onClick={handleClear}>
            <Clear color="primary" fontSize="large" />
          </IconButton>
        </Box>
      ) : null}
    </Box>
  );
};

const flex0 = { flex: 0 };
const flex6 = { flex: 6 };
