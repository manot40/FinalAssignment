import Head from "next/head";
import type { AppProps } from "next/app";
import { CssBaseline } from "@nextui-org/react";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import UserCtxProvider from "../components/UserContext";
import { ToastContainer } from "react-toastify";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Tugas Akhir | Kevin Sandiho</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <UserCtxProvider>
        <Component {...pageProps} />
      </UserCtxProvider>
      <ToastContainer autoClose={2000} position="top-center" closeOnClick />
    </>
  );
}

export default App;
