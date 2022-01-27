import React from "react";
import { Avatar } from "react-rainbow-components";
import { Request } from "../../sdk/request";
import StatusTextChip from "./StatusTextChip";

const avatarLarge: React.CSSProperties = {
  width: 150,
  height: 150,
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
  requestDetails: Request;
}

const DetailsHeader = ({ requestDetails }: Props) => {
  return (
    <div className="quest-header-style">
      <Avatar style={avatarLarge} src="https://picsum.photos/150/150" />
      <div style={headerRightStyles}>
        <div style={headerTitle}>
          <h1>{requestDetails.name}</h1>
          <StatusTextChip status={requestDetails.status} />
        </div>
        <p style={questDescriptionStyles}>{requestDetails.description}</p>
        <p style={{ fontSize: "10px", color: "grey" }}>
          Demande effectuée par{" "}
          <strong style={{ color: "white" }}>
            {requestDetails.questGiver}
          </strong>
        </p>
      </div>
    </div>
  );
};

export default DetailsHeader;
