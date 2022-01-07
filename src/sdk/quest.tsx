import { Adventurer } from "../types/adventurers";
import { Request } from "../types/request";

export type Quests = {
  request: Request;
  groups: Adventurer[];
  questStatus: string;
};

export type Transaction = { amount: number; type: string; date: string };

export enum QuestStatus {
  Pending = "Pending",
  Failed = "Failed",
  Succeeded = "Succeeded",
}
