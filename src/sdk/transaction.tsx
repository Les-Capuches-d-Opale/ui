export enum TransactionType {
  QuestBounty = "QuestBounty",
  AdventurerPayment = "AdventurerPayment",
  Purchase = "Purchase",
  Tax = "Tax",
}

export type Transaction = {
  _id: string;
  date: string;
  type: string;
  amount: number;
};
