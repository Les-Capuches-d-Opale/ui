import React from "react";
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";
import { layout } from "../../../utils/breakpoints";
import { ReactComponent as Logo } from "../../../assets/logo.svg";
import Routes, { MenuItem } from "../../../sdk/routes";
import CenterBlock from "../../Core/CenterBlock";
import SignoutLabel from "./SignoutLabel";
import SidebarWallet from "../../Sidebar/SidebarWallet";

export const menuItem: MenuItem[] = [
  {
    label: "Tableau de bord",
    to: Routes.HOME,
  },
  {
    label: "Requètes",
    to: Routes.REQUESTS,
  },
  {
    label: "Aventuriers",
    to: Routes.ADVENTURERS,
  },
  {
    label: "Quêtes",
    to: Routes.QUESTS,
  },
  // {
  //   label: "Equipements",
  //   to: Routes.ITEMS,
  // },
  {
    label: "Magasin",
    to: Routes.SHOPS,
  },
];

export const aside: React.CSSProperties = {
  minHeight: "100vh",
  height: "100%",
  position: "sticky",
};

export const container: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  rowGap: "30px",
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

const SidebarMenu = ({ setOpenMobile }: { setOpenMobile?: Function }) => {
  const isBreakpoint = useMediaQuery({ maxWidth: layout.breakpoints.l });

  return (
    <aside style={isBreakpoint ? aside : { ...aside, height: "100vh" }}>
      <nav
        style={
          isBreakpoint ? container : { ...container, padding: "55px 25px 0 0" }
        }
      >
        <CenterBlock>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Logo style={{ maxWidth: "100px", maxHeight: "70px" }} />
            <SidebarWallet />
          </div>
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
              onClick={() => setOpenMobile && setOpenMobile(false)}
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
