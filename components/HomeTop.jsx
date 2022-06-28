import React from "react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChatAltIcon,
  CogIcon,
  RefreshIcon,
  DotsVerticalIcon,
} from "@heroicons/react/solid";
import BtnIcon from "./BtnIcon";

const HomeTop = () => {
  return (
    <div className="sticky z-50 top-0 flex py-1 px-2 text-gray-500 items-center justify-between border-b border-[whitesmoke]">
      <div>
        <div className="icon-btn">
          <input
            className="outline-none w-4 h-4 cursor-pointer border-4"
            type="checkbox"
          />
        </div>

        <BtnIcon Icon={ChevronDownIcon} text="Select" />

        <BtnIcon Icon={RefreshIcon} text="Refresh" />

        <BtnIcon Icon={DotsVerticalIcon} text="More" />
      </div>

      <div>
        <BtnIcon Icon={ChevronLeftIcon} text="Older" />

        <BtnIcon Icon={ChevronRightIcon} text="Newer" />

        <BtnIcon Icon={ChatAltIcon} text="Chat" />

        <BtnIcon Icon={CogIcon} text="Settings" />
      </div>
    </div>
  );
};

export default HomeTop;
