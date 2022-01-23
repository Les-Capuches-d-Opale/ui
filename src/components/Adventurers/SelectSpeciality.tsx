import { ChangeEvent, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Select } from "react-rainbow-components";
import { Option } from "react-rainbow-components/components/Select";
import request from "../../axios";
import { Speciality } from "../../sdk/speciality";

interface Props {
  onChangeSpecialityValue: (value: string) => void;
}

const SelectSpeciality = ({ onChangeSpecialityValue }: Props) => {
  const [value, setValue] = useState<string>();

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

  const handleOnSelectSpeciality = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    value && onChangeSpecialityValue(value);
  }, [onChangeSpecialityValue, value]);

  //   const handleOnSelectSpeciality = (event: ChangeEvent<HTMLInputElement>) => {
  //     onChangeSpecialityValue(event.target.value);
  //     console.log(event.target.value);
  //     console.log(value);
  //   };

  return (
    <>
      <Select
        label="Spécialité"
        options={options}
        value={value}
        onChange={handleOnSelectSpeciality}
        style={{ margin: "12px" }}
      />
    </>
  );
};

export default SelectSpeciality;
