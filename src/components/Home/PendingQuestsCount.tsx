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

const PendingQuestsCount = () => {
  const { data: dataQuests } = useQuery("fetchPendindQuestsCount", () =>
    request.get("/quests?type=Pending")
  );
  const pendingQuestsCount = dataQuests?.data.quests.length;

  return (
    <div style={containerStyles}>
      <Card
        title="Quêtes en cours"
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
          <p style={count}>{pendingQuestsCount}</p>
          <p>quêtes</p>
        </div>
        <CenterBlock>
          <Link to={"/quests"}>
            <Button variant="brand" label="Voir les quêtes" />
          </Link>
        </CenterBlock>
      </Card>
    </div>
  );
};

export default PendingQuestsCount;
