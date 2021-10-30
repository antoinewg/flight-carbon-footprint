import type { NextPage } from "next";
import { SideBar } from "@components/SideBar";
import { StateWrapper } from "@components/StateWrapper";
import { WorldMap } from "@components/WorldMap";
import { FAQSection } from "@atoms/FAQSection";

const Home: NextPage = () => (
  <StateWrapper>
    <>
      <SideBar />
      <WorldMap />
      <FAQSection />
    </>
  </StateWrapper>
);

export default Home;
