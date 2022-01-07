import { AdventurerProfile } from "./adventurers";

export type Request = {
  _id: string;
  pictureUrl: string;
  name: string;
  questGiver: string;
  bounty: number;
  duration: number;
  dateDebut: Date;
  requiredProfiles: AdventurerProfile[];
  description: string;
};

export type RequestListType = {
  requests: Request[];
};
