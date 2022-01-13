import { useState } from "react";
import { Adventurer, AdventurerProfile } from "../../../../sdk/adventurers";
import { getFiltredAdventurers } from "../../../../utils/adventurersFilters";
import AdventurersList from "../../../AdventurersList";
import AffectButton from "./AffectButton";

interface CriteresTableProps {
  adventurers: Adventurer[];
  requiredProfiles: AdventurerProfile[];
  requestId: string;
}

const CriteresTable = ({
  adventurers,
  requiredProfiles,
  requestId,
}: CriteresTableProps) => {
  const [selected, setSelected] = useState<object[]>([]);

  const criteredAdventurers = getFiltredAdventurers(
    requiredProfiles,
    adventurers
  );

  return (
    <>
      {criteredAdventurers && criteredAdventurers.length > 0 ? (
        <>
          <AdventurersList
            adventurers={criteredAdventurers}
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
        <p>
          Il n'y a pas d'aventuriers disponibles qui correpondent aux critères
        </p>
      )}
    </>
  );
};

export default CriteresTable;
