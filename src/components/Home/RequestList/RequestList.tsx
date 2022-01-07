import { FC } from "react";
import { Accordion, AccordionSection, Badge } from "react-rainbow-components";
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
            );
          })}
        </Accordion>
      )}
    </Container>
  );
};

export default RequestList;
