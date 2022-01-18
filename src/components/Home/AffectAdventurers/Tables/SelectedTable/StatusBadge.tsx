import { Badge, HelpText } from "react-rainbow-components";
import { useAdventurersAffected } from "../../../../../contexts/adventurersAffected";
import { AdventurerProfile } from "../../../../../sdk/adventurers";

const StatusBadge = ({ value }: { value: string }) => {
  const { adventurersAffected, postAlreadyAffected } = useAdventurersAffected();
  if (!adventurersAffected) {
    return null;
  }

  const postAffected = adventurersAffected.map(({ reqProfile }) => reqProfile);

  const renderBadgesComponents = adventurersAffected.map((ad) => {
    const errorAlreadyChoose =
      ad.reqProfile &&
      postAlreadyAffected &&
      postAlreadyAffected(ad.reqProfile, postAffected as AdventurerProfile[]);

    if (ad.adventurer._id === value) {
      if (!ad.reqProfile) {
        return <p>Aventurier non affecté</p>;
      }

      return (
        <>
          <Badge
            label={`${ad.reqProfile?.speciality.name} ${ad.reqProfile?.experience}XP`}
            variant={errorAlreadyChoose ? "error" : "outline-brand"}
          />
          {errorAlreadyChoose && (
            <HelpText
              variant="error"
              title="Attention ! Affectation double ?"
              text={
                <p>
                  Attention, votre affection est peut être double. Si il ne
                  s'agit pas d'une erreur vous pouvez tout de même continuer,
                  sinon selectionnez un autre poste pour cet aventurier
                </p>
              }
            />
          )}
        </>
      );
    }
    return null;
  });

  return <>{renderBadgesComponents}</>;
};

export default StatusBadge;
