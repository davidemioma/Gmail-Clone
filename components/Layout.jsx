import React from "react";
import { useSelector } from "react-redux";
import Form from "./Form";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const mailFormOpen = useSelector((state) => state.mailForm.isMailFormOpen);
  return (
    <div className="relative h-screen overflow-hidden">
      <Header />

      {mailFormOpen && (
        <div className="absolute z-50 right-[30px] md:right-8 bottom-0">
          <Form />
        </div>
      )}

      <div className="flex ">
        <div className="w-[70px] md:w-[256px] h-[90vh] md:pr-2 border-r border-[whitesmoke]">
          <Sidebar />
        </div>

        <div className="w-full  overflow-x-hidden">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
