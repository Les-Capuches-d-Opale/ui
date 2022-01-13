import { useQuery } from "react-query";
import { Spinner } from "react-rainbow-components";
import request from "../axios";
import AdventurersList from "../components/AdventurersList";
import Container from "../components/Container";

const Adventurer = () => {
  const { isLoading, data: dataAdventurers } = useQuery(
    "fetchAdventurers",
    () => request.get("/adventurers")
  );

  return (
    <Container>
      {isLoading ? (
        <Spinner />
      ) : (
        <AdventurersList adventurers={dataAdventurers?.data} />
      )}
    </Container>
  );
};

export default Adventurer;