import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { DestinationInput } from "./DestinationInput";

export const DestinationsSection = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <DestinationInput id="from" label="From" />
        </Grid>

        <Grid item xs={6}>
          <DestinationInput id="to" label="To" />
        </Grid>
      </Grid>
    </Box>
  );
};
