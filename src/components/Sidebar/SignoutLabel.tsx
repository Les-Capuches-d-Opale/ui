import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button } from "react-rainbow-components";
import { useAuth } from "../../contexts/auth";

const wrapper: React.CSSProperties = { display: "flex", margin: "auto 0 10px 5px" };

const signoutLabelStyle: React.CSSProperties = {
  color: "#222930",
  textTransform: "initial",
};

const SignoutLabel = () => {
  const [isLoading, setisLoading] = useState(false);
  const { removeAuthUser } = useAuth();

  function signout() {
    setisLoading(true);
    removeAuthUser?.();
    setisLoading(false);
  }

  return (
    <div style={wrapper}>
      <Button variant="border" onClick={signout} isLoading={isLoading}>
        <FontAwesomeIcon color="#222930" icon={faSignOutAlt} style={{ marginRight: "10px" }} />
        <p style={signoutLabelStyle}> Se déconnecter</p>
      </Button>
    </div>
  );
};

export default SignoutLabel;