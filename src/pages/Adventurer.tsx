import { useQuery } from "react-query";
import { Spinner } from "react-rainbow-components";
import request from "../axios";
import AdventurersList from "../components/AdventurersList";

const Adventurer = () => {

  const { isLoading, error, data: dataAdventurers } = useQuery("fetchAdventurers", () => request.get("/adventurers"));
  
  return [
    <div>
      {isLoading && <Spinner />}
      <AdventurersList adventurers={dataAdventurers?.data} />
    </div>
  ]
};

export default Adventurer;
