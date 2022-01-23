import React, { Dispatch, SetStateAction } from "react";

interface OwnProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const Burger = ({ open, setOpen }: OwnProps) => {
  const style: React.CSSProperties = {
    backgroundColor: "rgb(0, 205, 165)",
    left: 28,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    width: 28,
    height: 28,
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "0",
    zIndex: 10,
  };

  const styleWrapper: React.CSSProperties = {
    width: "100%",
    backgroundColor: "rgb(0, 205, 165)",
    display: "flex",
    justifyContent: "center",
    padding: 10,
  };

  const styleDiv: React.CSSProperties = {
    width: 28,
    height: 3,
    background: "#000",
    borderRadius: "10px",
    transition: "all 0.3s linear",
    position: "relative",
    transformOrigin: "1px",
  };

  return (
    <div style={styleWrapper} onClick={() => setOpen(!open)}>
      <div style={style}>
        <div style={styleDiv} />
        <div style={styleDiv} />
        <div style={styleDiv} />
      </div>
    </div>
  );
};

export default Burger;
