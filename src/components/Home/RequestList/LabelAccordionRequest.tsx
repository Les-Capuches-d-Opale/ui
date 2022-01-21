import { AxiosResponse } from "axios";
import { FC, useState } from "react";
import { useMutation } from "react-query";
import { Avatar, Button } from "react-rainbow-components";
import request from "../../../axios";
import { QuestStatus } from "../../../sdk/quest";
import { Request } from "../../../sdk/request";
import secondsToDays from "../../../utils/secondsToDays";
import ValidationModale from "../../Core/ValidationModale";
import ModalAffectAdventurers from "../AffectAdventurers";

interface PayloadType {
  status: QuestStatus;
}

const Label: FC<Request> = ({
  pictureUrl,
  name,
  questGiver,
  _id,
  requiredProfiles,
  bounty,
  duration,
  dateDebut,
  status,
}) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isOpenValidationRefuse, setOpenValidationRefuse] =
    useState<boolean>(false);

  const { mutateAsync } = useMutation<AxiosResponse, Error, PayloadType>(
    (params) => request.put(`requests/${_id}`, params)
  );

  const isRejected = status === QuestStatus.Rejected;

  return (
    <div className="label-request">
      <div className="label-request-info">
        <Avatar src={pictureUrl} size="medium" />
        <div>
          <p>{name}</p>
          <p style={{ opacity: 0.5, marginTop: 5 }}>{questGiver}</p>
        </div>
        <div>
          <p>Durée :{secondsToDays(duration)}</p>
          <p style={{ opacity: 0.5, marginTop: 5 }}>
            Début : {dateDebut || "?"}
          </p>
        </div>
        <div>
          <p>Prime :{bounty} PO</p>
        </div>
      </div>
      {requiredProfiles && requiredProfiles.length > 0 && !isRejected && (
        <>
          <Button
            variant="outline-brand"
            className="error-outlined-btn"
            onClick={() => setOpenValidationRefuse(!isOpenValidationRefuse)}
          >
            Rejeter
          </Button>
          <Button variant="brand" onClick={() => setOpen(!isOpen)}>
            Affecter
          </Button>
        </>
      )}
      {isRejected && (
        <p style={{ fontStyle: "italic", color: "rgb(254, 72, 73)" }}>
          Requète rejetée
        </p>
      )}

      {isOpen && (
        <ModalAffectAdventurers
          isOpen={isOpen}
          setOpen={setOpen}
          requestId={_id}
          requiredProfiles={requiredProfiles}
          nameRequest={name}
          duration={duration}
          dateDebut={dateDebut}
        />
      )}
      {isOpenValidationRefuse && (
        <ValidationModale
          isOpen={isOpenValidationRefuse}
          setOpen={setOpenValidationRefuse}
          title="Etes vous sur de vouloir refuser cette requète ?"
          content="⚠️ Cette action est irréversible"
          onValidate={async () =>
            await mutateAsync({ status: QuestStatus.Rejected })
          }
        />
      )}
    </div>
  );
};

export default Label;
