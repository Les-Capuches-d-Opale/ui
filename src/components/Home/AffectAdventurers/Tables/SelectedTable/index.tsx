import { Column } from "react-rainbow-components";
import { useAdventurersAffected } from "../../../../../contexts/adventurersAffected";
import { AdventurerProfile } from "../../../../../sdk/adventurers";
import AdventurersListAffect from "../../AdventurersListAffect";
import ChangeAffectColumn from "./ChangeAffectColumn";
import StatusBadge from "./StatusBadge";

interface OwnProps {
  requiredProfiles: AdventurerProfile[];
}

const SelectedTable = ({ requiredProfiles }: OwnProps) => {
  const { adventurersAffected } = useAdventurersAffected();

  return (
    <>
      {adventurersAffected && adventurersAffected.length > 0 ? (
        <>
          <AdventurersListAffect
            requiredAdventurers={adventurersAffected}
            StatusColumn={
              <Column
                header="Affecté au poste"
                field="_id"
                component={StatusBadge}
                value={""}
              />
            }
            ChangeAffectColumn={
              <Column
                header="Changer le poste"
                field="_id"
                component={ChangeAffectColumn(requiredProfiles)}
                value={""}
              />
            }
          />
        </>
      ) : (
        <p>Il n'y a pas de Selected</p>
      )}
    </>
  );
};

export default SelectedTable;
