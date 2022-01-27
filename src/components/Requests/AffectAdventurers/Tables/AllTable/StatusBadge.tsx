import { Badge } from "react-rainbow-components";
import { useAdventurersAffected } from "../../../../../contexts/adventurersAffected";
import { Adventurer, AdventurerProfile } from "../../../../../sdk/adventurers";

interface StatusBadgeProps {
  requiredProfiles: AdventurerProfile[];
  adventurers: Adventurer[];
}

const StatusBadge =
  ({ requiredProfiles, adventurers }: StatusBadgeProps) =>
  ({ value }: { value: string }) => {
    const { getSugestedAdventurers, getFiltredAdventurers } =
      useAdventurersAffected();

    if (
      getSugestedAdventurers &&
      getSugestedAdventurers(requiredProfiles, adventurers)
        .map((ad) => ad.adventurer._id)
        .includes(value)
    ) {
      return <Badge label="Suggestion" variant="outline-brand" />;
    }

    if (
      getFiltredAdventurers &&
      getFiltredAdventurers(requiredProfiles, adventurers)
        .map((ad) => ad.adventurer._id)
        .includes(value)
    ) {
      return <Badge label="Critères ✅" variant="lightest" />;
    }

    return null;
  };

export default StatusBadge;
