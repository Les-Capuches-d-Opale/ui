import { CSSProperties } from "react";
import { AvatarGroup } from "react-rainbow-components";
import { Adventurer } from "../../sdk/adventurers";
import { QuestStatus } from "../../sdk/quest";
import StatusIndicator from "./StatusIndicator";

const contentLabel: CSSProperties = {
  display: "flex",
  alignItems: "center",
  fontSize: "0.725rem",
  color: "rgba(178,178,178,1)",
};

interface Props {
  label: string;
  adventurers: Adventurer[];
  questStatus: QuestStatus;
}

type AvatarGroupType = {
  src: string;
};

const QuestLabel = ({ label, adventurers, questStatus }: Props) => {
  const avatars: AvatarGroupType[] = [];

  adventurers.forEach((adventurer) => {
    avatars.push({ src: adventurer.pictureUrl });
  });

  return (
    <div className="quest-label">
      <p>{label}</p>
      <div>
        {questStatus === QuestStatus.Accepted ? (
          <div className={"status " + questStatus} style={contentLabel}>
            {questStatus}
          </div>
        ) : (
          <StatusIndicator currentStatus={questStatus} />
        )}
        <AvatarGroup
          style={{ marginLeft: 10 }}
          avatars={avatars}
          maxAvatars={3}
          showCounter
        />
      </div>
    </div>
  );
};

export default QuestLabel;
