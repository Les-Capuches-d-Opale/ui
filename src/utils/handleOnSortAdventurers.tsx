import React from "react";
import { Adventurer } from "../sdk/adventurers";

export interface SortType {
  sortedBy?: string;
  sortDirection: string | undefined;
  data: Adventurer[];
}

export const handleOnSortAdventurers =
  (
    sort: SortType,
    setSort: React.Dispatch<React.SetStateAction<SortType>>,
    setDataTable: React.Dispatch<React.SetStateAction<Adventurer[]>>
  ) =>
  (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    field: string,
    nextSortDirection: string | undefined
  ) => {
    const newData = [...sort.data];

    const key = (value: Adventurer): string => {
      if (field === "speciality.name" && value.speciality.name) {
        return value.speciality.name;
      }
      const getField = value[field as keyof Adventurer];
      return typeof getField === "string" ? getField : field;
    };

    const reverse = nextSortDirection === "asc" ? 1 : -1;

    const sortedData = newData.sort((aItem, bItem) => {
      const aValue = key(aItem);
      const bValue = key(bItem);

      return reverse * (Number(aValue > bValue) - Number(bValue > aValue));
    });

    const newSort: SortType = {
      data: sortedData,
      sortedBy: field as string,
      sortDirection: nextSortDirection,
    };

    setSort(newSort);
    setDataTable(newSort.data);
  };

export default handleOnSortAdventurers;
