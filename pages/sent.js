import React, { useEffect, useState } from "react";
import Head from "next/head";
import HomeTop from "../components/HomeTop";
import Emails from "../components/Emails";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";

const Sent = () => {
  const [user] = useAuthState(auth);

  const [emails, setEmails] = useState([]);

  const [filteredEmails, setFilteredEmails] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "emails"), orderBy("timestamp", "desc")),
        (snapshot) => setEmails(snapshot.docs)
      ),
    [db]
  );

  useEffect(
    () =>
      setFilteredEmails(
        emails.filter((mail) => mail.data().sender === user.email)
      ),
    [emails]
  );

  return (
    <div>
      <Head>
        <title>Sent Mail - {user.email}</title>
      </Head>

      <HomeTop />

      <Emails mails={filteredEmails} />
    </div>
  );
};

export default Sent;
