import { APISuggestion } from "../types/types";

const getSuggestions = async (query: string) => {
    const url: string= `https://king2.geosx.io/king/gurs/_sx1/gsxsearch?callback=jQuery11240518186399443592_1648644038548&s=${query}`;
    const response: Response = await fetch(url);
    const responseText: any = await response.text();
    const responseJSON: any = JSON.parse(responseText.replace(/^.*?\(/, '').replace(/\);?$/, '')).r;
    const data = responseJSON.filter((suggestion: APISuggestion) => suggestion.ac_group != "ko");
    return data;
  };
  
export { getSuggestions as default };
export type { APISuggestion };
