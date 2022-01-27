import { useAdventurersAffected } from "../../../../../contexts/adventurersAffected";
import { AdventurerProfile } from "../../../../../sdk/adventurers";
import SelectAdventurer from "./SelectAdventurer";

const ChangeAffectColumn =
  (requiredProfiles: AdventurerProfile[]) =>
  ({ value }: { value: string }) => {
    const { adventurersAffected } = useAdventurersAffected();

    if (!adventurersAffected) {
      return null;
    }

    const renderBadgesComponents = adventurersAffected.map((ad, index) => {
      if (ad.adventurer._id === value) {
        return (
          <SelectAdventurer
            requiredProfiles={requiredProfiles}
            index={index}
            adventurer={ad.adventurer}
            value={
              ad.reqProfile
                ? `${ad.reqProfile.speciality.name} ${ad.reqProfile.experience}`
                : "none"
            }
          />
        );
      }
      return null;
    });

    return <>{renderBadgesComponents}</>;
  };

export default ChangeAffectColumn;
