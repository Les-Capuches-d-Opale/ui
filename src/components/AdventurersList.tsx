import { FC } from "react";
import { Column, TableWithBrowserPagination } from "react-rainbow-components";
import { Adventurer } from "../sdk/adventurers";
import AvatarTable from "./Core/AvatarTable";

type AdventurersListType = {
  adventurers: Adventurer[];
};

const AdventurersList: FC<AdventurersListType> = ({ adventurers }) => {
  return (
    <>
      {!adventurers || (adventurers.length === 0 && <p>Aucun aventuriers</p>)}
      {adventurers && adventurers.length > 0 && (
        <TableWithBrowserPagination
          pageSize={10}
          data={adventurers}
          keyField="_id"
          style={{ height: "auto" }}
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
        </TableWithBrowserPagination>
      )}
    </>
  );
};

export default AdventurersList;
