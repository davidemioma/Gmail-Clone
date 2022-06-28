import React from "react";
import { Circles } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="grid place-content-center h-screen">
      <div className="flex flex-col items-center">
        <img
          className="w-[400px] h-[200px] "
          src="https://guardian.ng/wp-content/uploads/2020/12/Gmail.jpg"
          alt=""
        />

        <div>
          <Circles width="80px" height="80px" color="rgb(37, 99, 235)" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
