import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import { FilterFn } from "@tanstack/react-table";
import { Table } from "@tanstack/react-table";

export const fuzzyFilter: FilterFn<unknown> = (
  row,
  _columnId,
  value,
  addMeta
) => {
  const itemRanks = row.getAllCells().map((cell) => {
    const itemRank = rankItem(cell.getValue(), value);
    return itemRank;
  });

  const bestRank = itemRanks.reduce<RankingInfo>(
    (best, current) =>
      current.passed && current.rank < best.rank ? current : best,
    {
      passed: false,
      rank: Infinity,
      rankedValue: "",
      accessorIndex: -1,
      accessorThreshold: 0,
    } as RankingInfo
  );

  addMeta({
    itemRank: bestRank,
  });

  return bestRank.passed;
};

export const nextPage = <T>(table: Table<T>) => {
  table.nextPage();
};

export const previousPage = <T>(table: Table<T>) => {
  table.previousPage();
};
