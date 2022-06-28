import React from "react";
import { useRouter } from "next/router";
import { signInWithGoogle } from "../firebase";

const Login = () => {
  const router = useRouter();

  const onClickHandler = () => {
    signInWithGoogle();

    router.push("/");
  };

  return (
    <div className="grid place-content-center h-screen">
      <div className="flex flex-col">
        <img
          className="w-[400px] h-[200px] "
          src="https://guardian.ng/wp-content/uploads/2020/12/Gmail.jpg"
          alt=""
        />

        <button
          className="bg-blue-500 text-white py-[0.5rem] rounded-lg"
          onClick={onClickHandler}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
