import React from "react";
import { MdDriveFileMove, MdLabel } from "react-icons/md";
import {
  TrashIcon,
  ClockIcon,
  MailIcon,
  ArrowLeftIcon,
  ArchiveIcon,
  ExclamationCircleIcon,
  PlusCircleIcon,
  DotsVerticalIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PrinterIcon,
  ExternalLinkIcon,
} from "@heroicons/react/solid";
import BtnIcon from "./BtnIcon";
import { useRouter } from "next/router";

const MailTop = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between  px-2 py-1 border-b border-[whitesmoke]">
      <div className="flex items-center">
        <div className="mr-2">
          <BtnIcon
            Icon={ArrowLeftIcon}
            text="inbox"
            onClick={() => router.push("/")}
          />
        </div>
        <BtnIcon Icon={ArchiveIcon} text="Archieve" />

        <BtnIcon Icon={ExclamationCircleIcon} text="Report Spam" />

        <BtnIcon Icon={TrashIcon} text="Delete" />

        <div className="w-[1px] h-5 mx-2 bg-[whitesmoke]" />

        <BtnIcon Icon={MailIcon} text="Mark as unread" />

        <BtnIcon Icon={ClockIcon} text="Snooze" />

        <BtnIcon Icon={PlusCircleIcon} text="Add to tasks" />

        <div className="hidden sm:inline-flex">
          <div className="w-[1px] h-5 mx-2 bg-[whitesmoke]" />

          <BtnIcon Icon={MdDriveFileMove} text="Move To" special />

          <BtnIcon Icon={MdLabel} text="Labels" special />

          <BtnIcon Icon={DotsVerticalIcon} text="More" />
        </div>
      </div>

      <div className="hidden sm:inline-flex items-center">
        <BtnIcon Icon={ChevronLeftIcon} text="Older" />

        <BtnIcon Icon={ChevronRightIcon} text="Newer" />

        <BtnIcon Icon={PrinterIcon} text="Print" />

        <BtnIcon Icon={ExternalLinkIcon} text="link" />
      </div>
    </div>
  );
};

export default MailTop;
