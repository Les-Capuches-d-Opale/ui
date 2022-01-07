import { FC, useState } from "react";
import { useQuery } from "react-query";
import { Avatar, Button } from "react-rainbow-components";
import request from "../../../axios";
import { Request } from "../../../types/request";
import ModalAffectAdventers from "./ModalAffectAdventers";

const Label: FC<Request> = ({
  pictureUrl,
  name,
  questGiver,
  _id,
  requiredProfiles,
}) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const {
    isLoading,
    error,
    data: dataAdventurers,
  } = useQuery("fetchAdventurers", () => request.get("/adventurers"));

  return (
    <div className="label-request">
      <div className="label-request-info">
        <Avatar src={pictureUrl} size="medium" style={{ objectFit: "cover" }} />
        <div>
          <p>{name}</p>
          <p style={{ opacity: 0.5, marginTop: 5 }}>{questGiver}</p>
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
