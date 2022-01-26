import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useQuery } from "react-query";
import { Input, Select } from "react-rainbow-components";
import { Option } from "react-rainbow-components/components/Select";
import request from "../../axios";
import { QueryParams } from "../../sdk/adventurers";
import { Speciality } from "../../sdk/speciality";

interface Props {
  onFilterChange: Dispatch<SetStateAction<QueryParams>>;
}

const AdventurerFilters = ({ onFilterChange }: Props) => {
  const [specialityValue, setSpecialityValue] = useState<string>();
  const [minLevelValue, setMinLevelValue] = useState<number>();
  const [isAvailableNowValue, setIsAvailableNowValue] = useState<string>();

  const { data: dataSpecialities } = useQuery("fetchSpecialities", () =>
    request.get<Speciality[]>("/adventurers/specialities")
  );
  const specialities = dataSpecialities?.data;

  const options: Option[] = [{ label: "---", value: "---" }];
  specialities &&
    specialities.forEach((speciality) => {
      options.push({
        label: speciality.name,
        value: speciality._id,
      });
    });

  const availabilityOptions: Option[] = [
    { label: "Tous", value: "all" },
    { label: "Disponible", value: "true" },
    { label: "Non disponible", value: "false" },
  ];

  const onChangeSelectSpeciality = (event: ChangeEvent<HTMLInputElement>) => {
    setSpecialityValue(event.target.value);
  };

  const onChangeMinLevelValue = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length === 0 || parseInt(event.target.value) === 0) {
      setMinLevelValue(undefined);
    } else {
      setMinLevelValue(parseInt(event.target.value));
    }
  };

  const onChangeAvailableNowValue = (event: ChangeEvent<HTMLInputElement>) => {
    setIsAvailableNowValue(event.target.value);
  };

  useEffect(() => {
    onFilterChange({
      isAvailableNow: isAvailableNowValue,
      minLevel: minLevelValue,
      speciality: specialityValue,
    });
  }, [isAvailableNowValue, minLevelValue, specialityValue]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        columnGap: 30,
        marginBottom: 25,
      }}
    >
      <Select
        label="Spécialité"
        options={options}
        value={specialityValue}
        onChange={onChangeSelectSpeciality}
      />
      <Input
        type="number"
        label="Expérience min."
        value={minLevelValue}
        onChange={onChangeMinLevelValue}
      />
      <Select
        label="Disponibilité"
        options={availabilityOptions}
        value={isAvailableNowValue}
        onChange={onChangeAvailableNowValue}
      />
    </div>
  );
};

export default AdventurerFilters;
