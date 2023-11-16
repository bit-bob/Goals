import { Record } from "api-client";

export function getGraphDataFromRecords(records: Record[]) {
  return (records ?? []).reduce<{
    sum: number;
    entries: Array<{ time: string; timeLong: string; value: number }>;
  }>(
    (acc, cur) => {
      // TODO: use the goal bucket size for this...
      // handle multiple logs on the same day by removing the last element and adding the new total
      if (
        acc.entries.length > 0 &&
        acc.entries[acc.entries.length - 1].time ==
          cur.date.toISOString().split("T")[0]
      ) {
        return {
          sum: acc.sum + cur.amount,
          entries: [
            ...acc.entries.slice(0, -1),
            {
              time: cur.date.toISOString().split("T")[0],
              timeLong: cur.date.toISOString(),
              value: acc.sum + cur.amount,
            },
          ],
        };
      }

      return {
        sum: acc.sum + cur.amount,
        entries: [
          ...acc.entries,
          {
            time: cur.date.toISOString().split("T")[0],
            timeLong: cur.date.toISOString(),
            value: acc.sum + cur.amount,
          },
        ],
      };
    },
    { sum: 0, entries: [] }
  );
}
