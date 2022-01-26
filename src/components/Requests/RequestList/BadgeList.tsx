import { Badge } from "react-rainbow-components";
import { AdventurerProfile } from "../../../sdk/adventurers";

interface Props {
  requiredProfiles: AdventurerProfile[];
}

const BadgeList = ({ requiredProfiles }: Props) => {
  return (
    <div>
      {requiredProfiles &&
        requiredProfiles.length > 0 &&
        requiredProfiles.map((profile, i) => {
          return (
            <Badge
              style={{ marginLeft: 0, marginRight: 10 }}
              key={i}
              className="rainbow-m-around_medium"
              label={`${profile.speciality?.name} ${profile.experience}XP`}
              variant="outline-brand"
            />
          );
        })}
    </div>
  );
};

export default BadgeList;
