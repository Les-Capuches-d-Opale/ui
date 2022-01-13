import { useState } from "react";
import { Tab, Tabset } from "react-rainbow-components";
import { Adventurer, AdventurerProfile } from "../../../../sdk/adventurers";
import CriteresTable from "./CriteresTable";
import SuggestionTable from "./SuggestionTable";

interface TablesTabProps {
  requiredProfiles: AdventurerProfile[];
  adventurers: Adventurer[];
  requestId: string;
}

const TablesTab = ({
  adventurers,
  requiredProfiles,
  requestId,
}: TablesTabProps) => {
  const [selectedTab, setSelectedTab] = useState<string>("suggestion");

  return (
    <>
      <Tabset
        id="tabset-1"
        fullWidth
        onSelect={(e, selected) => setSelectedTab(selected)}
        activeTabName={selectedTab}
        className="rainbow-p-horizontal_x-large tablist"
      >
        <Tab
          label="Notre suggestion"
          name="suggestion"
          id="suggestion"
          ariaControls="suggestionTab"
        />

        <Tab
          label="Les aventuriers qui repondent aux critères"
          name="criteres"
          id="criteres"
          ariaControls="criteresTab"
        />
      </Tabset>

      {selectedTab === "suggestion" && (
        <SuggestionTable
          requestId={requestId}
          requiredProfiles={requiredProfiles}
          adventurers={adventurers}
        />
      )}

      {selectedTab === "criteres" && (
        <CriteresTable
          requestId={requestId}
          requiredProfiles={requiredProfiles}
          adventurers={adventurers}
        />
      )}
    </>
  );
};

export default TablesTab;
