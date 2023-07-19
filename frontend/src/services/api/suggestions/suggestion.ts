interface BoundingBox {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface SuggestionValues {
  id: number;
  cityName: string;
  locationName: string | null;
  text: string;
  group: string;
  boundingBox: BoundingBox;
}

interface APISuggestion {
  id: number;
  ac_text: string;
  ac_group: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface APISuggestionResponse {
  r: APISuggestion[];
}

const getSuggestions = async (query: string): Promise<SuggestionValues[]> => {
  const url: string = `https://king2.geosx.io/king/gurs/_sx1/gsxsearch?callback=jQuery11240518186399443592_1648644038548&s=${query}`;
  try {
    const response: Response = await fetch(url);
    const responseText: string = await response.text();
    const responseJSON: APISuggestionResponse = JSON.parse(
      responseText.replace(/^.*?\(/, "").replace(/\);?$/, "")
    );
    const data: SuggestionValues[] = responseJSON.r
      .filter((suggestion) => suggestion.ac_group !== "ko")
      .map((suggestion) => {
        // Extract main and helper text from ac_text property
        const [cityName, locationName] = suggestion.ac_text
          .split(",")
          .map((s) => s.trim());

        return {
          id: suggestion.id,
          cityName,
          locationName: locationName || null,
          text: suggestion.ac_text,
          group: suggestion.ac_group,
          boundingBox: {
            x1: suggestion.x1,
            y1: suggestion.y1,
            x2: suggestion.x2,
            y2: suggestion.y2,
          },
        };
      });
    return data;
  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
    return [];
  }
};

export default getSuggestions;

export type { getSuggestions, SuggestionValues };
