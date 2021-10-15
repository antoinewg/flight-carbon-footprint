import React from "react";
import Box from "@mui/material/Box";
import SwapHoriz from "@mui/icons-material/SwapHoriz";
import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";
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

      <Box sx={{ flex: 0 }}>
        {state.travelType === TravelType.roundtrip ? (
          <IconButton aria-label="swap" onClick={handleSwap}>
            <SwapHoriz color="primary" fontSize="large" />
          </IconButton>
        ) : (
          <IconButton aria-label="swap" disabled>
            <ArrowRightAlt color="primary" fontSize="large" />
          </IconButton>
        )}
      </Box>

      <Box sx={flex6}>
        <DestinationInput id="to" label="To" />
      </Box>
    </Box>
  );
};

const flex6 = { flex: 6 };
