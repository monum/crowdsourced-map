// this hooks determines the size of the map and main page on desktop and tab views
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { useWindowSize } from "./";

const useDeterminePageSize = () => {
  const { width, breakPoint } = useWindowSize();
  const { fullSizeMap } = useSelector((state) => state.utils);

  const checkPageSize = () => {
    // calculate the page sizes
    if (breakPoint !== "lg") return {};

    if (fullSizeMap) {
      if (width < 1155) {
        return {
          mapSize: 100,
          mainPageSize: 0,
        };
      } else {
        return {
          mapSize: 70,
          mainPageSize: 30,
        };
      }
    } else {
      if (width < 1155) {
        return {
          mapSize: 70,
          mainPageSize: 30,
        };
      } else {
        return {
          mapSize: 30,
          mainPageSize: 70,
        };
      }
    }
  };

  const [mapSize, setMapSize] = useState(checkPageSize().mapSize);
  const [mainPageSize, setMainPageSize] = useState(
    checkPageSize().mainPageSize
  );

  useEffect(() => {
    setMapSize(checkPageSize().mapSize);
    setMainPageSize(checkPageSize().mainPageSize);
  }, [fullSizeMap, width]);

  return {
    renderFullMap: mapSize === 70 || mapSize === 100 ? true : false,
    renderMainPage: mainPageSize === 70 || mainPageSize === 30 ? true : false,
    mapSize,
    mainPageSize,
  };
};

export default useDeterminePageSize;
