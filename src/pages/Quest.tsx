import { useQuery } from "react-query";
import request from "../axios";
import QuestList from "../components/Quests/QuestList";
import { Quests } from "../sdk/quest";

const Quest = () => {
  const { data } = useQuery<Quests[], Error>("quests list", () =>
    request.get("quests").then((res) => res.data)
  );

  return (
    <div>
      <QuestList quests={data} />
    </div>
  );
};

export default Quest;
