import { FC } from "react";

const CountOfList: FC = ({ children }) => {
  return (
    <div className="count-of-list">
      <p>{children}</p>
    </div>
  );
};

export default CountOfList;
