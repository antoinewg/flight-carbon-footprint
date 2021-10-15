import type { NextPage } from "next";
import { SideBar } from "../components/SideBar";
import { WorldMap } from "../components/WorldMap";

const Home: NextPage = () => {
  return (
    <>
      <SideBar />
      <WorldMap />
    </>
  );
};

export default Home;
