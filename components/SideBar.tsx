import React from "react";
import Paper from "@mui/material/Paper";

import BusinessClassSection from "@atoms/BusinessClassSection";
import { TripTypeSection } from "@atoms/TripTypeSection";
import { DestinationsSection } from "@atoms/DestinationsSection";
import { CarbonFootprintSection } from "@atoms/CarbonFootprintSection";
import { FAQSection } from "@atoms/FAQSection";

export const SideBar = () => {
  return (
    <>
      <Paper
        variant="elevation"
        sx={{
          position: "absolute",
          zIndex: 2,
          padding: 2,
          margin: 3,
          minWidth: "33%",
        }}
        elevation={8}
      >
        <TripTypeSection />
        <DestinationsSection />
        <br />
        <br />
        <BusinessClassSection />
        <CarbonFootprintSection />
      </Paper>
      <FAQSection />
    </>
  );
};
