import { Items } from "./items";

export type Administrators = {
  username: string;
  email: string;
  wallet: number;
  items: Items[];
  payments: [
    // TODO voir si les personnes qui soccupe des transaction à pas déjà fait le type
    {
      amount: number;
      type: string;
      date: string;
    }
  ];
};
