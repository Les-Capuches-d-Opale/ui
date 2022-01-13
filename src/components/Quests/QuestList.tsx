import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion, AccordionSection, ButtonIcon } from "react-rainbow-components";
import { Quests } from "../../sdk/quest";
import AccordionBody from "./AccordionBody";
import Container from "../Container";
import QuestLabel from "./QuestLabel";

interface Props {
  quests?: Quests[];
}

const QuestList = ({ quests }: Props) => {
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
        <h1>Liste des quètes</h1>
        <span>
          <ButtonIcon
            variant="neutral"
            tooltip="Initialiser une quête"
            icon={<FontAwesomeIcon icon={faPlus} />}
            onClick={() => console.log("open modal")}
          />
        </span>
      </div>
      <Accordion>
        {quests &&
          quests.map((req, id) => {
            return (
              <AccordionSection
                key={id}
                label={
                  <QuestLabel
                    label={req.request.name}
                    questStatus={req.request.status}
                    adventurers={req.groups}
                    
                  />
                }
              >
                <AccordionBody questId={req._id} request={req.request} />
              </AccordionSection>
            );
          })}
      </Accordion>
    </Container>
  );
};

export default QuestList;
