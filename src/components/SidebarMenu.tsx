import { NavLink } from "react-router-dom";
import Routes, { MenuItem } from "../sdk/routes";



const menuItem: MenuItem[] = [
  {
    label: "Accueil",
    to: Routes.HOME,
  },
  {
    label: "Requêtes",
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
  {
    label: "Equipements",
    to: Routes.ITEMS,
  },
];

const aside = {
  height: "100vh",
};

const SidebarMenu = () => {
  return (
    <aside style={aside}>
      <nav className="sidebar">
        {menuItem.map((item, index) => {
          return (
            <NavLink key={index} to={item.to} role="navigation-item">
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default SidebarMenu;
