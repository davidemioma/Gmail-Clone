import React from "react";
import {
  PlusIcon,
  InboxIcon,
  StarIcon,
  ClockIcon,
  ChevronDownIcon,
  DocumentIcon,
  PencilAltIcon,
  PaperAirplaneIcon,
  PhoneIcon,
  UserIcon,
  ChatIcon,
} from "@heroicons/react/solid";
import SidebarOptions from "./SidebarOptions";
import Avatar from "./Avatar";
import { useDispatch } from "react-redux";
import { openMailForm } from "../store/store";

const Sidebar = () => {
  const dispatch = useDispatch();

  return (
    <div className="mt-4 md:mt-0">
      <button
        className="flex my-4 ml-2 md:ml-4 items-center px-2 py-2 md:px-4 lg:px-6 md:py-3 cursor-pointer rounded-full border shadow-md"
        onClick={() => dispatch(openMailForm())}
      >
        <PlusIcon className="h-6 md:mr-2" />

        <p className="hidden md:inline text-sm">Compose</p>
      </button>

      <SidebarOptions Icon={InboxIcon} text="Inbox" number="23" link="/" />

      <SidebarOptions Icon={StarIcon} text="Starred" />

      <SidebarOptions Icon={ClockIcon} text="Snooze" />

      <SidebarOptions
        Icon={PaperAirplaneIcon}
        text="Sent"
        rotate
        link="/sent"
      />

      <SidebarOptions Icon={DocumentIcon} text="Drafts" />

      <SidebarOptions Icon={PencilAltIcon} text="Notes" />

      <SidebarOptions Icon={ChevronDownIcon} text="More" />

      <div className="w-full ml-3 md:ml-0 flex md:justify-center">
        <div className="text-gray-600 flex flex-col md:flex-row">
          <button className="icon-btn">
            <UserIcon className="h-5" />
          </button>

          <button className="icon-btn">
            <ChatIcon className="h-5" />
          </button>

          <button className="icon-btn">
            <PhoneIcon className="h-5" />
          </button>
        </div>
      </div>

      <div className="md:hidden ml-1">
        <Avatar />
      </div>
    </div>
  );
};

export default Sidebar;
