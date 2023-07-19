const getStreetsByIds = async (ids: Array<string>): Promise<Array<string>> => {
  const url = `http://localhost:3000/data/streets?ids=${ids.join(",")}`;
  const response: Response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `API request failed with status ${response.status} and status text ${response.statusText}`
    );
  }

  const data: Array<string> = await response.json();
  return data;
};

export { getStreetsByIds };
