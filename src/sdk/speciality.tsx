export type Speciality = {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type SpecialityListType = {
  specialities: Speciality[];
};
