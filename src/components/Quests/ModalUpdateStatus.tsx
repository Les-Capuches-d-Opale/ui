import { Dispatch, SetStateAction, useState } from "react";
import { Button, Modal, Select } from "react-rainbow-components";
import { QuestStatus } from "../../sdk/quest";

const content: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const options = [
  { value: QuestStatus.Failed, label: QuestStatus.Failed },
  { value: QuestStatus.Pending, label: QuestStatus.Pending },
  { value: QuestStatus.Succeeded, label: QuestStatus.Succeeded },
];

interface Props {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  currentStatus: QuestStatus;
}

const ModalUpdateStatus = ({ isOpen, setOpen, currentStatus }: Props) => {
  const [statusValue, setStatusValue] = useState(currentStatus);
//   const [isLoading, setisLoading] = useState(false);

  return (
    <Modal
      id="modal-request-form"
      isOpen={isOpen}
      onRequestClose={() => setOpen(false)}
      size="small"
    >
      <div style={content}>
        <h1>Status de la quête</h1>
        <p style={{ margin: "20px 0" }}>Vous allez changer le status de cette quête : </p>
        <Select
          style={{ width: "200px", marginBottom: "20px" }}
          value={statusValue}
          options={options}
          onChange={(values) => setStatusValue(values.target.value as QuestStatus)}
        />
        <Button
          variant="success"
          label="Valider le changement"
          type="submit"
        //   isLoading={isLoading}
        />
      </div>
    </Modal>
  );
};

export default ModalUpdateStatus;
