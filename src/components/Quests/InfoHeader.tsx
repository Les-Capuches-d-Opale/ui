import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format, parseISO } from "date-fns";
import { Request } from "../../sdk/request";
import { getEndDate } from "../../utils/getEndDate";

const content: React.CSSProperties = {
  display: "flex",
  flex: 1,
  justifyContent: "space-between",
  marginBottom: "30px",
};

const info: React.CSSProperties = {
  fontSize: "16px",
};

const strongStyle: React.CSSProperties = {
  color: "grey",
};

interface Props {
  requestInfo: Request;
}

const InfoHeader = ({ requestInfo }: Props) => {
  return (
    <div style={content}>
      <p style={info}>
        <strong style={strongStyle}>Prime : </strong>
        {requestInfo.bounty} <FontAwesomeIcon icon={faCoins} />
      </p>
      <p style={info}>
        <strong style={strongStyle}>EXP : </strong>
        {requestInfo.awardedExperience}
      </p>
      <div>
        <p style={info}>
          <strong style={strongStyle}>Date de début : </strong>
          {format(parseISO(requestInfo.dateDebut), "dd/MM/yyyy")}
        </p>
        <p style={info}>
          <strong style={strongStyle}>Date de fin : </strong>
          {getEndDate(requestInfo.dateDebut, requestInfo.duration)}
        </p>
      </div>
    </div>
  );
};

export default InfoHeader;
