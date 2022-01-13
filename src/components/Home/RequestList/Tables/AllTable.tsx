import { useState } from "react";
import { Badge, Column } from "react-rainbow-components";
import { Adventurer, AdventurerProfile } from "../../../../sdk/adventurers";
import AdventurersList from "../../../AdventurersList";
import {
  getFiltredAdventurers,
  getSugestedAdventurers,
} from "../../../../utils/adventurersFilters";
import AffectButton from "./AffectButton";

interface AllTableProps {
  adventurers: Adventurer[];
  requiredProfiles: AdventurerProfile[];
  requestId: string;
}

const AllTable = ({
  adventurers,
  requiredProfiles,
  requestId,
}: AllTableProps) => {
  const [selected, setSelected] = useState<object[]>([]);

  console.log("couou");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const StatusBadgeSuggested = ({ value }: any) => {
    if (
      getSugestedAdventurers(requiredProfiles, adventurers)
        .map((ad) => ad._id)
        .includes(value)
    ) {
      return <Badge label="Suggested" variant="outline-brand" />;
    }

    if (
      getFiltredAdventurers(requiredProfiles, adventurers)
        .map((ad) => ad._id)
        .includes(value)
    ) {
      return <Badge label="Critères ✅" variant="lightest" />;
    }

    return <></>;
  };

  return (
    <>
      <AdventurersList
        adventurers={adventurers}
        isSelectionable
        StatusColumn={
          <Column header="" field="_id" component={StatusBadgeSuggested} />
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
  );
};

export default AllTable;
