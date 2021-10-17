import React, { useEffect } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import GaugeChart from "react-gauge-chart";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { Airport } from "@api/useAirports";
import { useFormState } from "@components/StateWrapper";
import { useTheme } from "@mui/material";
import { useCarbonFootprint } from "@api/useCarbonFootprint";
import { RECOMMENDED_MAXIMUM_CARBON_FOOTPRINT } from "@api/constants";

interface CompletedFlight {
  from: Airport;
  to: Airport;
}

export const CarbonFootprintSection = () => {
  const { state } = useFormState();
  const theme = useTheme();

  const completedFlights = state.flights.filter(
    ({ from, to }) => from && to
  ) as CompletedFlight[];

  const carbonFootprint = useCarbonFootprint(completedFlights);

  if (completedFlights.length === 0) return <></>;

  const percent = carbonFootprint / RECOMMENDED_MAXIMUM_CARBON_FOOTPRINT;

  return (
    <div style={{ marginTop: 32 }}>
      <GaugeChart
        id="gauge-chart"
        nrOfLevels={20}
        percent={Math.min(1, percent)}
        textColor={theme.palette.primary.main}
        formatTextValue={formatTextValue(percent)}
      />
      <Alert variant="outlined" severity="info">
        Your estimated carbon footprint due to flights is{" "}
        {Math.round(100 * carbonFootprint) / 100}kg of CO&sup2;.
      </Alert>
      <br />
      <Disclaimer />
    </div>
  );
};

const formatTextValue =
  (percent: number) =>
  (_: string): string =>
    `${Math.round(percent * 100)} %`;

const Disclaimer = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <Collapse in={open}>
      <Alert
        action={
          <IconButton
            aria-label="close"
            size="small"
            onClick={() => setOpen(false)}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        variant="outlined"
        severity="info"
      >
        <AlertTitle>Disclaimer</AlertTitle>
        This carbon footprint is an estimate (see FAQ) and is not complete.
        <br />
        Please checkout a more detailed carbon footprint calculator.
      </Alert>
    </Collapse>
  );
};
