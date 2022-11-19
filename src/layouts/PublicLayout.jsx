import React from "react";
import NavBar from "../components/NavBar";
const PublicLayout = ({ children }) => {
  return (
    <div className="h-screen flex overflow-hidden">
      <NavBar />
      <main className="  ">{children}</main>
    </div>
  );
};

export default PublicLayout;
