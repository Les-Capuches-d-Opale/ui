import { useQuery } from "react-query";
import { Button, Card } from "react-rainbow-components";
import request from "../../axios";
import CenterBlock from "../Core/CenterBlock";
import { Link } from "react-router-dom";

const containerStyles = {
  margin: "auto",
};

const cardStyles = {
  height: 310,
  width: 460,
  paddingRight: "24px",
  paddingLeft: "24px",
  display: "flex",
  flexFlow: "column",
};

const count = {
  fontFamily: "Cinzel Decorative",
  fontWeight: 900,
  fontSize: "4em",
  margin: "12px 0",
};

const RequestsAvailableCount = () => {
  const { data: dataRequests } = useQuery("fetchRequestsCount", () =>
    request.get("/requests")
  );
  const requestsCount = dataRequests?.data.requests.length;

  return (
    <div style={containerStyles}>
      <Card title="Requêtes disponibles" style={cardStyles}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            flexFlow: "column",
          }}
        >
          <p style={count}>{requestsCount}</p>
          <p>requêtes</p>
        </div>
        <CenterBlock>
          <Link to={"/requests"}>
            <Button variant="brand" label="Voir les requêtes" />
          </Link>
        </CenterBlock>
      </Card>
    </div>
  );
};

export default RequestsAvailableCount;
