import { Adventurer } from "./adventurers";
import { Request } from "./request";

export type Quests = {
  _id: string;
  request: Request;
  groups: Adventurer[];
  questStatus: string;
  createdAt: string;
  updatedAt: string;
};

export type Transaction = { amount: number; type: string; date: string };

export enum QuestStatus {
  Pending = "Pending",
  Failed = "Failed",
  Succeeded = "Succeeded",
}
