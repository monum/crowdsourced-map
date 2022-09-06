import * as turf from "@turf/turf";
import locationData from "../Boston Locations Data/Boston_Neighborhoods.json";

const getNeighborhood = (lng, lat) => {
  const features = locationData.features;

  const point = turf.point([
    parseFloat(lng.toFixed(14)),
    parseFloat(lat.toFixed(14)),
  ]);
  const neighborhood = features.find((feature) =>
    turf.booleanWithin(point, feature)
  );

  return neighborhood?.properties.Name;
};

export default getNeighborhood;
