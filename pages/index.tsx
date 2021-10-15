import type { NextPage } from "next";
import { WorldMap } from "../components/WorldMap";

const Home: NextPage = () => {
  return (
    <>
      <h1 className="m-8">
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>
      <WorldMap />
    </>
  );
};

export default Home;
