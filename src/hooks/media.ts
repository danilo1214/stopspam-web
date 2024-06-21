import { useEffect, useState } from "react";

export const useBreakpoint = (): {
  isSmallScreen?: boolean;
  isMediumScreen?: boolean;
  isLargeScreen?: boolean;
} => {
  const [screenSize, setScreenSize] = useState({});

  useEffect(() => {
    const updateScreenSize = () => {
      const isSmallScreen = window.matchMedia("(max-width: 640px)").matches;
      const isMediumScreen = window.matchMedia("(max-width: 1024px)").matches;
      const isLargeScreen = window.matchMedia("(min-width: 1025px)").matches;

      setScreenSize({ isSmallScreen, isMediumScreen, isLargeScreen });
    };

    updateScreenSize();

    const handleResize = () => {
      updateScreenSize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
};
