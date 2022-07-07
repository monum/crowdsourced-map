import data from "./Boston_Neighborhoods.json";

export default class Location {
  #name = "";
  #sqMiles = null;
  #center = null;

  #setCenter = () => {
    const markers = () => {
      const neighborhoodData = data.features.find(
        (feature) => feature.properties.Name === this.#name
      );

      return neighborhoodData.geometry.coordinates;
    };
    const coordsArr = getCoordsArr(markers());

    this.#center = {
      lat: getMiddle("lat", coordsArr),
      lng: getMiddle("lng", coordsArr),
    };
  };

  getCenter = (recalculate = false) => {
    if (recalculate) {
      this.#setCenter();
    }
    return this.#center;
  };

  constructor(name) {
    const neighborhoodData = data.features.filter(
      (feature) => feature.properties.Name === name
    );

    if (!neighborhoodData) return null;

    this.#name = name;
    // this.#sqMiles = neighborhoodData.properties["SqMiles"];
    this.#setCenter();
  }
}

const getCoordsArr = (arr) => {
  const coordsArr = [];

  class Obj {
    constructor(lng = 0, lat = 0) {
      this.lat = lat;
      this.lng = lng;
    }
  }

  let coordsObj = new Obj();

  const getArr = (arr) => {
    arr.forEach((a, i) => {
      if (Array.isArray(a)) {
        coordsObj = new Obj();
        getArr(a);
      } else {
        if (i === 0) {
          coordsObj.lng = a;
        } else if (i === 1) {
          coordsObj.lat = a;
          coordsArr.push(coordsObj);
        }
      }
    });
  };

  getArr(arr);
  return coordsArr;
};

const getMiddle = (prop, markers) => {
  let values = markers.map((m) => m[prop]);
  let min = Math.min(...values);
  let max = Math.max(...values);
  if (prop === "lng" && max - min > 180) {
    values = values.map((val) => (val < max - 180 ? val + 360 : val));
    min = Math.min(...values);
    max = Math.max(...values);
  }
  let result = (min + max) / 2;
  if (prop === "lng" && result > 180) {
    result -= 360;
  }
  return result;
};
