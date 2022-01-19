import React, { FC, ReactElement, useState } from "react";
import { Column, Table } from "react-rainbow-components";
import {
  FilteredRequiredAdventurer,
  useAdventurersAffected,
} from "../../../contexts/adventurersAffected";
import { Adventurer } from "../../../sdk/adventurers";
import {
  handleOnSortAdventurers,
  SortType,
} from "../../../utils/handleOnSortAdventurers";
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

  const defaultSort: SortType = {
    sortDirection: "asc",
    data: adventurers,
  };

  const [sort, setSort] = useState<SortType>(defaultSort);
  const [dataTable, setDataTable] = useState<Adventurer[]>(adventurers);

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
          data={dataTable}
          keyField="_id"
          showCheckboxColumn
          selectedRows={selectedRows as []}
          style={{ height: "auto" }}
          {...(maxRowSelection ? { maxRowSelection } : {})}
          {...(setSelected
            ? { onRowSelection: (selection) => handleSelected(selection) }
            : {})}
          onSort={handleOnSortAdventurers(sort, setSort, setDataTable)}
          sortDirection={sort.sortDirection as "asc" | "desc" | undefined}
          sortedBy={sort.sortedBy}
        >
          <Column
            header="Avatar"
            field="pictureUrl"
            component={AvatarTable}
            value={""}
          />
          <Column header="Name" field="name" sortable />
          <Column header="Spécialité" field="speciality.name" sortable />
          <Column header="Experience" field="experience" sortable />
          <Column header="Taux journalier" field="baseDailyRate" sortable />
          {StatusColumn && StatusColumn}
          {ChangeAffectColumn && ChangeAffectColumn}
        </Table>
      )}
    </>
  );
};

export default AdventurersListAffect;
