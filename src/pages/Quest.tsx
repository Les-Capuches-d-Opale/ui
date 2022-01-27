import { useQuery } from "react-query";
import request from "../axios";
import { Spinner } from "react-rainbow-components";
import QuestList from "../components/Quests/QuestList";
import { QuestsList } from "../sdk/quest";

const QuestPage = () => {
  const { data, error, isLoading } = useQuery<QuestsList, Error>(
    "quests list",
    () => request.get("quests").then((res) => res.data)
  );

  return (
    <>
      {isLoading || error ? (
        <Spinner className="loader-cy" />
      ) : (
        <QuestList {...data!} />
      )}
    </>
  );
};

export default QuestPage;
