import { useQuery } from "react-query";
import { Spinner } from "react-rainbow-components";
import request from "../axios";
import RequestList from "../components/Requests/RequestList/RequestList";

const Request = () => {
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

export default Request;
