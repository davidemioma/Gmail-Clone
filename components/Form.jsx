import React, { useRef, useState } from "react";
import _ from "lodash";
import { XIcon, TrashIcon, DotsVerticalIcon } from "@heroicons/react/solid";
import { MdInsertLink } from "react-icons/md";
import { IoIosAttach } from "react-icons/io";
import BtnIcon from "./BtnIcon";
import { useDispatch } from "react-redux";
import { closeMailForm } from "../store/store";
import { readAllFiles } from "../util/file";
import { serverTimestamp } from "@firebase/firestore";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { createMail } from "../util/functions";
import ChosenFile from "./ChosenFile";

const Form = () => {
  const [user] = useAuthState(auth);

  const dispatch = useDispatch();

  const filePickerRef = useRef(null);

  const [recipent, setRecipient] = useState("");

  const [subject, setSubject] = useState("");

  const [message, setMessage] = useState("");

  const [seletedFiles, setSeletedFiles] = useState([]);

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

  const sendEmail = async () => {
    if (!recipent.trim() || !recipent.includes("@gmail.com")) {
      alert("Enter a valid recipient email");

      return;
    }

    const data = {
      to: recipent,
      subject: subject || "",
      message: message || "",
      username: user.displayName,
      sender: user.email,
      profilePic: user.photoURL,
      timestamp: serverTimestamp(),
    };

    await createMail(data, seletedFiles, setSeletedFiles);

    setRecipient("");

    setSubject("");

    setMessage("");

    dispatch(closeMailForm());
  };

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden w-[325px] xs:w-[425px] sm:w-[500px]">
      <div className="flex items-center justify-between bg-[#404040] text-white px-3 py-2">
        <p className="text-sm">New Message</p>

        <XIcon
          className="h-5 cursor-pointer"
          onClick={() => dispatch(closeMailForm())}
        />
      </div>

      <input
        className="input"
        value={recipent}
        type="email"
        placeholder="To"
        onChange={(e) => setRecipient(e.target.value)}
      />

      <input
        className="input"
        value={subject}
        type="text"
        placeholder="Subject"
        onChange={(e) => setSubject(e.target.value)}
      />

      <div className="h-[246px] border-b border-[whitesmoke] overflow-y-scroll">
        <input
          className="w-full p-2 text-sm outline-none"
          value={message}
          type="text"
          onChange={(e) => setMessage(e.target.value)}
        />

        <div>
          <input
            ref={filePickerRef}
            type="file"
            multiple
            hidden
            onChange={uploadFiles}
          />

          {seletedFiles.length > 0 && (
            <div className="px-2 grid gap-3">
              {seletedFiles?.map((file, i) => (
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

      <div className="flex items-center justify-between px-2 pt-1 pb-8">
        <div className="flex items-center">
          <button
            className="bg-blue-600 text-white text-sm py-1 px-3 rounded-md"
            onClick={sendEmail}
          >
            Send
          </button>

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
            onClick={() => dispatch(closeMailForm())}
          />
        </div>
      </div>
    </div>
  );
};

export default Form;
