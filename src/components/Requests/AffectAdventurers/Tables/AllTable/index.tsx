import { Column } from "react-rainbow-components";
import { useAdventurersAffected } from "../../../../../contexts/adventurersAffected";
import { Adventurer, AdventurerProfile } from "../../../../../sdk/adventurers";
import AdventurersListAffect from "../../AdventurersListAffect";
import StatusBadge from "./StatusBadge";

interface AllTableProps {
  adventurers: Adventurer[];
  requiredProfiles: AdventurerProfile[];
}

const AllTable = ({ adventurers, requiredProfiles }: AllTableProps) => {
  const { getAllAdventurers, setAdventuredAffected } = useAdventurersAffected();

  const allAdenturersWithRequiredProfiles = getAllAdventurers
    ? getAllAdventurers(requiredProfiles, adventurers)
    : [];

  return (
    <>
      <AdventurersListAffect
        requiredAdventurers={allAdenturersWithRequiredProfiles}
        StatusColumn={
          <Column
            header=""
            field="_id"
            component={StatusBadge({ requiredProfiles, adventurers })}
            value={""}
          />
        }
        setSelected={setAdventuredAffected}
        maxRowSelection={requiredProfiles.length}
      />
    </>
  );
};

export default AllTable;
