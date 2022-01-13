import { useState } from "react";
import { Badge, Column } from "react-rainbow-components";
import { Adventurer, AdventurerProfile } from "../../../../sdk/adventurers";
import AdventurersList from "../../../AdventurersList";
import {
  getFiltredAdventurers,
  getSugestedAdventurers,
} from "../../../../utils/adventurersFilters";
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const StatusBadgeSuggested = ({ value }: any) => {
    return getSugestedAdventurers(requiredProfiles, adventurers)
      .map((ad) => ad._id)
      .includes(value) ? (
      <Badge label="Suggested" variant="outline-brand" />
    ) : null;
  };

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
            StatusColumn={
              <Column field="_id" component={StatusBadgeSuggested} />
            }
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
