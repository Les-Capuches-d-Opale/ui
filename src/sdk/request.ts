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
  dateDebut: string;
  requiredProfiles: AdventurerProfile[];
  status: QuestStatus;
  awardedExperience: number;
};

export type AdventurerProfileWidthId = {
  speciality: string;
  experience: number;
};

export type RequestToCreate = {
  name: string;
  description: string;
  pictureUrl: string;
  questGiver: string;
  bounty: number;
  duration: number;
  dateDebut: Date;
  requiredProfiles: AdventurerProfileWidthId[];
  status: QuestStatus;
  awardedExperience: number;
};

export type RequestListType = {
  requests: Request[];
};
