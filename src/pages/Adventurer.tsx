import { useQuery } from "react-query";
import { Spinner } from "react-rainbow-components";
import request from "../axios";
import AdventurersList from "../components/AdventurersList";
import Container from "../components/Container";

const Adventurer = () => {
  const { isLoading, data: dataAdventurers } = useQuery("fetchAdventurers", () =>
    request.get("/adventurers")
  );

  console.log("coucou");

  return (
    <Container>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h1>Liste des aventuriers</h1>
          <AdventurersList adventurers={dataAdventurers?.data} />
        </>
      )}
    </Container>
  );
};

export default Adventurer;
