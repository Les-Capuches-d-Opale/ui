import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format, parseISO } from "date-fns";
import { Button } from "react-rainbow-components";
import { Link, generatePath } from "react-router-dom";
import { Request } from "../../sdk/request";
import Routes from "../../sdk/routes";

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
          <strong>Date de fin : </strong>
          {format(parseISO(request.dateFin), "dd/MM/yyyy")}
        </p>
        <p>
          <strong>Prime : </strong>
          {request.bounty} <FontAwesomeIcon icon={faCoins} />
        </p>
        <p>
          <strong>Commanditaire : </strong>
          {request.questGiver}
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Link
            to={generatePath(Routes.QUEST, {
              id: questId || "null",
            })}
            style={{ textDecoration: "none" }}
          >
            <Button
              label="+ de détails"
              variant="border"
              className="rainbow-m-around_medium quest-details-btn-cy"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccordionBody;
