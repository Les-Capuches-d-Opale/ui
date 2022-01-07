import { FC, useState } from "react";
import {
  Accordion,
  AccordionSection,
  Avatar,
  Badge,
  Button,
  Chip,
} from "react-rainbow-components";
import { Request, RequestListType } from "../types/request";
import Container from "./Container";
import ModalAffectAdventers from "./ModalAffectAdventers";
import { format } from "date-fns";

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

const RequestList: FC<RequestListType> = ({ requests }) => {
  return (
    <Container>
      <h1>Liste des requètes</h1>
      {!requests ||
        (requests.length === 0 && <p> Pas de requètes à affecter</p>)}
      {requests && requests.length > 0 && (
        <Accordion>
          {requests.map((req) => {
            return (
              <>
                <AccordionSection label={<Label {...req} />}>
                  {req.description}
                  <div style={{ opacity: 0.5, marginTop: 5 }}>
                    Profils requis :
                  </div>
                  {req.requiredProfiles &&
                    req.requiredProfiles.length > 0 &&
                    req.requiredProfiles.map((profile, i) => {
                      return (
                        <Badge
                          style={{ marginLeft: 0, marginRight: 10 }}
                          key={i}
                          className="rainbow-m-around_medium"
                          label={`${profile.speciality?.name} ${profile.experience}XP`}
                          variant="outline-brand"
                        />
                      );
                    })}
                </AccordionSection>
              </>
            );
          })}
        </Accordion>
      )}
    </Container>
  );
};

export default RequestList;
