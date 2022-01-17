import Router from "next/router";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    Router.replace('/polls');
  }, [])
  return null;
};

export default Home;