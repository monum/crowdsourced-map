import { useState, useEffect } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    breakPoint:
      window.innerWidth > 905 ? "lg" : window.innerWidth < 600 ? "sm" : "md",
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        breakPoint:
          window.innerWidth > 905
            ? "lg"
            : window.innerWidth < 600
            ? "sm"
            : "md",
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
