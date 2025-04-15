import React, { JSX } from "react";

const MainCard = ({
  children,
  className,
  bgColor,
}: {
  children: JSX.Element;
  className: string;
  bgColor: string;
}) => {
  return (
    <div className={className}>
      <div
        className={`${bgColor} w-full p-[5%] h-[102%] bg-radius rounded-3xl lg:w-2/4 sm:p-[3%] lg:h-[80%] `}
      >
        {children}
      </div>
    </div>
  );
};

export default MainCard;
