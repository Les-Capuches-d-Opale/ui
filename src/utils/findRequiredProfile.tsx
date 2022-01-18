import { AdventurerProfile } from "../sdk/adventurers";

const findRequiredProfile = (
  value: string,
  requiredProfiles: AdventurerProfile[]
) => {
  const split = value.split(" ");
  return requiredProfiles.filter(
    (req) =>
      req.speciality.name === split[0] && req.experience === Number(split[1])
  )[0];
};

export default findRequiredProfile;
