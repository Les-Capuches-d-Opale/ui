import { ProgressIndicator, ProgressStep } from "react-rainbow-components";
import { QuestStatus } from "../sdk/quest";

interface Props {
  currentStatus: QuestStatus;
}

const StatusIndicator = ({ currentStatus }: Props) => {
  return (
    <ProgressIndicator currentStepName={currentStatus}>
      <ProgressStep name={QuestStatus.Pending} label={QuestStatus.Pending} />
      <ProgressStep name={QuestStatus.Succeeded} label={QuestStatus.Succeeded} />
      <ProgressStep name={QuestStatus.Failed} label={QuestStatus.Failed} />
    </ProgressIndicator>
  );
};

export default StatusIndicator;
