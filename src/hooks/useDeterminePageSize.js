import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useWindowSize } from "./";

const useDeterminePageSize = () => {
  const { fullSizeMap } = useSelector((state) => state.utils);
  const { width, breakPoint } = useWindowSize();

  const checkPageSize = () => {
    if (width < 890) return {};

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
