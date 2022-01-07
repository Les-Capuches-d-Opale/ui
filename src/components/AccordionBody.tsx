import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Request } from "../types/request";
import { secondsToDays } from "../utils/secondsToDays";

interface Props {
  request: Request;
}

const AccordionBody = ({ request }: Props) => {
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
      </div>
    </div>
  );
};

export default AccordionBody;
