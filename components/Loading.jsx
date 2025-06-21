import React from "react";
import { BeatLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="w-full h-full mt-[-10em] flex items-center justify-around ">
      <BeatLoader size={20} color="rgb(0, 137, 123)" speedMultiplier={2} />
    </div>
  );
};

export default Loading;
