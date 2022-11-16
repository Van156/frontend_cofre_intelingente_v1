import React from "react";
import NavBar from "../components/NavBar";
const PublicLayout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <main className="h-full overflow-y-scroll ">{children}</main>
    </div>
  );
};

export default PublicLayout;
