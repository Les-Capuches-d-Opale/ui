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
    const { getSugestedAdventurers } = useAdventurersAffected();

    if (!getSugestedAdventurers) {
      return null;
    }
    return getSugestedAdventurers(requiredProfiles, adventurers)
      .map((ad) => ad.adventurer._id)
      .includes(value) ? (
      <Badge label="Suggested" variant="outline-brand" />
    ) : null;
  };

export default StatusBadge;
