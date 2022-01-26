import { Column } from "react-rainbow-components";
import { useAdventurersAffected } from "../../../../../contexts/adventurersAffected";
import { Adventurer, AdventurerProfile } from "../../../../../sdk/adventurers";
import AdventurersListAffect from "../../AdventurersListAffect";
import StatusBadge from "./StatusBadge";

interface CriteresTableProps {
  adventurers: Adventurer[];
  requiredProfiles: AdventurerProfile[];
}

const CriteresTable = ({
  adventurers,
  requiredProfiles,
}: CriteresTableProps) => {
  const { getFiltredAdventurers, setAdventuredAffected } =
    useAdventurersAffected();

  const criteredAdventurers = getFiltredAdventurers
    ? getFiltredAdventurers(requiredProfiles, adventurers)
    : [];

  return (
    <>
      {criteredAdventurers && criteredAdventurers.length > 0 ? (
        <>
          <AdventurersListAffect
            requiredAdventurers={criteredAdventurers}
            StatusColumn={
              <Column
                field="_id"
                component={StatusBadge({ requiredProfiles, adventurers })}
                value={""}
              />
            }
            setSelected={setAdventuredAffected}
            maxRowSelection={requiredProfiles.length}
          />
        </>
      ) : (
        <p>
          Il n'y a pas d'aventuriers disponibles qui correpondent aux critères
        </p>
      )}
    </>
  );
};

export default CriteresTable;
