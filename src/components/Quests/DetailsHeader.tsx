import React, { useState } from "react";
import { Avatar } from "react-rainbow-components";
import { Request } from "../../sdk/request";
import ModalUpdateStatus from "./ModalUpdateStatus";
import StatusTextChip from "./StatusTextChip";

const avatarLarge: React.CSSProperties = {
  width: 150,
  height: 150,
};

const headerStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "flex-start",
  marginBottom: "50px",
};

const headerRightStyles: React.CSSProperties = {
  display: "flex",
  flex: 1,
  flexDirection: "column",
  justifyContent: "center",
  marginLeft: "30px",
  maxWidth: "100%",
};

const headerTitle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const questDescriptionStyles: React.CSSProperties = {
  marginBottom: "20px",
};

interface Props {
  questDetails: Request;
}

const DetailsHeader = ({ questDetails }: Props) => {
  const [showModalUpdateStatus, setShowModalUpdateStatus] = useState(false);

  return (
    <div style={headerStyles}>
      <Avatar style={avatarLarge} src="https://picsum.photos/150/150" />
      <div style={headerRightStyles}>
        <div style={headerTitle}>
          <h1>{questDetails.name}</h1>
          <StatusTextChip
            status={questDetails.status}
            setOpen={setShowModalUpdateStatus}
          />
        </div>
        <p style={questDescriptionStyles}>{questDetails.description}</p>
        <p style={{ fontSize: "10px", color: "grey" }}>
          Demande effectuée par{" "}
          <strong style={{ color: "white" }}>{questDetails.questGiver}</strong>
        </p>
      </div>
      <ModalUpdateStatus
        requestId={questDetails._id}
        currentStatus={questDetails.status}
        isOpen={showModalUpdateStatus}
        setOpen={setShowModalUpdateStatus}
      />
    </div>
  );
};

export default DetailsHeader;
