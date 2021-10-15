import type { NextPage } from "next";
import { SideBar } from "../components/SideBar";
import { StateWrapper } from "../components/StateWrapper";
import { WorldMap } from "../components/WorldMap";

const Home: NextPage = () => {
  return (
    <StateWrapper>
      <>
        <SideBar />
        <WorldMap />
      </>
    </StateWrapper>
  );
};

export default Home;
