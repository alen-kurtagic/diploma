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
  WaterSupply = "Dovod vode",
  EnergySupply = "Dovod elektrike",
  GasSupply = "Dovod plina",
  Nature2000 = "Natura 2000",
  NatureProtected = "Zavarovana območja",
  NatureImportant = "Naravno pomembna omobčja",
  NationalRoads = "Državne ceste",
  LocalRoads = "Občinske ceste",
  Railways = "Železnice",
  NationalWater = "Državna vodovarstvena območja",
  LocalWater = "Občinska vodovarstvena območja",
  Beach = "Priobalno morje",
  BrownBear = "Rjavi medved",
}

interface LayerData {
  color: string;
  permit?: string;
  regNo?: number;
}

const layerMapping: Record<string, LayerData> = {
  Parcela: {
    color: "#0D99FF",
  },
  Jame: {
    color: "#cf8c06",
    permit: "Dovoljenje z vidika varstva podzemnih jam",
    regNo: 2482878,
  },
  "Kulturna dediščina": {
    color: "#EFD48E",
    permit: "Kulturnovarstveno soglasje za posege",
    regNo: 1423215,
  },
  "Kmetijska raba": {
    color: "#856644",
    regNo: 2399253,
  },
  "Kmetijsko gospodarstvo": {
    color: "#EFD48E",
  },
  "Varovalni gozdovi": {
    color: "#2d8700",
    permit: "Mnenje za gradnjo v gozdnem prostoru",
    regNo: 5786380,
  },
  Namakalni: {
    color: "#ff8f0f",
    permit:
      "Mnenje v zvezi z gradnjami na območju hidromelioracijskih sistemov",
    regNo: 2399253,
  },
  Osuševalni: {
    color: "#ff8f0f",
    permit:
      "Mnenje v zvezi z gradnjami na območju hidromelioracijskih sistemov",
    regNo: 2399253,
  },
  Ceste: {
    color: "#D9D9D9",
    permit: "Mnenje za občinske javne ceste",
  },
  Kanalizacija: {
    color: "#D9D9D9",
    permit: "Mnenje za kanalizacijo",
  },
  "Dovod vode": {
    color: "#D9D9D9",
    permit: "Mnenje za vodovod",
  },
  "Dovod elektrike": {
    color: "#D9D9D9",
    permit: "/",
  },
  "Dovod plina": {
    color: "#D9D9D9",
    permit: "/",
  },
  "Natura 2000": {
    color: "#A8DA81",
    permit: "Naravovarstveno soglasje",
    regNo: 1684884,
  },
  "Zavarovana območja": {
    color: "#73b342",
    permit: "Naravovarstveno soglasje",
    regNo: 1684884,
  },
  "Naravno pomembna omobčja": {
    color: "#73b342",
    permit: "Naravovarstveno soglasje",
    regNo: 1684884,
  },
  "Državne ceste": {
    color: "#D1D1D1",
    permit: "Mnenje državne ceste",
  },
  "Občinske ceste": {
    color: "#D1D1D1",
    permit: "Mnenje občinske ceste",
  },
  Železnica: {
    color: "#D1D1D1",
    permit: "Mnenje železnice",
    regNo: 6017177,
  },
  "Državna vodovarstvena območja": {
    color: "#81D5FA",
    permit: "Vodno soglasje",
    regNo: 2482878,
  },
  "Občinska vodovarstvena območja": {
    color: "#81D5FA",
    permit: "Vodno soglasje",
    regNo: 2482878,
  },
  "Priobalno morje": {
    color: "#81D5FA",
    permit: "Vodno soglasje",
    regNo: 2482878,
  },
  "Rjavi medved": {
    color: "#826324",
    permit: "Mnenje za posege v okolje divjadi",
    regNo: 5786380,
  },
};

export { getLayerDataByName, LayerName, layerMapping };

export type { LayerData };
