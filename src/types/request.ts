import { AdventurerProfile } from "./adventurers";

export type Request = {
  _id: string;
  pictureUrl: string;
  name: string;
  questGiver: string;
  bounty: number;
  duration: number;
  startDate: Date;
  requiredProfiles: AdventurerProfile[];
};

export type RequestListType = {
  requests: Request[];
};
