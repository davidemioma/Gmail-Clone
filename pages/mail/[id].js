import React, { useEffect, useState } from "react";
import Head from "next/head";
import MailBody from "../../components/MailBody";
import MailTop from "../../components/MailTop";
import { BsFillReplyFill } from "react-icons/bs";
import { GoArrowRight } from "react-icons/go";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "@firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../../firebase";
import MailFile from "../../components/MailFile";
import TaskForm from "../../components/TaskForm";
import Reply from "../../components/Reply";
import { useRouter } from "next/router";

const Mail = ({ email, files }) => {
  const [user] = useAuthState(auth);

  const router = useRouter();

  const [replyFormOpen, setReplyFormOpen] = useState(false);

  const [forwardFormOpen, setForwardFormOpen] = useState(false);

  const [replies, setReplies] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "emails", router.query.id, "replies"),
          orderBy("timestamp", "asc")
        ),
        (snapshot) => setReplies(snapshot.docs)
      ),
    [db]
  );

  return (
    <div className="overflow-y-scroll h-[90vh]">
      <Head>
        <title>
          ({email.subject ? email?.subject : "no-subject"}) - {user.email}
        </title>
      </Head>

      <MailTop />

      <MailBody
        avatarImg={email?.profilePic}
        username={email?.username}
        subject={email?.subject}
        sender={email?.sender}
        recipient={email?.to}
        description={email?.message}
        date={email?.timestamp}
      />

      {files.length > 0 && (
        <div className="py-2 px-6 sm:px-16 border-t border-[whitesmoke]">
          <p className="text-sm text-black font-bold mb-4">
            {files.length} Attachments
          </p>

          <div className="flex flex-col lg:flex-row lg:flex-wrap">
            {files?.map((file) => (
              <MailFile
                key={file.id}
                file={file.file}
                name={file.name}
                size={file.size}
              />
            ))}
          </div>
        </div>
      )}

      {replies && (
        <div className="border-t border-[whitesmoke]">
          {replies?.map((reply) => (
            <Reply
              key={reply.id}
              id={email?.id}
              replyId={reply.id}
              profilePic={reply.data().profilePic}
              username={reply.data().username}
              sender={reply.data().sender}
              message={reply.data().message}
              to={reply.data().to}
              timestamp={reply.data().timestamp.toDate().getTime()}
            />
          ))}
        </div>
      )}

      {replyFormOpen && (
        <TaskForm
          id={email?.id}
          task="reply"
          sender={email?.sender}
          reciver={email?.to}
          subject={email?.subject}
          closeForm={() => setReplyFormOpen(false)}
        />
      )}

      {forwardFormOpen && (
        <TaskForm
          id={email?.id}
          task="forward"
          subject={email?.subject}
          message={email?.message}
          closeForm={() => setForwardFormOpen(false)}
        />
      )}

      <div className="flex space-x-3 items-center py-10 px-6 sm:px-16">
        <button
          className="btn"
          onClick={() => {
            setForwardFormOpen(false);

            setReplyFormOpen(true);
          }}
        >
          <BsFillReplyFill className="text-base" />

          <p>Reply</p>
        </button>

        <button
          className="btn"
          onClick={() => {
            setReplyFormOpen(false);

            setForwardFormOpen(true);
          }}
        >
          <GoArrowRight className="text-base" />

          <p>Forward</p>
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const emailRef = await getDoc(doc(db, "emails", context.query.id));

  const email = {
    id: emailRef.id,
    ...emailRef.data(),
    timestamp: emailRef?.data()?.timestamp?.toDate().getTime(),
  };

  const filesRef = await getDocs(
    collection(db, "emails", context.query.id, "files")
  );

  const files = filesRef.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    props: {
      email,
      files,
    },
  };
};

export default Mail;
