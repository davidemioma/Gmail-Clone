import React from "react";
import { MenuIcon, SearchIcon } from "@heroicons/react/outline";
import { FilterIcon, QuestionIcon, SettingsIcon } from "../icons/Icon";
import { GrApps } from "react-icons/gr";
import BtnIcon from "./BtnIcon";
import Avatar from "./Avatar";

const Header = () => {
  return (
    <div className="flex items-center justify-between border-b border-[whitesmoke] px-4 py-2">
      <div className="flex items-center space-x-2">
        <button className="icon-btn">
          <MenuIcon className="h-6" />
        </button>

        <img
          className="hidden sm:inline w-[100px] h-[30px] object-contain"
          src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Gmail2020.logo.png"
          alt=""
        />
      </div>

      <div className="flex flex-[0.7] items-center px-4 py-1 rounded-lg shadow-md border">
        <BtnIcon Icon={SearchIcon} text="Search" />

        <input
          className="flex-grow ml-2 outline-none"
          type="text"
          placeholder="Search Mail"
        />

        <BtnIcon Icon={FilterIcon} text="Show search options" />
      </div>

      <div className="hidden md:inline-flex items-center space-x-2">
        <BtnIcon Icon={QuestionIcon} text="Support" />

        <BtnIcon Icon={SettingsIcon} text="Settings" />

        <BtnIcon Icon={GrApps} text="Google Apps" special />

        <Avatar />
      </div>
    </div>
  );
};

export default Header;
