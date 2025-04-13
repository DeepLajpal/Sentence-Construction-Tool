import React from "react";
import { MdOutlineEditNote } from "react-icons/md";
import Navbar from "./navbar";

const Home = () => {
  return (
    <div>
      <Navbar title="Sentence Construction Tool" />
      <MdOutlineEditNote />
    </div>
  );
};

export default Home;
