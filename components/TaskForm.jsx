import React, { useState, useRef } from "react";
import { BiDownArrow } from "react-icons/bi";
import { BsFillReplyFill } from "react-icons/bs";
import { XIcon } from "@heroicons/react/solid";
import Avatar from "./Avatar";
import BtnIcon from "./BtnIcon";
import { IoIosAttach } from "react-icons/io";
import { MdInsertLink } from "react-icons/md";
import { DotsVerticalIcon, TrashIcon } from "@heroicons/react/outline";
import { readAllFiles } from "../util/file";
import ChosenFile from "./ChosenFile";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { serverTimestamp } from "@firebase/firestore";
import { createReply, createMail } from "../util/functions";

const TaskForm = ({
  id,
  task,
  sender,
  reciver,
  subject,
  message,
  closeForm,
}) => {
  const [user] = useAuthState(auth);

  const [replyMail, setReplyMail] = useState(
    sender === reciver ? [sender] : [sender, reciver]
  );

  const filePickerRef = useRef(null);

  const [input, setInput] = useState("");

  const [newMessage, setNewMessage] = useState("");

  const [forwardmails, setforwardmails] = useState([]);

  const [seletedFiles, setSeletedFiles] = useState([]);

  const onAddMailList = (e) => {
    e.preventDefault();

    setforwardmails([...forwardmails, input]);

    setInput("");
  };

  const uploadFiles = (e) => {
    let AllFiles = [];

    [...e.target.files].map((file) => AllFiles.push(file));

    readAllFiles(AllFiles)
      .then((result) => {
        setSeletedFiles(result);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const sendReply = async () => {
    if (replyMail.length === 0) return;

    const data = {
      to: replyMail?.join(", "),
      subject: subject || "",
      message: newMessage || "",
      username: user?.displayName,
      sender: user?.email,
      profilePic: user?.photoURL,
      timestamp: serverTimestamp(),
    };

    await createReply(id, data, seletedFiles, setSeletedFiles);

    setNewMessage("");

    closeForm();
  };

  const forwardMail = async () => {
    if (forwardmails.length === 0) return;

    forwardmails.map(async (mail) => {
      const data = {
        to: mail,
        subject: subject || "",
        message: message,
        username: user.displayName,
        sender: user.email,
        profilePic: user.photoURL,
        timestamp: serverTimestamp(),
      };

      await createMail(data, seletedFiles, setSeletedFiles);
    });

    setforwardmails([]);

    setInput("");

    closeForm();
  };

  return (
    <div className="px-2 mt-4 flex items-start">
      <div className="hidden md:inline">
        <Avatar />
      </div>

      <div className="w-full  mr-2 shadow-md border rounded-lg p-3">
        <div className="w-full flex items-center">
          <BsFillReplyFill className="text-base text-gray-500" />

          <BiDownArrow className="text-xs text-gray-500 mx-2" />

          <p className="text-sm mr-1">To</p>

          <div>
            {task === "reply" ? (
              <div className="flex items-center space-x-2">
                {replyMail.map((mail, i) => (
                  <div key={i} className="mails">
                    <p className="w-[90px] truncate">{mail}</p>

                    <XIcon
                      className="h-3 cursor-pointer"
                      onClick={() =>
                        setReplyMail(replyMail.filter((item) => item !== mail))
                      }
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full flex space-x-2 flex-wrap">
                {forwardmails.map((item, i) => (
                  <div key={i} className="mails">
                    <p className="w-[90px] truncate">{item}</p>

                    <XIcon
                      className="h-3 cursor-pointer"
                      onClick={() =>
                        setforwardmails(
                          forwardmails.filter((mail) => mail !== item)
                        )
                      }
                    />
                  </div>
                ))}

                <form onSubmit={onAddMailList}>
                  <input
                    className="outline-none text-sm"
                    value={input}
                    type="email"
                    onChange={(e) => setInput(e.target.value)}
                  />
                </form>
              </div>
            )}
          </div>
        </div>

        <div className="mt-2 h-[200px] overflow-y-scroll">
          {task === "reply" && (
            <input
              className="text-sm outline-none"
              value={newMessage}
              type="text"
              onChange={(e) => setNewMessage(e.target.value)}
            />
          )}

          {task === "forward" && <div className="text-sm">{message}</div>}

          <div className="mt-3">
            <input
              ref={filePickerRef}
              type="file"
              multiple
              hidden
              onChange={uploadFiles}
            />

            {seletedFiles.length > 0 && (
              <div className="px-2 grid gap-3">
                {seletedFiles.map((file, i) => (
                  <ChosenFile
                    key={i}
                    file={file}
                    seletedFiles={seletedFiles}
                    setSeletedFiles={setSeletedFiles}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between px-2 pt-1">
          <div className="flex items-center">
            {task === "forward" ? (
              <button
                className="bg-blue-600 text-white text-sm py-1 px-3 rounded-md"
                onClick={forwardMail}
              >
                Send
              </button>
            ) : (
              <button
                className="bg-blue-600 text-white text-sm py-1 px-3 rounded-md"
                onClick={sendReply}
              >
                Send
              </button>
            )}

            <BtnIcon
              onClick={() => filePickerRef.current.click()}
              Icon={IoIosAttach}
              text="Attach File"
              special
            />

            <BtnIcon Icon={MdInsertLink} text="Insert Link" special />
          </div>

          <div className="flex items-center">
            <BtnIcon Icon={DotsVerticalIcon} text="More Options" />

            <BtnIcon
              Icon={TrashIcon}
              text="Discard"
              onClick={() => closeForm()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
