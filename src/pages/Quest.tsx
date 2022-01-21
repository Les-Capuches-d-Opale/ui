import { useQuery } from "react-query";
import request from "../axios";
import QuestList from "../components/Quests/QuestList";
import { QuestsList } from "../sdk/quest";

const QuestPage = () => {
  const { data, error } = useQuery<QuestsList, Error>("quests list", () =>
    request.get("quests").then((res) => res.data)
  );

  return (
    <>{error || !data ? <p>Erreur: {error}</p> : <QuestList {...data} />}</>
  );
};

export default QuestPage;
