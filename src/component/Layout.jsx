import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="body">
      <div className="overlay">
        <div className="container p-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
