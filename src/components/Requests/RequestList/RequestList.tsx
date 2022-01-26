import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format, parseISO } from "date-fns";
import { FC, useState } from "react";
import {
  Accordion,
  AccordionSection,
  ButtonIcon,
} from "react-rainbow-components";
import { Request, RequestListType } from "../../../sdk/request";
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
            className="btn-add-request-cy"
          />
          <ModalRequestForm isOpen={isOpen} setOpen={setIsOpen} />
        </span>
      </div>
      {!requests ||
        (requests.length === 0 && <p> Pas de requètes à affecter</p>)}
      <CountOfList>{counts} requètes</CountOfList>
      {requests && requests.length > 0 && (
        <Accordion className="accordion-req-cy">
          {requests.map((req) => {
            const requestToDisplay: Request = {
              _id: req._id,
              awardedExperience: req.awardedExperience,
              bounty: req.bounty,
              dateDebut: format(parseISO(req.dateDebut), "yyyy-MM-dd"),
              dateFin: format(parseISO(req.dateFin), "yyyy-MM-dd"),
              description: req.description,
              name: req.name,
              requiredProfiles: req.requiredProfiles,
              pictureUrl: req.pictureUrl,
              questGiver: req.questGiver,
              status: req.status,
            };
            return (
              <AccordionSection
                label={<Label {...requestToDisplay} />}
                key={req._id}
              >
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