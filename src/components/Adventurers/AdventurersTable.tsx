import { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import {
  Column,
  MenuItem,
  TableWithBrowserPagination,
} from "react-rainbow-components";
import { Adventurer } from "../../sdk/adventurers";
import handleOnSortAdventurers, {
  SortType,
} from "../../utils/handleOnSortAdventurers";
import AvatarTable from "../Core/AvatarTable";

type RainbowOnClickMenu = (event: MouseEvent<HTMLElement>) => void;

interface Props {
  adventurers: Adventurer[];
  setOpen: Dispatch<SetStateAction<boolean>>;
  setDataAction: Dispatch<SetStateAction<Adventurer | undefined>>;
}

export const AdventurersTable = ({
  adventurers,
  setOpen,
  setDataAction,
}: Props) => {
  const defaultSort: SortType = {
    sortDirection: "asc",
    data: adventurers,
  };

  const [sort, setSort] = useState<SortType>(defaultSort);
  const [dataTable, setDataTable] = useState<Adventurer[]>(adventurers);

  return (
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
      <Column type="action">
        <MenuItem
          label="Ajouter XP"
          onClick={
            ((event: any, data: Adventurer) => {
              setDataAction(data);
              setOpen(true);
            }) as RainbowOnClickMenu
          }
        />
      </Column>
    </TableWithBrowserPagination>
  );
};
