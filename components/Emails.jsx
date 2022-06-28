import React from "react";
import EmailRow from "./EmailRow";

const Emails = ({ mails }) => {
  return (
    <div>
      {mails?.map((item) => (
        <EmailRow
          key={item.id}
          id={item.id}
          username={item.data().username}
          subject={item.data().subject}
          description={item.data().message}
          date={item.data().timestamp}
        />
      ))}
    </div>
  );
};

export default Emails;
