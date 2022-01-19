import { FC, ReactElement } from "react";
import { Column, Table } from "react-rainbow-components";
import {
  FilteredRequiredAdventurer,
  useAdventurersAffected,
} from "../../../contexts/adventurersAffected";
import AvatarTable from "../../Core/AvatarTable";

type AdventurersListAffectType = {
  requiredAdventurers: FilteredRequiredAdventurer[];
  setSelected?: Function;
  maxRowSelection?: number;
  StatusColumn?: ReactElement;
  ChangeAffectColumn?: ReactElement;
};

const AdventurersListAffect: FC<AdventurersListAffectType> = ({
  requiredAdventurers,
  setSelected,
  maxRowSelection,
  StatusColumn,
  ChangeAffectColumn,
}) => {
  const { adventurersAffected } = useAdventurersAffected();

  const selectedRows = adventurersAffected
    ? adventurersAffected.map((rA) => rA.adventurer._id)
    : [];

  const adventurers = requiredAdventurers.map((rA) => rA.adventurer);

  const handleSelected = (selection: object[]) => {
    const withReqProfile = (
      requiredAdventurers as FilteredRequiredAdventurer[]
    ).filter((value) => selection.includes(value.adventurer));
    if (setSelected) setSelected(withReqProfile);
  };

  return (
    <>
      {!adventurers || (adventurers.length === 0 && <p>Aucun aventuriers</p>)}
      {adventurers && adventurers.length > 0 && (
        <Table
          data={adventurers}
          keyField="_id"
          showCheckboxColumn
          selectedRows={selectedRows as []}
          style={{ height: "auto" }}
          {...(maxRowSelection ? { maxRowSelection } : {})}
          {...(setSelected
            ? { onRowSelection: (selection) => handleSelected(selection) }
            : {})}
        >
          <Column
            header="Avatar"
            field="pictureUrl"
            component={AvatarTable}
            value={""}
          />
          <Column header="Name" field="name" />
          <Column header="Spécialité" field="speciality.name" />
          <Column header="Experience" field="experience" />
          <Column header="Taux journalier" field="baseDailyRate" />
          {StatusColumn && StatusColumn}
          {ChangeAffectColumn && ChangeAffectColumn}
        </Table>
      )}
    </>
  );
};

export default AdventurersListAffect;
