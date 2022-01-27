import { Accordion, AccordionSection } from "react-rainbow-components";
import { QuestsList } from "../../sdk/quest";
import Container from "../Core/Container";
import CountOfList from "../Core/CountOfList";
import AccordionBody from "./AccordionBody";
import QuestLabel from "./QuestLabel";

const QuestList = ({ quests, counts }: QuestsList) => {
  return (
    <Container>
      <h1>Liste des quètes</h1>

      <CountOfList>{counts} quètes</CountOfList>
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
