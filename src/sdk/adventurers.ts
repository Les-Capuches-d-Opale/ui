export type Item = {
  durability: number;
  daysInUse: number;
  repairTime: number;
  charges: number;
  usedCharges: number;
  name: string;
  price: number;
  isAvailable: boolean;
  type: string;
};

export type Speciality = {
  _id: string;
  name?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  requiredItems?: Item[];
};

export type AdventurerProfile = {
  speciality: Speciality;
  experience: number;
};

export type Adventurer = {
  baseDailyRate: number;
  experience: number;
  name: string;
  pictureUrl: string;
  speciality: Speciality;
  isAvailableNow: boolean;
  _id: string;
};

export type AdventurerToCreate = {
  baseDailyRate: number;
  experience: number;
  name: string;
  pictureURL: string;
  speciality: string | undefined;
};

export type QueryParams = {
  minLevel?: number;
  speciality?: string;
  isAvailableNow?: string;
  name?: string;
};
