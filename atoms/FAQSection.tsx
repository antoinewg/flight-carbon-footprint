import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Paper from "@mui/material/Paper";

export const FAQSection = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) =>
      setExpanded(isExpanded ? panel : false);

  return (
    <Paper
      variant="elevation"
      sx={{
        position: "absolute",
        bottom: 0,
        right: 0,
        zIndex: 2,
        margin: 3,
        backgroundColor: "transparent",
        width: "33%",
        justifyContent: "center",
      }}
      elevation={0}
    >
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography color="primary">FAQ</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Our assumption is that each passenger emits 250kg of CO&sup2; per
            hour of flight. This is taken from{" "}
            <a href="https://www.carbonindependent.org/22.html" target="_blank">
              carbonindependent.org
            </a>{" "}
            and seems coherent with other flight carbon emission calculators. We
            then multiply each flight time by this number. We also estimate the
            flight time using the distance between the airports.
            <br />
            <br />
            For more information or question about this specific calculator,
            please contact its author via{" "}
            <a
              href="https://github.com/antoinewg/flight-carbon-footprint"
              target="_blank"
            >
              github.com
            </a>
            .
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};
