import React, { Dispatch, SetStateAction } from "react";
import { Adventurer } from "../sdk/adventurers";

export interface SortType {
  sortedBy?: string;
  sortDirection: string | undefined;
  data: Adventurer[];
}

export const handleOnSortAdventurers =
  (
    sort: SortType,
    setSort: Dispatch<SetStateAction<SortType>>,
    setDataTable: Dispatch<SetStateAction<Adventurer[]>>
  ) =>
  (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    field: string,
    nextSortDirection: string | undefined
  ) => {
    const newData = [...sort.data];

    const key = (value: Adventurer): string | number => {
      if (field === "speciality.name" && value.speciality.name) {
        return value.speciality.name;
      }
      const getField = value[field as keyof Adventurer];
      return typeof getField === "string" || typeof getField === "number"
        ? getField
        : field;
    };

    const reverse = nextSortDirection === "asc" ? 1 : -1;

    newData.sort((aItem, bItem) => {
      const aValue = key(aItem);
      const bValue = key(bItem);
      return reverse * (Number(aValue > bValue) - Number(bValue > aValue));
    });

    const newSort: SortType = {
      data: newData,
      sortedBy: field,
      sortDirection: nextSortDirection,
    };

    setSort(newSort);
    setDataTable(newSort.data);
  };

export default handleOnSortAdventurers;
