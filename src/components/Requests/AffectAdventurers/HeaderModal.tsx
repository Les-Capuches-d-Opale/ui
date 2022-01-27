import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faCalendarWeek } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { Chip } from "react-rainbow-components";
import { AdventurerProfile } from "../../../sdk/adventurers";
import BadgeList from "../RequestList/BadgeList";

type HeaderModalType = {
  requiredProfiles: AdventurerProfile[];
  nameRequest: string;
  dateFin: string;
  dateDebut: string;
};

const HeaderModal: FC<HeaderModalType> = ({
  requiredProfiles,
  nameRequest,
  dateFin,
  dateDebut,
}) => {
  return (
    <>
      <h1 className="modale-h1">
        Choisissez les aventuriers à affecter à la requète
      </h1>

      <div>
        <p className="modale-name-request">{nameRequest}</p>
        <div className="modale-chips-details-request">
          <Chip
            className="rainbow-m-around_medium"
            label={
              <>
                <FontAwesomeIcon
                  icon={faClock}
                  className="rainbow-m-right_xx-small"
                />
                Date de fin: {dateFin}
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
      <div className="modale-badge-criteres-request">
        <p style={{ fontWeight: "bold" }}>Critères demandés</p>
        <BadgeList requiredProfiles={requiredProfiles} />
      </div>
    </>
  );
};

export default HeaderModal;
