import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faCalendarWeek } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { Chip } from "react-rainbow-components";
import { AdventurerProfile } from "../../../sdk/adventurers";
import secondsToDays from "../../../utils/secondsToDays";
import BadgeList from "../RequestList/BadgeList";

type HeaderModalType = {
  requiredProfiles: AdventurerProfile[];
  nameRequest: string;
  duration: number;
  dateDebut: string;
};

const HeaderModal: FC<HeaderModalType> = ({
  requiredProfiles,
  nameRequest,
  duration,
  dateDebut,
}) => {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>
        Choisissez les aventuriers à affecter à la requète
      </h1>

      <div>
        <p
          style={{
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          {nameRequest}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "30px",
          }}
        >
          <Chip
            className="rainbow-m-around_medium"
            label={
              <>
                <FontAwesomeIcon
                  icon={faClock}
                  className="rainbow-m-right_xx-small"
                />
                Durée: {secondsToDays(duration)}
              </>
            }
          />

          <Chip
            className="rainbow-m-around_medium"
            label={
              <>
                <FontAwesomeIcon
                  icon={faCalendarWeek}
                  className="rainbow-m-right_xx-small"
                />
                Date de début : {dateDebut}
              </>
            }
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 20,
          marginBottom: 50,
        }}
      >
        <p style={{ fontWeight: "bold" }}>Critères demandés</p>
        <BadgeList requiredProfiles={requiredProfiles} />
      </div>
    </>
  );
};

export default HeaderModal;
