import { Adventurer } from "./adventurers";
import { Request } from "./request";

export enum QuestStatus {
  Accepted = "Accepted",
  Pending = "Pending",
  Failed = "Failed",
  Succeeded = "Succeeded",
  Unassigned = "Unassigned",
  Rejected = "Rejected",
}

export type Quest = {
  _id: string;
  request: Request;
  groups: Adventurer[];
  questStatus: QuestStatus;
  createdAt: string;
  updatedAt: string;
};

export type QuestsList = {
  quests: Quest[];
  counts: number;
};

export type Transaction = { amount: number; type: string; date: string };
