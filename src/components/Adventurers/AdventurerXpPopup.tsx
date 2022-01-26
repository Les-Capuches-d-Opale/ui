import { AxiosResponse } from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Badge, Button, Input, Modal } from "react-rainbow-components";
import request from "../../axios";
import CenterBlock from "../Core/CenterBlock";

export interface PropsAdventurerXpPopup {
  xp: number;
  adventurerId: string;
  isOpen: boolean;
  setOpen: (value: boolean) => void;
}

const inputStyles = {
  width: "80%",
};

const AdventurerXpPopup = ({
  xp,
  adventurerId,
  isOpen = false,
  setOpen,
}: PropsAdventurerXpPopup) => {
  const [xpValue, setXpValue] = useState(0);

  const closeXpPopup = () => {
    setOpen(false);
    setXpValue(0);
  };

  const updateXpValue = (e: number) => {
    setXpValue(e);
  };

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation<
    AxiosResponse,
    Error,
    { experience: number }
  >((params) => request.put(`/adventurers/${adventurerId}`, params), {
    onSuccess: () => queryClient.invalidateQueries(),
  });

  return (
    <Modal isOpen={isOpen} onRequestClose={closeXpPopup}>
      <h1 style={{ textAlign: "center" }}>
        Ajouter de l'expérience à cet aventurier
      </h1>
      <CenterBlock>
        <Badge
          style={{ marginLeft: 0, marginRight: 10 }}
          className="rainbow-m-around_medium"
          label={`Actuellement : ${xp} XP.`}
          variant="outline-brand"
        />
      </CenterBlock>
      <Input
        type="number"
        label={`Combien souhaitez vous ajouter ?`}
        placeholder="EXP"
        style={inputStyles}
        className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
        value={xpValue}
        onChange={(e) => updateXpValue(Number(e.target.value))}
      />
      <CenterBlock>
        <Button
          variant="brand"
          label="Modifier"
          onClick={async () => {
            await mutateAsync({ experience: xpValue });
            setOpen(false);
          }}
        />
      </CenterBlock>
    </Modal>
  );
};

export default AdventurerXpPopup;
