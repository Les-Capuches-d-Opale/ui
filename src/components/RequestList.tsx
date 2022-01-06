import { FC, useState } from "react";
import {
  Accordion,
  AccordionSection,
  Avatar,
  Button,
} from "react-rainbow-components";
import Container from "./Container";
import ModalAffectAdventers from "./ModalAffectAdventers";

type Request = {
  profilPicture: string;
  name: string;
  questGiver: string;
  bounty: number;
  duration: number;
  startDate: Date;
};

type RequestListType = {
  requests: Request[];
};

const Label: FC<Request> = ({ profilPicture, name, questGiver }) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <div className="label-request">
      <div className="label-request-info">
        <Avatar src={profilPicture} size="medium" />
        <div>
          <p>{name}</p>
          <p style={{ opacity: 0.5, marginTop: 5 }}>{questGiver}</p>
        </div>
      </div>

      <Button variant="brand" onClick={() => setOpen(!isOpen)}>
        Affecter des aventuriers
      </Button>
      <ModalAffectAdventers isOpen={isOpen} setOpen={setOpen} />
    </div>
  );
};

const RequestList: FC<RequestListType> = ({ requests }) => {
  return (
    <Container>
      <h1>Liste des requètes</h1>
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
    </Container>
  );
};

export default RequestList;
