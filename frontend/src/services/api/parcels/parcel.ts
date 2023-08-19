const isBigNumber = (num: string | number, key: string): boolean =>
  key === "EID_PARCEL" && !Number.isSafeInteger(+num);

const enquoteBigNumber = (
  jsonString: string,
  bigNumChecker: (num: string | number, key: string) => boolean
): string =>
  jsonString.replaceAll(/"([^"]+)":\s*(\d+)/g, (matchingSubstr, key, bigNum) =>
    bigNumChecker(bigNum, key) ? `"${key}": "${bigNum}"` : matchingSubstr
  );

const parseWithBigInt = (
  jsonString: string,
  bigNumChecker: (num: string | number, key: string) => boolean
): any =>
  JSON.parse(enquoteBigNumber(jsonString, bigNumChecker), (key, value) =>
    typeof value === "string" &&
    !Number.isNaN(Number(value)) &&
    bigNumChecker(value, key)
      ? String(value)
      : value
  );

interface FeatureProperties {
  ST_PARCELE: string;
  KO_ID: string;
  EID_PARCEL: string;
  LASTNIK_VSI: string;
  POSPLOSENA_VREDNOST: string | null;
}

interface Feature {
  type: string;
  properties: FeatureProperties;
}

interface TractApiGeoJSON {
  type: string;
  features: Feature[];
}

const getApiParcels = async (parcelIds: string[]): Promise<TractApiGeoJSON> => {
  const url: string = `https://king2.geosx.io/gurs/_sx1/sxtables/sxid_gurs_kn_parcele/data/.json?filter=EID_PARCEL%20IN%20(${parcelIds})&select=st_parcele,ko_id,eid_parcel,lastnik_vsi,posplosena_vrednost`;
  try {
    const response: Response = await fetch(url);
    const responseText: string = await response.text();
    const responseJSON: TractApiGeoJSON = parseWithBigInt(
      responseText.replace(/^.*?\(/, "").replace(/\);?$/, ""),
      isBigNumber
    );
    return responseJSON;
  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
    return {
      type: "FeatureCollection",
      features: [],
    };
  }
};

export { getApiParcels };
export type { TractApiGeoJSON };
