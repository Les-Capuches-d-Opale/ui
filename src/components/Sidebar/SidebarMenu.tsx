import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import Routes, { MenuItem } from "../../sdk/routes";
import CenterBlock from "../Core/CenterBlock";
import SignoutLabel from "./SignoutLabel";

const menuItem: MenuItem[] = [
  {
    label: "Requètes",
    to: Routes.HOME,
  },
  {
    label: "Aventuriers",
    to: Routes.ADVENTURERS,
  },
  {
    label: "Quêtes",
    to: Routes.QUESTS,
  },
  {
    label: "Equipements",
    to: Routes.ITEMS,
  },
];

const aside: React.CSSProperties = {
  height: "100vh",
  position: "sticky",
};

const container: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  rowGap: "30px",
  padding: "55px 25px 0 0",
  backgroundColor: "#383e45",
  height: "100%",
  fontWeight: "bold",
  textTransform: "uppercase",
};

const linkStyle: React.CSSProperties = {
  color: "#eeeeee",
  padding: "20px",
};

const activeStyle: React.CSSProperties = {
  color: "#eeeeee",
  textDecoration: "none",
  backgroundColor: "#00cda5",
  borderRadius: "0 30px 30px 0",
  padding: "20px",
  boxShadow: "rgb(0 205 165 / 24%) 0 8px 16px 0",
};

const SidebarMenu = () => {
  return (
    <aside style={aside}>
      <nav style={container}>
        <CenterBlock>
          <Logo style={{ maxWidth: "100px", maxHeight: "70px" }} />
        </CenterBlock>
        {menuItem.map((item, index) => {
          return (
            <NavLink
              key={index}
              to={item.to}
              role="navigation-item"
              style={linkStyle}
              className="nav-link"
              activeStyle={activeStyle}
            >
              {item.label}
            </NavLink>
          );
        })}
        <SignoutLabel />
      </nav>
    </aside>
  );
};

export default SidebarMenu;
