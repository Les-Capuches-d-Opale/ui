import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-rainbow-components";
import { generatePath, Link } from "react-router-dom";
import { Request } from "../sdk/request";
import Routes from "../sdk/routes";
import { secondsToDays } from "../utils/secondsToDays";

interface Props {
  questId: string;
  request: Request;
}

const AccordionBody = ({ questId, request }: Props) => {
  return (
    <div>
      <p>{request.description}</p>
      <div>
        <p>
          <strong>Durée : </strong>
          {secondsToDays(request.duration)}
        </p>
        <p>
          <strong>Prime : </strong>
          {request.bounty} <FontAwesomeIcon icon={faCoins} />
        </p>
        <p>
          <strong>Commanditaire : </strong>
          {request.questGiver}
        </p>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <Link
            to={generatePath(Routes.QUEST, {
              id: questId || "null",
            })}
            style={{ textDecoration: "none" }}
          >
            <Button label="+ de détails" variant="border" className="rainbow-m-around_medium" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccordionBody;
