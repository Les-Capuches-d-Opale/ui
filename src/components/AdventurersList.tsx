import { FC, MouseEvent, useState } from "react";
import {
  Column,
  MenuItem,
  TableWithBrowserPagination,
} from "react-rainbow-components";
import { Adventurer } from "../sdk/adventurers";
import {
  handleOnSortAdventurers,
  SortType,
} from "../utils/handleOnSortAdventurers";
import AdventurerXpPopup from "./AdventurerXpPopup";
import AvatarTable from "./Core/AvatarTable";

type AdventurersListType = {
  adventurers: Adventurer[];
};

type RainbowOnClickMenu = (event: MouseEvent<HTMLElement>) => void;

const AdventurersList: FC<AdventurersListType> = ({ adventurers }) => {
  const defaultSort: SortType = {
    sortDirection: "asc",
    data: adventurers,
  };

  const [sort, setSort] = useState<SortType>(defaultSort);
  const [dataTable, setDataTable] = useState<Adventurer[]>(adventurers);

  const [openXpPopup, setOpenXpPopup] = useState<boolean>(false);
  const [adventurerAction, setAdventurerAction] = useState<Adventurer>();

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
          <Column type="action">
            <MenuItem
              label="Ajouter XP"
              onClick={
                ((event: any, data: any) => {
                  setAdventurerAction(data);
                  setOpenXpPopup(true);
                }) as RainbowOnClickMenu
              }
            />
          </Column>
        </TableWithBrowserPagination>
      )}
      {adventurerAction && (
        <AdventurerXpPopup
          xp={adventurerAction.experience}
          adventurerId={adventurerAction._id}
          setOpen={setOpenXpPopup}
          isOpen={openXpPopup}
        />
      )}
    </>
  );
};

export default AdventurersList;
