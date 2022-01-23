import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { QueryParams } from "../../pages/Adventurer";
import SelectSpeciality from "./SelectSpeciality";

interface Props {
  onFilterChange: Dispatch<SetStateAction<QueryParams>>;
}

const AdventurerFilters = ({ onFilterChange }: Props) => {
  const [specialityValue, setSpecialityValue] = useState<string>();

  useEffect(() => {
    onFilterChange({ speciality: specialityValue });
  }, [specialityValue]);

  return (
    <>
      <SelectSpeciality
        onChangeSpecialityValue={(value) => setSpecialityValue(value)}
      />
    </>
  );
};

export default AdventurerFilters;
