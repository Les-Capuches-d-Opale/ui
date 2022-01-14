import { AxiosResponse } from "axios";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Button, Modal, Select } from "react-rainbow-components";
import request from "../../axios";
import { QuestStatus, Quests } from "../../sdk/quest";

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
  requestId: string;
}

type UpdateValue = {
  request: string;
  status: QuestStatus;
};

const ModalUpdateStatus = ({
  isOpen,
  setOpen,
  currentStatus,
  requestId,
}: Props) => {
  const queryClient = useQueryClient();

  const [statusValue, setStatusValue] = useState<QuestStatus>(currentStatus);
  const [isLoading, setisLoading] = useState(false);

  const { handleSubmit } = useForm<UpdateValue>();

  const { mutateAsync } = useMutation<
    AxiosResponse<Quests>,
    Error,
    UpdateValue
  >((params) => request.put(`/quests`, params), {
    onSuccess: () => queryClient.invalidateQueries(),
  });

  const onSubmit = handleSubmit(async () => {
    const data = { request: requestId, status: statusValue };
    setisLoading(true);
    await mutateAsync(data);
    setisLoading(false);
  });

  return (
    <Modal
      id="modal-request-form"
      isOpen={isOpen}
      onRequestClose={() => setOpen(false)}
      size="small"
    >
      <div style={content}>
        <h1>Status de la quête</h1>
        <p style={{ margin: "20px 0" }}>
          Vous allez changer le status de cette quête :{" "}
        </p>
        <form onSubmit={onSubmit}>
          <Select
            style={{ width: "200px", marginBottom: "20px" }}
            name="status"
            value={statusValue}
            options={options}
            onChange={(values) =>
              setStatusValue(values.target.value as QuestStatus)
            }
          />
          <Button
            variant="success"
            label="Valider le changement"
            type="submit"
            isLoading={isLoading}
          />
        </form>
      </div>
    </Modal>
  );
};

export default ModalUpdateStatus;
