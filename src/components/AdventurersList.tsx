import { FC, ReactElement } from "react";
import {
  Avatar,
  Column,
  TableWithBrowserPagination,
} from "react-rainbow-components";
import { Adventurer } from "../sdk/adventurers";

type AdventurersListType = {
  adventurers: Adventurer[];
  isSelectionable?: boolean;
  setSelected?: Function;
  maxRowSelection?: number;
  StatusColumn?: ReactElement;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AvatarTable = ({ value }: any) => <Avatar src={value} />;

const AdventurersList: FC<AdventurersListType> = ({
  adventurers,
  isSelectionable = false,
  setSelected,
  maxRowSelection,
  StatusColumn,
}) => {
  return (
    <>
      {!adventurers || (adventurers.length === 0 && <p>Aucun aventuriers</p>)}
      {adventurers && adventurers.length > 0 && (
        <TableWithBrowserPagination
          pageSize={10}
          data={adventurers}
          keyField="_id"
          showCheckboxColumn={isSelectionable}
          style={{ height: "auto" }}
          {...(maxRowSelection ? { maxRowSelection } : {})}
          {...(setSelected
            ? { onRowSelection: (selection) => setSelected(selection) }
            : {})}
        >
          <Column header="Avatar" field="pictureUrl" component={AvatarTable} />
          <Column header="Name" field="name" />
          <Column header="Spécialité" field="speciality.name" />
          <Column header="Experience" field="experience" />
          <Column header="Taux journalier" field="baseDailyRate" />
          {StatusColumn && StatusColumn}
        </TableWithBrowserPagination>
      )}
    </>
  );
};

export default AdventurersList;
