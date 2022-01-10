import { AvatarGroup } from "react-rainbow-components";
import { Adventurer } from "../../sdk/adventurers";
import { QuestStatus } from "../../sdk/quest";
import StatusIndicator from "./StatusIndicator";

interface Props {
  label: string;
  adventurers: Adventurer[];
  questStatus: QuestStatus;
}

type AvatarGroupType = {
  src: string;
};

const QuestLabel = ({label, adventurers, questStatus }: Props) => {

  const avatars: AvatarGroupType[] = [];

  adventurers.forEach((adventurer) => {    
    avatars.push({ src: adventurer.pictureUrl });
  });
 
  return (
    <div className="quest-label">
      <p>{label}</p>
      <div>
        <StatusIndicator currentStatus={questStatus} />
        <AvatarGroup avatars={avatars} maxAvatars={3} showCounter/>
      </div>
    </div>
  );
};

export default QuestLabel;
