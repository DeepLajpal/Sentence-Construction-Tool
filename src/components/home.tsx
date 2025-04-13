import Navbar from "./navbar";
import MainCard from "./mainCard";
import TestIntro from "./testIntro";
import Testbody from "./Testbody";

const Home = () => {
  const mainCardClassName =
    "h-[calc(100%-50px)] flex justify-center items-center";
  return (
    <div className="h-screen w-screen size-full bg-[#F8F8F8]">
      <Navbar title="Sentence Construction Tool" />
      {/* <MainCard className={`${mainCardClassName}`} bgColor="bg-transparent">
        <TestIntro />
      </MainCard> */}
      <MainCard className={`${mainCardClassName}`} bgColor="bg-white">
        <Testbody />
      </MainCard>
    </div>
  );
};

export default Home;
