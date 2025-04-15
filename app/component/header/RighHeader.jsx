import React from "react";
function RightHeader({ children }) {
  return (
    <div className="grow flex items-center">
      {children}
    </div>
  );
}

export default RightHeader;