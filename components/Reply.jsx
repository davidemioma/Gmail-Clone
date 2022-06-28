import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import Moment from "react-moment";
import BtnIcon from "./BtnIcon";
import { StarIcon } from "@heroicons/react/outline";
import { DotsVerticalIcon, ReplyIcon } from "@heroicons/react/solid";
import { collection, onSnapshot, query } from "@firebase/firestore";
import { db } from "../firebase";
import MailFile from "./MailFile";

const Reply = ({ id, reply }) => {
  const [files, setFiles] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "emails", id, "replies", reply.id, "files")),
        (snapshot) => setFiles(snapshot.docs)
      ),
    []
  );

  return (
    <div className="flex items-start p-3 border-b border-[whitesmoke]">
      <div className="hidden sm:inline sm:mr-2">
        <Avatar image={reply.profilePic} />
      </div>

      <div className="w-full">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs">
              <span className="text-sm text-black font-bold">
                {reply.username}
              </span>{" "}
              ({reply.sender})
            </p>

            <p className="text-xs">to {reply.to}</p>
          </div>

          <div className="flex items-center">
            <p className="text-xs">
              (<Moment fromNow date={reply.timestamp} />)
            </p>

            <div className="hidden md:inline-flex">
              <BtnIcon Icon={StarIcon} text="Not Starred" />

              <BtnIcon Icon={ReplyIcon} text="Reply" />

              <BtnIcon Icon={DotsVerticalIcon} text="More" />
            </div>
          </div>
        </div>

        <p className="text-sm my-5">{reply.message}</p>

        <div className="py-2 border-t border-[whitesmoke]">
          <p className="text-sm text-black font-bold mb-4">
            {files.length} Attachments
          </p>

          <div className="flex flex-col lg:flex-row lg:flex-wrap">
            {files?.map((file) => (
              <MailFile
                key={file.id}
                file={file.data().file}
                name={file.data().name}
                size={file.data().size}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reply;
