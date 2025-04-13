import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const Navbar = ({ title }: { title: string }) => {
  return (
    <div className="bg-white font-medium w-full h-[50px] text-black flex justify-center flex-row">
      <div className="flex bg-white w-2/3 justify-between items-center">
        <div></div>
        <h3>{title}</h3>
        <div className="flex justify-center items-center">
          <BsThreeDotsVertical />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
