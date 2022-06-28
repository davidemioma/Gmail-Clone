import React, { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/outline";
import {
  TrashIcon,
  MailIcon,
  ClockIcon,
  ArchiveIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";
import Moment from "react-moment";
import { deleteMail } from "../util/functions";
import { collection, onSnapshot, query } from "@firebase/firestore";
import { db } from "../firebase";

const EmailRow = ({ id, username, subject, description, date }) => {
  const router = useRouter();

  const [openTrash, setOpenTrash] = useState(false);

  const [files, setFiles] = useState([]);

  useEffect(
    () =>
      onSnapshot(query(collection(db, "emails", id, "files")), (snapshot) =>
        setFiles(snapshot.docs)
      ),
    [db]
  );

  const onDeleteMail = async () => {
    await deleteMail(id, files);
  };

  return (
    <div
      className={`${
        openTrash && "bg-blue-100"
      } flex text-gray-500 px-2 py-1 cursor-pointer border-b border-[whitesmoke] hover:border hover:shadow-md`}
    >
      <div className="icon-btn">
        <input
          className="outline-none z-30 w-4 h-4 cursor-pointer border-4"
          type="checkbox"
          onChange={(e) => setOpenTrash(e.target.checked)}
        />
      </div>

      <div
        onClick={() => router.push(`/mail/${id}`)}
        className="w-full group grid items-center grid-cols-2 xs:grid-cols-3 "
      >
        <div className="flex items-center">
          <div className="icon-btn">
            <StarIcon className="h-5" />
          </div>

          <p className="capitalize text-sm text-black font-semibold">
            {username}
          </p>
        </div>

        <div className="hidden xs:inline max-w-[150px] md:max-w-[300px]">
          <p className="text-sm truncate">
            <span className="capitalize text-black font-semibold">
              {subject}
            </span>{" "}
            - {description}
          </p>
        </div>

        <div className="flex items-center justify-self-end mr-2">
          <div className="hidden group-hover:inline icon-btn">
            <ArchiveIcon className="h-5 hover:text-black" />
          </div>

          <div className="hidden group-hover:inline icon-btn">
            <MailIcon className="h-5 hover:text-black" />
          </div>

          <div className="hidden group-hover:inline icon-btn ">
            <ClockIcon className="h-5 hover:text-black" />
          </div>

          <p className="text-xs group-hover:hidden font-semibold text-black">
            {<Moment fromNow date={date?.toDate()} />}
          </p>
        </div>
      </div>

      {openTrash && (
        <div className="icon-btn" onClick={onDeleteMail}>
          <TrashIcon className="h-5 z-30 hover:text-black" />
        </div>
      )}
    </div>
  );
};

export default EmailRow;
