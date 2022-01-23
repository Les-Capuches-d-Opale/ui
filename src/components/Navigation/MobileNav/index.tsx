import React, { useState } from "react";
import SidebarMenu from "../Sidebar/SidebarMenu";
import Burger from "./Burger";

const MobileHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div>
        <Burger open={open} setOpen={setOpen} />
      </div>
      {open && <SidebarMenu setOpenMobile={setOpen} />}
    </>
  );
};

export default MobileHeader;
