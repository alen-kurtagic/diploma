import { getStreetByIds } from "../database/models/Street";

const getStreets = async (ids: Array<string>): Promise<Array<string>> => {
  try {
    const streets: Array<string> = await getStreetByIds(ids);
    return streets;
  } catch (error: any) {
    throw new Error(`Failed to fetch closest streets: ${error.message}`);
  }
};

export { getStreets };
