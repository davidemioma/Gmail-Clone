import React, { useEffect, useState } from "react";
import Head from "next/head";
import HomeTop from "../components/HomeTop";
import MailHeader from "../components/MailHeader";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import Emails from "../components/Emails";

const Home = () => {
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
      setFilteredEmails(emails.filter((mail) => mail.data().to === user.email)),
    [emails]
  );

  return (
    <div className="relative">
      <Head>
        <title>Inbox (30) - {user.email}</title>
      </Head>

      <HomeTop />

      <MailHeader />

      <Emails mails={filteredEmails} />
    </div>
  );
};

export default Home;
