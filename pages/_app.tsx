import Head from "next/head";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CssBaseline } from "@nextui-org/react";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Tugas Akhir | Kevin Sandiho</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <Component {...pageProps} />
    </>
  );
}

export default App;
