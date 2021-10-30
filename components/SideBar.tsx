import React from "react";
import Paper from "@mui/material/Paper";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { TripTypeSection } from "@atoms/TripTypeSection";
import { DestinationsSection } from "@atoms/DestinationsSection";
import { CarbonFootprintSection } from "@atoms/CarbonFootprintSection";

export const SideBar = () => {
  const [expanded, setExpanded] = React.useState<boolean>(true);
  const onChange = () => setExpanded((p) => !p);

  return (
    <Paper
      variant="elevation"
      sx={{ position: "absolute", zIndex: 2, margin: 2, minWidth: "33%" }}
      elevation={4}
    >
      <Accordion expanded={expanded} onChange={onChange}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color="primary">Your flights</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TripTypeSection />
          <DestinationsSection />
          <CarbonFootprintSection />
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};
