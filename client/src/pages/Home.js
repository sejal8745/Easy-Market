import React from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/Auth.js";

const Home = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout title="Shop Now - EasyMarket">
      <h1>Home</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
};

export default Home;
