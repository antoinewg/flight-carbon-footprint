import React from "react";
import Box from "@mui/material/Box";
import SwapHoriz from "@mui/icons-material/SwapHoriz";
import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";
import Clear from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Add from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";

import { DestinationInput } from "./DestinationInput";
import { useFormState } from "../components/StateWrapper";
import { TravelType } from "../components/reducer";

export const DestinationsSection = () => {
  const { state, dispatch } = useFormState();

  const handleClear = (index: number) =>
    dispatch({ type: "REMOVE_FLIGHTS_INDEX", payload: index });

  const MiddleIcon =
    state.travelType === TravelType.roundtrip ? SwapHoriz : ArrowRightAlt;

  const isMultiCity = state.travelType === TravelType.multicity;
  const disabled = state.flights.length < 2;

  return (
    <Stack spacing={2}>
      {state.flights.map((flight, index) => (
        <Box
          key={index.toString()}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          <Box sx={flex6}>
            <DestinationInput
              id={`from-${index}`}
              label="From"
              value={flight.from}
              onSelect={(data) =>
                dispatch({
                  type: "SELECT_AIRPORT_FROM",
                  payload: { airport: data, index },
                })
              }
            />
          </Box>

          <Box sx={flex0}>
            <IconButton disabled size="medium">
              <MiddleIcon color="primary" fontSize="medium" />
            </IconButton>
          </Box>

          <Box sx={flex6}>
            <DestinationInput
              id={`to-${index}`}
              label="To"
              value={flight.to}
              onSelect={(data) =>
                dispatch({
                  type: "SELECT_AIRPORT_TO",
                  payload: { airport: data, index },
                })
              }
            />
          </Box>

          {state.travelType === TravelType.multicity && !disabled ? (
            <Box sx={flex0}>
              <IconButton
                aria-label="clear"
                onClick={() => handleClear(index)}
                edge="end"
                size="medium"
              >
                <Clear color="primary" fontSize="medium" />
              </IconButton>
            </Box>
          ) : null}
        </Box>
      ))}

      {isMultiCity ? (
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={() => dispatch({ type: "ADD_NEW_FLIGHT" })}
        >
          new flight
        </Button>
      ) : null}
    </Stack>
  );
};

const flex0 = { flex: 0 };
const flex6 = { flex: 6 };
