import { Adventurer, AdventurerProfile } from "../sdk/adventurers";

export const getFiltredAdventurers = (
  requiredProfiles: AdventurerProfile[],
  adventurers: Adventurer[]
) => {
  const tabAdventurers = requiredProfiles.map((reqProfile) => {
    return adventurers.filter((ad: Adventurer) => {
      return (
        ad.experience >= reqProfile.experience &&
        ad.speciality.name === reqProfile.speciality.name &&
        ad.isAvailableNow
      );
    });
  });

  const tabAdventurersFlat = tabAdventurers.flat();
  const adventurersId = tabAdventurersFlat.map((ad) => ad._id);

  const removeDuplicatesId = tabAdventurersFlat.filter(
    ({ _id }, i) => !adventurersId.includes(_id, i + 1)
  );

  return removeDuplicatesId;
};
