import * as React from "react";

type RowProps = {
  children: React.ReactNode;
};
const KeypadRow = ({ children }: RowProps) => {
  return <div className="flex space-x-4">{children}</div>;
};

export default KeypadRow;
