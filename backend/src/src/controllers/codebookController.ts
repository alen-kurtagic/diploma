import { getByIds } from "../database/models/Settlement";

const getSettlementNames = async (
  ids: Array<number>
): Promise<Array<string>> => {
  try {
    const settlement: Array<string> = await getByIds(ids);

    const uniqueSortedSettlements = createUniqueSortedArray(settlement);

    return uniqueSortedSettlements;
  } catch (error) {
    throw new Error(`Failed to fetch municipalities by ids`);
  }
};

const createUniqueSortedArray = (strings: string[]): string[] => {
  const stringCountMap: Map<string, number> = new Map();

  // Count the occurrences of each string
  for (const str of strings) {
    const count = stringCountMap.get(str) || 0;
    stringCountMap.set(str, count + 1);
  }

  // Sort the unique strings based on their occurrence count
  const uniqueSortedStrings: string[] = Array.from(stringCountMap.keys()).sort(
    (a, b) => stringCountMap.get(b)! - stringCountMap.get(a)!
  );

  // Generate the resulting array based on occurrence count
  const result: string[] = [];
  for (const str of uniqueSortedStrings) {
    const count = stringCountMap.get(str)!;
    result.push(...Array(count).fill(str));
  }

  return result;
};

export { getSettlementNames };
