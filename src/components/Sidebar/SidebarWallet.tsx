import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import request from "../../axios";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge } from "react-rainbow-components";

const SidebarWallet = () => {
  const [wallet, setWallet] = useState(0);

  const { data: admin } = useQuery("fetchAdmin", () =>
    request.get("/administrators")
  );

  useEffect(() => {
    if (admin?.data) {
      setWallet(admin?.data.wallet);
    }
  }, [admin?.data]);

  return (
    <>
      <Badge
        title="Portefeuille de la guilde"
        className="rainbow-m-around_medium "
        variant="outline-brand"
      >
        <span>
          {wallet} <FontAwesomeIcon icon={faCoins} />
        </span>
      </Badge>
    </>
  );
};

export default SidebarWallet;
