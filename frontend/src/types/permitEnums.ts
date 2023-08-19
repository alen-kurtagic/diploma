// Adjusted getLayerDataByName
const getLayerDataByName = (name: string): LayerData | undefined => {
  return layerMapping[name];
};

enum LayerName {
  Parcel = "Parcela",
  NaturalCave = "Jame",
  Culture = "Kulturna dediščina",
  FarmingUsage = "Kmetijska rab",
  FarmingEconomy = "Kmetijsko gospodarstvo",
  ForestProtection = "Varovalni gozdovi",
  Irrigation = "Namakalni sistemi",
  Drying = "Osuševalni sistemi",
  Roads = "Ceste",
  Sewer = "Kanalizacija",
  WaterSupply = "Vodovod",
  EnergySupply = "Dovod elektrike",
  GasSupply = "Dovod plina",
  Nature2000 = "Natura 2000",
  NatureProtected = "Zavarovana območja",
  NatureImportant = "Naravno pomembna omobčja",
  NationalRoads = "Državne ceste",
  LocalRoads = "Občinske ceste",
  Railways = "Železnica",
  NationalWater = "Državna vodovarstvena območja",
  LocalWater = "Občinska vodovarstvena območja",
  Beach = "Priobalna območja",
  BrownBear = "Območja rjavega medveda",
}

interface LayerData {
  color: string;
  permit?: string;
  regNo?: number;
  properties?: string[];
  weight?: number;
}

const layerMapping: Record<string, LayerData> = {
  Parcela: {
    color: "#0D99FF",
  },
  Sosed: {
    color: "#4fb5ff",
  },
  Jame: {
    color: "#cf8c06",
    permit: "Dovoljenje z vidika varstva podzemnih jam",
    regNo: 2482878,
    properties: ["ZVRST", "KRATKAOZNA", "IME_JAME", "REZIMVSTOP", "POMEN"],
    weight: 6,
  },
  "Kulturna dediščina": {
    color: "#EFD48E",
    permit: "Kulturnovarstveno mnenje za posege",
    regNo: 1423215,
    properties: ["TIP", "DATACIJA", "IME"],
    weight: 10,
  },
  "Kmetijska raba": {
    color: "#856644",
    regNo: 2399253,
    properties: ["VRSTA_DEJANSKE_RABE", "STATUS"],
    weight: 5,
  },
  "Kmetijsko gospodarstvo": {
    color: "#EFD48E",
  },
  "Varovalni gozdovi": {
    color: "#2d8700",
    permit: "Mnenje za gradnjo v gozdnem prostoru",
    regNo: 5786380,
    properties: [],
    weight: 8,
  },
  "Namakalni sistemi": {
    color: "#ff8f0f",
    permit:
      "Mnenje v zvezi z gradnjami na območju hidromelioracijskih sistemov",
    regNo: 2399253,
    properties: ["IMESISTEMA"],
    weight: 5,
  },
  "Osuševalni sistemi": {
    color: "#ff8f0f",
    permit:
      "Mnenje v zvezi z gradnjami na območju hidromelioracijskih sistemov",
    regNo: 2399253,
    properties: ["IMESISTEMA"],
    weight: 5,
  },
  Ceste: {
    color: "#D9D9D9",
    permit: "Soglasje za gradnjo z vidika varovanja javnih cest",
    properties: ["OPIS", "VP_OPIS"],
    weight: 8,
  },
  Kanalizacija: {
    color: "#D9D9D9",
    permit: "Mnenje za kanalizacijo",
    properties: ["OPIS", "VP_OPIS"],
    weight: 4,
  },
  Vodovod: {
    color: "#D9D9D9",
    permit: "Občinsko soglasje gospodarske javne infrastrukture",
    properties: ["OPIS", "VP_OPIS"],
    weight: 4,
  },
  "Dovod elektrike": {
    color: "#D9D9D9",
    permit: "Občinsko soglasje gospodarske javne infrastrukture",
    properties: ["OPIS"],
    weight: 4,
  },
  "Dovod plina": {
    color: "#D9D9D9",
    permit: "Občinsko soglasje gospodarske javne infrastrukture",
    properties: ["OPIS", "VP_OPIS"],
    weight: 4,
  },
  "Natura 2000": {
    color: "#A8DA81",
    permit: "Naravovarstveno mnenje",
    regNo: 1684884,
    properties: ["SAC"],
    weight: 10,
  },
  "Zavarovana območja": {
    color: "#73b342",
    permit: "Naravovarstveno mnenje",
    regNo: 1684884,
    properties: ["IME_ZNAMEN", "STATUS", "PREDPIS"],
    weight: 10,
  },
  "Naravno pomembna omobčja": {
    color: "#73b342",
    permit: "Naravovarstveno mnenje",
    regNo: 1684884,
    properties: ["IME", "KRATKAOZNA", "POMEN"],
    weight: 10,
  },
  "Državne ceste": {
    color: "#D1D1D1",
    permit: "Mnenje državne ceste",
    properties: ["OPIS"],
  },
  "Občinske ceste": {
    color: "#D1D1D1",
    permit: "Mnenje občinske ceste",
    properties: ["OPIS"],
  },
  Železnica: {
    color: "#D1D1D1",
    permit: "Soglasje za gradnjo z vidika varovanja železnic",
    regNo: 6017177,
    properties: ["OPIS"],
    weight: 8,
  },
  "Državna vodovarstvena območja": {
    color: "#81D5FA",
    permit: "Vodno mnenje",
    regNo: 2482878,
    properties: ["SODRSV_IME", "REZIM_IME"],
    weight: 9,
  },
  "Občinska vodovarstvena območja": {
    color: "#81D5FA",
    permit: "Vodno mnenje",
    regNo: 2482878,
    properties: ["SODRSV_IME", "REZIM_IME"],
    weight: 9,
  },
  "Priobalna območja": {
    color: "#81D5FA",
    permit: "Vodno mnenje",
    regNo: 2482878,
    properties: ["SODRSV_IME", "REZIM_IME"],
    weight: 9,
  },
  "Območja rjavega medveda": {
    color: "#826324",
    permit: "Mnenje za posege v okolje divjadi",
    regNo: 5786380,
    properties: ["OPISOBMOCJ"],
    weight: 6,
  },
};

export { getLayerDataByName, LayerName, layerMapping };

export type { LayerData };
