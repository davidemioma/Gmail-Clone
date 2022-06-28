import React from "react";
import millify from "millify";
import { XIcon } from "@heroicons/react/solid";

const ChosenFile = ({ file, seletedFiles, setSeletedFiles }) => {
  return (
    <div className="bg-gray-100 py-1 px-2 flex items-center justify-between">
      <p className="text-xs text-blue-600">
        {file.name}
        <span className="text-gray-700">
          (
          {millify(file.size, {
            units: ["B", "KB", "MB", "GB", "TB"],
          })}
          )
        </span>
      </p>

      <XIcon
        className="h-4 cursor-pointer"
        onClick={() =>
          setSeletedFiles(
            seletedFiles.filter((item) => item.name !== file.name)
          )
        }
      />
    </div>
  );
};

export default ChosenFile;
