import { QuestStatus } from "../sdk/quest";
import { AdventurerProfile } from "./adventurers";

export type Request = {
  _id: string;
  name: string;
  description: string;
  pictureUrl: string;
  questGiver: string;
  bounty: number;
  duration: number;
  dateDebut: Date;
  requiredProfiles: AdventurerProfile[];
  status: QuestStatus;
  awardedExperience: number;
  createdAt: string;
  updatedAt: string;
};

export type RequestListType = {
  requests: Request[];
};
