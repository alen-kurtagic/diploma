interface APIAutocompleteItem {
    id: number;
    ac_text: string;
    ac_group: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}
const getAutocompleteResults = async (query: string) => {
    const response = await fetch(`https://king2.geosx.io/king/gurs/_sx1/gsxsearch?callback=jQuery11240518186399443592_1648644038548&s=${query}`);
    const text = await response.text();
    const removedPrefix = text.replace(/^.*?\(/, '').replace(/\);?$/, '');
    let data = JSON.parse(removedPrefix).r;
    data = data.filter((suggestion: APIAutocompleteItem) => suggestion.ac_group != "ko");
    return data;
  };
  
export { getAutocompleteResults as default };
export type { APIAutocompleteItem };
