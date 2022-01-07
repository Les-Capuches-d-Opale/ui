import { format } from "date-fns";
import { FC, useState } from "react";
import { Avatar, Button } from "react-rainbow-components";
import { Request } from "../../../types/request";
import ModalAffectAdventers from "../../ModalAffectAdventers";

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
          <p>Durée : {duration}</p>
          <p style={{ opacity: 0.5, marginTop: 5 }}>
            Début :{" "}
            {dateDebut ? format(new Date(dateDebut), "MM/dd/yyyy") : "?"}
          </p>
        </div>
        <div>
          <p>Prime : {bounty} PO</p>
        </div>
      </div>

      <Button variant="brand" onClick={() => setOpen(!isOpen)}>
        Affecter des aventuriers
      </Button>
      {isOpen && (
        <ModalAffectAdventers
          isOpen={isOpen}
          setOpen={setOpen}
          requestId={_id}
          requiredProfiles={requiredProfiles}
        />
      )}
    </div>
  );
};

export default Label;
