import React from "react";
import { useRouter } from "next/router";

const SidebarOptions = ({ Icon, text, number, link, rotate }) => {
  const router = useRouter();

  return (
    <div
      className={`${
        router.asPath === link && "bg-red-100"
      } w-full mb-1 cursor-pointer text-gray-600 flex hover:bg-gray-100 rounded-full py-1 px-3`}
      onClick={() => link && router.push(link)}
    >
      <Icon
        className={`${
          router.asPath === link && "text-red-600"
        } h-5 ml-2 md:ml-3 ${rotate && "transform rotate-[90deg]"} `}
      />

      <p
        className={`hidden md:inline ${
          router.asPath === link && "text-red-600"
        } ml-3 flex-1 text-sm`}
      >
        {text}
      </p>

      {number && (
        <p
          className={`hidden md:inline${
            router.asPath === link && "ml-3 md:ml-0 text-red-600 text-sm"
          }`}
        >
          {number}
        </p>
      )}
    </div>
  );
};

export default SidebarOptions;
