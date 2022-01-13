import { Chip } from "react-rainbow-components";
import { AdventurerProfile } from "../../../sdk/adventurers";

interface Props {
  requiredProfiles: AdventurerProfile[];
}

const ChipList = ({ requiredProfiles }: Props) => {
  return (
    <div>
      {requiredProfiles &&
        requiredProfiles.length > 0 &&
        requiredProfiles.map((profile, i) => {
          return (
            <Chip
              key={i}
              className="rainbow-m-around_medium"
              label={`${profile.speciality?.name} avec au moins ${profile.experience}XP`}
              variant="outline-brand"
              style={{
                marginTop: 5,
                marginBottom: 5,
                marginRight: 10,
                marginLeft: 0,
              }}
            />
          );
        })}
    </div>
  );
};

export default ChipList;
