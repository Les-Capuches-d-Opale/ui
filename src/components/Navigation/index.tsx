import { useMediaQuery } from "react-responsive";
import { layout } from "../../utils/breakpoints";
import MobileHeader from "./MobileNav";
import SidebarMenu from "./Sidebar/SidebarMenu";

const Header = () => {
  const isBreakpoint = useMediaQuery({ maxWidth: layout.breakpoints.l });

  return (
    <>
      {!isBreakpoint && <SidebarMenu />}
      {isBreakpoint && <MobileHeader />}
    </>
  );
};

export default Header;
