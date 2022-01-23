import { useState } from "react";
import { useQuery } from "react-query";
import request from "../../axios";
import { Adventurer, QueryParams } from "../../sdk/adventurers";
import AdventurerFilters from "./AdventurerFilters";
import { AdventurersTable } from "./AdventurersTable";
import AdventurerXpPopup from "./AdventurerXpPopup";

async function fetchAdventurers(queryParams: QueryParams) {
  const { data } = await request.get("/adventurers", {
    params: {
      minLevel: queryParams.minLevel,
      speciality: queryParams.speciality,
      isAvailableNow:
        queryParams.isAvailableNow !== "all"
          ? queryParams.isAvailableNow
          : undefined,
    },
  });
  return data;
}

const AdventurersList = () => {
  const [filteredValues, setFilteredValues] = useState<QueryParams>({});

  const { data: adventurers, isLoading } = useQuery<Adventurer[], Error>(
    ["fetchAdventurers", filteredValues],
    () => fetchAdventurers(filteredValues)
  );

  const [openXpPopup, setOpenXpPopup] = useState(false);
  const [adventurerAction, setAdventurerAction] = useState<Adventurer>();

  return (
    <>
      <AdventurerFilters onFilterChange={(value) => setFilteredValues(value)} />
      {!adventurers || (adventurers.length === 0 && <p>Aucun aventuriers</p>)}
      {adventurers && adventurers.length > 0 && (
        <AdventurersTable
          adventurers={adventurers}
          setOpen={setOpenXpPopup}
          setDataAction={setAdventurerAction}
        />
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
