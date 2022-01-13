import { FC } from "react";
import { Accordion, AccordionSection, Badge } from "react-rainbow-components";
import { RequestListType } from "../../../sdk/request";
import Container from "../../Container";
import ChipList from "./ChipList";
import Label from "./LabelAccordionRequest";

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
              <AccordionSection label={<Label {...req} />}>
                {req.description}
                <div style={{ opacity: 0.5, marginTop: 5 }}>
                  Profils requis :
                </div>
                <ChipList requiredProfiles={req.requiredProfiles} />
              </AccordionSection>
            );
          })}
        </Accordion>
      )}
    </Container>
  );
};

export default RequestList;
