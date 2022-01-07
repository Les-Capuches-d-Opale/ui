import { FC } from "react";
import { Avatar, Column, TableWithBrowserPagination } from "react-rainbow-components";
import { Adventurer } from "../types/adventurers";
import Container from "./Container";

type AdventurersListType = {
  adventurers: Adventurer[];
};

const AdventurersList: FC<AdventurersListType> = ({ adventurers }) => {
  const AvatarTable = ({ value }: any) => <Avatar src={value} />;

  return (
    <Container>
      <h1>Liste des aventuriers</h1>
      {!adventurers || (adventurers.length === 0 && <p>Aucun aventuriers</p>)}
      {adventurers && adventurers.length > 0 && (
        <TableWithBrowserPagination pageSize={10} data={adventurers} keyField="_id">
          <Column header="Avatar" field="pictureUrl" component={AvatarTable} />
          <Column header="Name" field="name" />
          <Column header="Spécialité" field="speciality.name" />
          <Column header="Experience" field="experience" />
          <Column header="Taux journalier" field="baseDailyRate" />
        </TableWithBrowserPagination>
      )}
    </Container>
  );
};

export default AdventurersList;
