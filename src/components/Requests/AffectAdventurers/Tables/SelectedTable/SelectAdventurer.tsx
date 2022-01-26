import React from "react";
import { Select } from "react-rainbow-components";
import { useAdventurersAffected } from "../../../../../contexts/adventurersAffected";
import { Adventurer, AdventurerProfile } from "../../../../../sdk/adventurers";
import findRequiredProfile from "../../../../../utils/findRequiredProfile";

interface SelectAdventurerProps {
  requiredProfiles: AdventurerProfile[];
  index: number;
  adventurer: Adventurer;
  value: string;
}

const SelectAdventurer = ({
  requiredProfiles,
  index,
  adventurer,
  value,
}: SelectAdventurerProps) => {
  const { adventurersAffected, setAdventuredAffected } =
    useAdventurersAffected();
  const allOptions = requiredProfiles.map((req) => {
    return {
      ...req,
      value: `${req.speciality.name} ${req.experience}`,
      label: `${req.speciality.name} ${req.experience}XP`,
    };
  });

  const handleOnSelect =
    (index: number, ad: Adventurer) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value !== "none") {
        const reqProfile = findRequiredProfile(
          e.target.value,
          requiredProfiles
        );
        const newArray = adventurersAffected ? [...adventurersAffected] : [];
        newArray[index] = { reqProfile: reqProfile, adventurer: ad };
        if (setAdventuredAffected) {
          setAdventuredAffected(newArray);
        }
      }
    };

  return (
    <Select
      options={allOptions}
      className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
      onChange={handleOnSelect(index, adventurer)}
      value={value}
    />
  );
};

export default SelectAdventurer;
