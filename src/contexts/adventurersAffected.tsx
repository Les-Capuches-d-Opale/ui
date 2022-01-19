import React, {
  Dispatch,
  FC,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { Adventurer, AdventurerProfile } from "../sdk/adventurers";

export interface FilteredRequiredAdventurer {
  reqProfile?: AdventurerProfile;
  adventurer: Adventurer;
}

type AdventurersAffectedContextProps = {
  adventurersAffected: FilteredRequiredAdventurer[];
  setAdventuredAffected: React.Dispatch<
    React.SetStateAction<FilteredRequiredAdventurer[] | undefined>
  >;
  getAllAdventurers: (
    requiredProfiles: AdventurerProfile[],
    adventurers: Adventurer[]
  ) => FilteredRequiredAdventurer[];
  getFiltredAdventurers: (
    requiredProfiles: AdventurerProfile[],
    adventurers: Adventurer[]
  ) => FilteredRequiredAdventurer[];
  getSugestedAdventurers: (
    requiredProfiles: AdventurerProfile[],
    adventurers: Adventurer[]
  ) => FilteredRequiredAdventurer[];
  postAlreadyAffected: (
    profile: AdventurerProfile,
    requiredProfiles: AdventurerProfile[]
  ) => boolean;
  selectedTab: "suggestion" | "criteres" | "all";
  setSelectedTab: Dispatch<SetStateAction<"suggestion" | "criteres" | "all">>;
};

export const AdventurersAffectedContext = createContext<
  Partial<AdventurersAffectedContextProps>
>({});

export const AdventurersAffectedProvider: FC = ({ children }) => {
  const [adventurersAffected, setAdventuredAffected] =
    useState<FilteredRequiredAdventurer[]>();

  // Get table view in modal
  const [selectedTab, setSelectedTab] = useState<
    "suggestion" | "criteres" | "all"
  >("suggestion");

  // Get adventurers who match the requested criteria
  const getFiltredAdventurers = (
    requiredProfiles: AdventurerProfile[],
    adventurers: Adventurer[]
  ): FilteredRequiredAdventurer[] => {
    const tabAdventurersToRequiredProfile = requiredProfiles.map(
      (reqProfile) => {
        const tabAdventurers = adventurers.filter((ad: Adventurer) => {
          return (
            ad.experience >= reqProfile.experience &&
            ad.speciality.name === reqProfile.speciality.name &&
            ad.isAvailableNow
          );
        });
        return tabAdventurers.map((ad) => {
          return { reqProfile: reqProfile, adventurer: ad };
        });
      }
    );

    const tabAdventurersFlat = tabAdventurersToRequiredProfile.flat();
    const adventurersId = tabAdventurersFlat.map((ad) => ad.adventurer._id);

    const removeDuplicatesId = tabAdventurersFlat.filter(
      ({ adventurer }, i) => !adventurersId.includes(adventurer._id, i + 1)
    );

    return removeDuplicatesId;
  };

  // Get the X (= number of criteria) adventurers who match the criteria and who are the cheapest
  const getSugestedAdventurers = (
    requiredProfiles: AdventurerProfile[],
    adventurers: Adventurer[]
  ): FilteredRequiredAdventurer[] => {
    const filteredAdventurers: FilteredRequiredAdventurer[] =
      getFiltredAdventurers(requiredProfiles, adventurers);

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
        .sort((a, b) => a.adventurer.baseDailyRate - b.adventurer.baseDailyRate)
        .filter((ad) => {
          return ad.adventurer.speciality.name === name;
        });

      return adventurersBySpecialtyName.slice(0, length);
    });

    return adventurersSuggestion.flat();
  };

  // Get all adventurers with their criteria potentially affected
  const getAllAdventurers = (
    requiredProfiles: AdventurerProfile[],
    adventurers: Adventurer[]
  ): FilteredRequiredAdventurer[] => {
    const sugestedAdventurers: Adventurer[] = getSugestedAdventurers(
      requiredProfiles,
      adventurers
    ).map(({ adventurer }) => adventurer);
    const filteredAdventurers: Adventurer[] = getFiltredAdventurers(
      requiredProfiles,
      adventurers
    )
      .map(({ adventurer }) => adventurer)
      .filter((ad) => !sugestedAdventurers.includes(ad));
    const notFilteredOrSuggested = adventurers.filter(
      (ad) =>
        !filteredAdventurers.includes(ad) && !sugestedAdventurers.includes(ad)
    );

    const sugestedAdventurersWithReqProfiles = getSugestedAdventurers(
      requiredProfiles,
      adventurers
    ).filter(({ adventurer }) => sugestedAdventurers.includes(adventurer));

    const filteredAdventurersWithReqProfiles = getFiltredAdventurers(
      requiredProfiles,
      adventurers
    ).filter(({ adventurer }) => filteredAdventurers.includes(adventurer));

    return [
      ...sugestedAdventurersWithReqProfiles,
      ...filteredAdventurersWithReqProfiles,
      ...notFilteredOrSuggested.map((ad) => {
        return { adventurer: ad };
      }),
    ];
  };

  // Get all criteria that have already been assigned to adventurers
  const postAlreadyAffected = (
    profile: AdventurerProfile,
    requiredProfiles: AdventurerProfile[]
  ) => {
    if (!adventurersAffected) {
      return false;
    }
    const postAffected = adventurersAffected.map((aff) => aff.reqProfile);
    const alreadyAffected = requiredProfiles.filter((profile) =>
      postAffected.includes(profile)
    );

    const countAffect = alreadyAffected.filter(
      (profileAffec) => profileAffec === profile
    ).length;

    return alreadyAffected.includes(profile) && countAffect > 1;
  };

  return (
    <AdventurersAffectedContext.Provider
      value={{
        adventurersAffected,
        setAdventuredAffected,
        getAllAdventurers,
        getSugestedAdventurers,
        getFiltredAdventurers,
        selectedTab,
        setSelectedTab,
        postAlreadyAffected,
      }}
    >
      {children}
    </AdventurersAffectedContext.Provider>
  );
};

export function useAdventurersAffected() {
  return useContext(AdventurersAffectedContext);
}
