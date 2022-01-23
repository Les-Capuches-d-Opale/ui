import { useQuery } from "react-query";
import { Spinner } from "react-rainbow-components";
import request from "../axios";
import RequestList from "../components/Home/RequestList/RequestList";

const Home = () => {
  const { isLoading, data: dataRequest } = useQuery("fetchRequest", () =>
    request.get("/requests")
  );

  return (
    <>
      {isLoading && <Spinner className="loader-cy" />}
      <RequestList {...dataRequest?.data} />
    </>
  );
};

export default Home;
