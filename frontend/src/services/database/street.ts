const getStreetsByIds = async (ids: Array<number>): Promise<Array<string>> => {
  const url = `http://localhost:3000/layer/street?ids=${ids.join(",")}`;
  const response: Response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const data: Array<string> = await response.json();
  return data;
};

export { getStreetsByIds };
