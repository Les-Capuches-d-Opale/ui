import { FC, useState } from "react";
import { Avatar, Button } from "react-rainbow-components";
import { Request } from "../../../sdk/request";
import secondsToDays from "../../../utils/secondsToDays";
import ModalAffectAdventurers from "../AffectAdventurers";

const Label: FC<Request> = ({
  pictureUrl,
  name,
  questGiver,
  _id,
  requiredProfiles,
  bounty,
  duration,
  dateDebut,
}) => {
  const [isOpen, setOpen] = useState<boolean>(false);

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

      {requiredProfiles && requiredProfiles.length > 0 && (
        <Button variant="brand" onClick={() => setOpen(!isOpen)}>
          Affecter des aventuriers
        </Button>
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
    </div>
  );
};

export default Label;
