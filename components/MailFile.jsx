import React from "react";
import millify from "millify";
import { AiFillFile } from "react-icons/ai";
import { MdFileDownload } from "react-icons/md";
import BtnIcon from "./BtnIcon";

const MailFile = ({ file, name, size }) => {
  return (
    <div className="bg-gray-200 mr-3 mb-3 py-1 px-2 w-[250px] xs:w-[300px] flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <AiFillFile className="text-base text-red-600" />

        <div>
          <p className="text-sm w-[150px] xs:w-[200px] truncate">{name}</p>

          <p className="text-xs">
            (
            {millify(size, {
              units: ["B", "KB", "MB", "GB", "TB"],
            })}
            )
          </p>
        </div>
      </div>

      <a href={file} target="_blank">
        <BtnIcon Icon={MdFileDownload} text="download" />
      </a>
    </div>
  );
};

export default MailFile;
