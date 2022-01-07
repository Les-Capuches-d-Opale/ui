import { Request } from "../components/RequestList";

export type Quests = {
  request: Request;
  groups: Adventurer[];
};

export type Adventurer = {
  baseDailyRate: number;
  createdAt: string;
  experience: number;
  name: string;
  pictureUrl: string;
  speciality: string;
  updatedAt: string;
};

export type Transaction = { amount: number; type: string; date: string };

export enum QuestStatus {
  Pending = "Pending",
  Failed = "Failed",
  Succeeded = "Succeeded",
}
