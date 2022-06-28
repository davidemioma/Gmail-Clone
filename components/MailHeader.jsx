import React, { useState } from "react";
import { InboxIcon, UsersIcon, GiftIcon } from "@heroicons/react/solid";

const MailHeader = () => {
  const [selected, setSelected] = useState("primary");

  return (
    <div className="hidden md:inline-flex space-x-2 items-center border-b border-[whitesmoke]">
      <div
        className={`section ${
          selected === "primary"
            ? "text-red-600 border-b-[3px] border-red-600"
            : "text-gray-500"
        }`}
        onClick={() => setSelected("primary")}
      >
        <InboxIcon className="h-6 mr-3" />

        <p className="capitalize text-sm">primary</p>
      </div>

      <div
        className={`section ${
          selected === "social"
            ? "text-blue-600 border-b-[3px] border-blue-600"
            : "text-gray-500"
        }`}
        onClick={() => setSelected("social")}
      >
        <UsersIcon className="h-6 mr-3" />

        <p className="capitalize text-sm">social</p>
      </div>

      <div
        className={`section ${
          selected === "promotions"
            ? "text-green-600 border-b-[3px] border-green-600"
            : "text-gray-500"
        }`}
        onClick={() => setSelected("promotions")}
      >
        <GiftIcon className="h-6 mr-3" />

        <p className="capitalize text-sm">promotions</p>
      </div>
    </div>
  );
};

export default MailHeader;
