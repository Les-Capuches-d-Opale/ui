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

export const getSugestedAdventurers = (
  requiredProfiles: AdventurerProfile[],
  adventurers: Adventurer[]
) => {
  const filteredAdventurers = getFiltredAdventurers(
    requiredProfiles,
    adventurers
  );

  if (!filteredAdventurers || filteredAdventurers.length === 0) {
    return [];
  }

  const numberOfEachSpecialty = requiredProfiles.map((r) => {
    const titi = requiredProfiles.filter(
      (rP) => rP.speciality.name === r.speciality.name
    );

    return { name: r.speciality.name, length: titi.length };
  });

  const nameOfEachSpecialty = numberOfEachSpecialty.map((spe) => spe.name);
  const filteredSpecialty = numberOfEachSpecialty.filter(
    ({ name }, index) => !nameOfEachSpecialty.includes(name, index + 1)
  );

  const adventurersSuggestion = filteredSpecialty.map(({ name, length }) => {
    const adventurersBySpecialtyName = filteredAdventurers
      .sort((a, b) => a.baseDailyRate - b.baseDailyRate)
      .filter((ad) => {
        return ad.speciality.name === name;
      });

    return adventurersBySpecialtyName.slice(0, length);
  });

  return adventurersSuggestion.flat();
};
