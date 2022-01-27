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

const AvailableAdventurersCount = () => {
  const { data: dataQuests } = useQuery("fetchAvailableAdventurersCount", () =>
    request.get("/adventurers?isAvailableNow=true")
  );
  const availableAdventurersCount = dataQuests?.data.length;

  return (
    <div style={containerStyles}>
      <Card
        title="Aventuriers disponibles"
        style={cardStyles}
        className="responsive-100w"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            flexFlow: "column",
          }}
        >
          <p style={count}>{availableAdventurersCount}</p>
          <p>aventuriers</p>
        </div>
        <CenterBlock>
          <Link to={"/adventurers"}>
            <Button variant="brand" label="Voir les aventuriers" />
          </Link>
        </CenterBlock>
      </Card>
    </div>
  );
};

export default AvailableAdventurersCount;
