import { useAdventurersAffected } from "../../../../contexts/adventurersAffected";
import { Adventurer, AdventurerProfile } from "../../../../sdk/adventurers";
import AdventurersListAffect from "../AdventurersListAffect";

interface SuggestionTableProps {
  requiredProfiles: AdventurerProfile[];
  adventurers: Adventurer[];
}

const SuggestionTable = ({
  requiredProfiles,
  adventurers,
}: SuggestionTableProps) => {
  const { getSugestedAdventurers, setAdventuredAffected } =
    useAdventurersAffected();

  const suggestedAdventurers = getSugestedAdventurers
    ? getSugestedAdventurers(requiredProfiles, adventurers)
    : [];

  return (
    <>
      {suggestedAdventurers && suggestedAdventurers.length > 0 ? (
        <>
          <AdventurersListAffect
            requiredAdventurers={suggestedAdventurers}
            setSelected={setAdventuredAffected}
            maxRowSelection={requiredProfiles.length}
          />
        </>
      ) : (
        <p>Il n'y a pas de suggestion</p>
      )}
    </>
  );
};

export default SuggestionTable;
