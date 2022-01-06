import { FC, useState } from "react";
import {
  Accordion,
  AccordionSection,
  Avatar,
  Button,
} from "react-rainbow-components";
import { Request, RequestListType } from "../types/request";
import Container from "./Container";
import ModalAffectAdventers from "./ModalAffectAdventers";

const Label: FC<Request> = ({
  pictureUrl,
  name,
  questGiver,
  _id,
  requiredProfiles,
}) => {
  const [isOpen, setOpen] = useState<boolean>(false);

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

const RequestList: FC<RequestListType> = ({ requests }) => {
  console.log("request", requests);
  return (
    <Container>
      <h1>Liste des requètes</h1>
      {!requests ||
        (requests.length === 0 && <p> Pas de requètes à affecter</p>)}
      {requests && requests.length > 0 && (
        <Accordion>
          {requests.map((req) => {
            return (
              <AccordionSection label={<Label {...req} />}>
                A rainbow is a meteorological phenomenon that is caused by
                reflection, refraction and dispersion of light in water droplets
                resulting in a spectrum of light appearing in the sky.
              </AccordionSection>
            );
          })}
        </Accordion>
      )}
    </Container>
  );
};

export default RequestList;
