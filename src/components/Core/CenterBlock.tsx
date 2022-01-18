import { FC } from "react";

const CenterBlock: FC = ({ children }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
      {children}
    </div>
  );
};

export default CenterBlock;
