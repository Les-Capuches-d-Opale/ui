import { useState } from "react";
import { Adventurer, AdventurerProfile } from "../../../../sdk/adventurers";
import AdventurersList from "../../../AdventurersList";
import { getSugestedAdventurers } from "../../../../utils/adventurersFilters";
import AffectButton from "./AffectButton";

interface SuggestionTableProps {
  requiredProfiles: AdventurerProfile[];
  requestId: string;
  adventurers: Adventurer[];
}

const SuggestionTable = ({
  requiredProfiles,
  requestId,
  adventurers,
}: SuggestionTableProps) => {
  const [selected, setSelected] = useState<object[]>([]);

  const suggestedAdventurers = getSugestedAdventurers(
    requiredProfiles,
    adventurers
  );

  return (
    <>
      {suggestedAdventurers && suggestedAdventurers.length > 0 ? (
        <>
          <AdventurersList
            adventurers={suggestedAdventurers}
            isSelectionable
            setSelected={setSelected}
            maxRowSelection={requiredProfiles.length}
          />
          <AffectButton
            request={requestId}
            groups={(selected as Adventurer[]).map((ad) => ad._id)}
            disabled={!selected || selected.length === 0}
          />
        </>
      ) : (
        <p>Il n'y a pas de suggestion</p>
      )}
    </>
  );
};

export default SuggestionTable;
