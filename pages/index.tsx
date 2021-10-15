import type { NextPage } from "next";
import { SideBar } from "../components/SideBar";
import { WorldMap } from "../components/WorldMap";

const Home: NextPage = () => {
  return (
    <div>
      <SideBar />
      <WorldMap />
    </div>
  );
};

export default Home;
