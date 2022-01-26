export type Items = {
  _id: string;
  durability: number;
  daysInUse: number;
  repairTime: number;
  charges: number;
  usedCharges: number;
  name: string;
  imgUrl: string;
  price: number;
  transaction: string;
  type: string;
};

export type ItemsList = {
  counts: number;
  items: Items[];
};

export enum ItemsType {
  CONSUMABLE = "consumable",
  EQUIPMENT = "equipment",
}
