import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import {
  Accordion,
  AccordionSection,
  ButtonIcon,
} from "react-rainbow-components";
import { RequestListType } from "../../../sdk/request";
import Container from "../../Core/Container";
import CountOfList from "../../Core/CountOfList";
import ModalRequestForm from "../../RequestForm";
import BadgeList from "./BadgeList";
import Label from "./LabelAccordionRequest";

const RequestList: FC<RequestListType> = ({ requests, counts }) => {
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
      <CountOfList>{counts} requètes</CountOfList>
      {requests && requests.length > 0 && (
        <Accordion className="list-request-cy">
          {requests.map((req) => {
            return (
              <AccordionSection label={<Label {...req} />} key={req._id}>
                {req.description}
                <div style={{ opacity: 0.5, marginTop: 5 }}>
                  Profils requis :
                </div>
                <BadgeList requiredProfiles={req.requiredProfiles} />
              </AccordionSection>
            );
          })}
        </Accordion>
      )}
    </Container>
  );
};

export default RequestList;
