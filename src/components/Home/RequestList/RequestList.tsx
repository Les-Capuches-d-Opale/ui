import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import {
  Accordion,
  AccordionSection,
  Badge,
  ButtonIcon,
} from "react-rainbow-components";
import { RequestListType } from "../../../sdk/request";
import Container from "../../Container";
import ModalRequestForm from "../../RequestForm";
import Label from "./LabelAccordionRequest";
import ChipList from "./ChipList";

const RequestList: FC<RequestListType> = ({ requests }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClick = () => {
    setIsOpen(true);
  };

  return (
    <Container>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>Liste des requètes</h1>
        <span>
          <ButtonIcon
            variant="neutral"
            tooltip="Créer une requête"
            icon={<FontAwesomeIcon icon={faPlus} />}
            onClick={() => handleOnClick()}
          />
          <ModalRequestForm isOpen={isOpen} setOpen={setIsOpen} />
        </span>
      </div>
      {!requests ||
        (requests.length === 0 && <p> Pas de requètes à affecter</p>)}
      {requests && requests.length > 0 && (
        <Accordion>
          {requests.map((req) => {
            return (
              <AccordionSection label={<Label {...req} />} key={req._id}>
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
