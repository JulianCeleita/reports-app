import Reports from "components/Reports";
import Head from "next/head";
import Login from "../components/Login";
import UserDashboard from "../components/UserDashboard";
import { AuthContextType, useAuth } from "../context/AuthContext";

export default function Home() {
  const { currentUser }: AuthContextType = useAuth();

  return (
    <>
      <Head>
        <title>Reports App</title>
        <meta name="description" content="Reports and comments app with firebase, typescript, nextjs and tailwind" />
        <link rel="icon" href="/icon.ico" />
      </Head>
      {!currentUser && <Login />}{/* 
      {currentUser && <UserDashboard />} */}
      {currentUser && <Reports/>}
    </>
  );
}
