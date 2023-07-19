const getOrganization = async (
  regNumber: string
): Promise<GeoJSON.Feature | null> => {
  const url: string = `https://king2.geosx.io/gurs/_sx1/sxtables/sxid_sifrant_gji_mat_st_naslovi/data/.json?filter=MAT_ST=${regNumber}`;
  try {
    const response: Response = await fetch(url);
    const responseText: string = await response.text();
    const responseJSON: GeoJSON.FeatureCollection = JSON.parse(
      responseText.replace(/^.*?\(/, "").replace(/\);?$/, "")
    );
    return responseJSON.features[0];
  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
    return null;
  }
};

export default getOrganization;
