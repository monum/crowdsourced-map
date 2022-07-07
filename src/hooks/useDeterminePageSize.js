import { useState, useEffect } from "react";
import { useWindowSize } from "./";

const useDeterminePageSize = (mapIsActive) => {
  const { width } = useWindowSize();

  const checkPageSize = () => {
    if (mapIsActive) {
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
  }, [mapIsActive, width]);
  return {
    mapSize,
    mainPageSize,
  };
};

export default useDeterminePageSize;
