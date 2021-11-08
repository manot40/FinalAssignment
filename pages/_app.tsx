import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CssBaseline } from "@nextui-org/react";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CssBaseline />
      <Component {...pageProps} />
    </>
  );
}

export default App;
