import { FC } from "react";
import { Accordion, AccordionSection } from "react-rainbow-components";
import { RequestListType } from "../../../types/request";
import Container from "../../Container";
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
