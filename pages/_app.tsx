import "../public/styles.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { indigo, green } from "@mui/material/colors";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
