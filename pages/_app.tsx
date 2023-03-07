import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "../pages/Layout";
import Dashboard from "../pages/dashboard/page";
import Login from "../pages/login/page";
import { AuthProvider } from "../context/AuthContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <AuthProvider>
      {router.pathname === "/" && <Login />}
      {router.pathname !== "/" && <Dashboard />}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
