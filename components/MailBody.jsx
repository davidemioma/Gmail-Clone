import React from "react";
import { StarIcon } from "@heroicons/react/outline";
import { XIcon, ReplyIcon, DotsVerticalIcon } from "@heroicons/react/solid";
import Avatar from "./Avatar";
import BtnIcon from "./BtnIcon";
import Moment from "react-moment";

const MailBody = ({
  avatarImg,
  subject,
  username,
  sender,
  recipient,
  description,
  date,
}) => {
  return (
    <div className="px-3 pt-3 ">
      <div className="flex pl-2 sm:pl-14 items-center mb-6">
        <h1 className="mr-2 text-lg">{subject}</h1>

        <div className="w-[56px] flex items-center text-xs rounded-lg bg-gray-100">
          <span className="mr-1 py-[2px] pl-1 rounded-tl-lg rounded-bl-lg hover:bg-gray-500 cursor-pointer hover:text-white">
            Inbox
          </span>

          <span className="py-[2px] pr-1 rounded-tr-lg rounded-br-lg hover:bg-gray-500 cursor-pointer hover:text-white">
            <XIcon className="h-3 " />
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="hidden sm:inline">
            <Avatar image={avatarImg} />
          </div>

          <p className="ml-2 text-xs">
            <span className="text-sm capitalise font-semibold text-black">
              {username}
            </span>{" "}
            (<span className="text-xs">{sender}</span>)<br />
            to {recipient}
          </p>
        </div>

        <div className="flex items-center">
          <p className="text-xs">({<Moment fromNow date={date} />})</p>

          <div className="hidden md:inline-flex">
            <BtnIcon Icon={StarIcon} text="Not Starred" />

            <BtnIcon Icon={ReplyIcon} text="Reply" />

            <BtnIcon Icon={DotsVerticalIcon} text="More" />
          </div>
        </div>
      </div>

      <div className="py-5 px-2 sm:px-14 text-sm">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default MailBody;
