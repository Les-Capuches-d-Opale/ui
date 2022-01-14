import { Adventurer } from "./adventurers";
import { Request } from "./request";

export enum QuestStatus {
  Accepted = "Accepted",
  Pending = "Pending",
  Failed = "Failed",
  Succeeded = "Succeeded",
}

export type Quests = {
  _id: string;
  request: Request;
  groups: Adventurer[];
  questStatus: QuestStatus;
  createdAt: string;
  updatedAt: string;
};

export type Transaction = { amount: number; type: string; date: string };
