import React from "react";
import Paper from "@mui/material/Paper";

import BusinessClassSection from "../atoms/BusinessClassSection";
import { TripTypeSection } from "../atoms/TripTypeSection";
import { DestinationsSection } from "../atoms/DestinationsSection";

export const SideBar = () => {
  return (
    <Paper
      variant="elevation"
      sx={{ position: "absolute", zIndex: 2, padding: 4, margin: 4 }}
      elevation={8}
    >
      <TripTypeSection />
      <br />
      <DestinationsSection />
      <br />
      <BusinessClassSection />
    </Paper>
  );
};
