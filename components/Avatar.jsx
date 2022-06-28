import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Avatar = ({ image }) => {
  const [user] = useAuthState(auth);

  return (
    <button className="icon-btn" onClick={() => auth.signOut()}>
      <img
        className="w-8 h-8 rounded-full object-cover"
        src={image ? image : user?.photoURL}
        alt=""
      />
    </button>
  );
};

export default Avatar;
