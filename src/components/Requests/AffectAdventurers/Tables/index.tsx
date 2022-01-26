import { useMemo } from "react";
import { Button } from "react-rainbow-components";
import { useAdventurersAffected } from "../../../../contexts/adventurersAffected";
import { Adventurer, AdventurerProfile } from "../../../../sdk/adventurers";
import CenterBlock from "../../../Core/CenterBlock";
import AllTable from "./AllTable";
import CriteresTable from "./CriteresTable";
import SuggestionTable from "./SuggestionTable";

interface TablesTabProps {
  requiredProfiles: AdventurerProfile[];
  adventurers: Adventurer[];
}

const TablesTab = ({ adventurers, requiredProfiles }: TablesTabProps) => {
  const { selectedTab, setSelectedTab } = useAdventurersAffected();

  const Table = useMemo(() => {
    switch (selectedTab) {
      case "suggestion":
        return (
          <>
            <h2 style={{ textAlign: "center", marginBottom: 20 }}>
              Notre suggestion
            </h2>
            <SuggestionTable
              requiredProfiles={requiredProfiles}
              adventurers={adventurers}
            />
          </>
        );
      case "criteres":
        return (
          <>
            <h2 style={{ textAlign: "center", marginBottom: 20 }}>
              Aventuriers qui correspondent aux critères
            </h2>
            <CriteresTable
              requiredProfiles={requiredProfiles}
              adventurers={adventurers}
            />
          </>
        );
      case "all":
        return (
          <>
            <h2 style={{ textAlign: "center", marginBottom: 20 }}>
              Tous les aventuriers
            </h2>
            <AllTable
              requiredProfiles={requiredProfiles}
              adventurers={adventurers}
            />
          </>
        );
      default:
        <></>;
    }
  }, [selectedTab]);

  return (
    <>
      {Table}
      <CenterBlock>
        {selectedTab !== "suggestion" && (
          <Button
            label="Voir la suggestion"
            variant="neutral"
            className="rainbow-m-around_medium"
            onClick={() => setSelectedTab && setSelectedTab("suggestion")}
          />
        )}
        {selectedTab !== "criteres" && (
          <Button
            label="Selectionner parmis les aventuriers qui répondent aux critères"
            variant="neutral"
            className="rainbow-m-around_medium"
            onClick={() => setSelectedTab && setSelectedTab("criteres")}
          />
        )}
        {selectedTab !== "all" && (
          <Button
            label="Selectionner parmis la liste de tous les aventuriers"
            variant="neutral"
            className="rainbow-m-around_medium"
            onClick={() => setSelectedTab && setSelectedTab("all")}
          />
        )}
      </CenterBlock>
    </>
  );
};

export default TablesTab;
