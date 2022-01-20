import { FC, useState } from "react";
import { Column, TableWithBrowserPagination } from "react-rainbow-components";
import { Adventurer } from "../sdk/adventurers";
import {
  handleOnSortAdventurers,
  SortType,
} from "../utils/handleOnSortAdventurers";
import AvatarTable from "./Core/AvatarTable";

type AdventurersListType = {
  adventurers: Adventurer[];
};

const AdventurersList: FC<AdventurersListType> = ({ adventurers }) => {
  const defaultSort: SortType = {
    sortDirection: "asc",
    data: adventurers,
  };

  const [sort, setSort] = useState<SortType>(defaultSort);
  const [dataTable, setDataTable] = useState<Adventurer[]>(adventurers);

  return (
    <>
      {!adventurers || (adventurers.length === 0 && <p>Aucun aventuriers</p>)}
      {adventurers && adventurers.length > 0 && (
        <TableWithBrowserPagination
          pageSize={10}
          data={dataTable}
          keyField="_id"
          style={{ height: "auto" }}
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
        </TableWithBrowserPagination>
      )}
    </>
  );
};

export default AdventurersList;
