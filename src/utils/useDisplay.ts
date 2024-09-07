import { useState, useEffect } from "react";

const useDisplay = (breakpoint: number = 768) => {
  const [mdAndUp, setMdAndUp] = useState<boolean>(false);

  useEffect(() => {
    const checkWindowSize = () => {
      setMdAndUp(window.innerWidth >= breakpoint);
    };

    checkWindowSize();

    window.addEventListener("resize", checkWindowSize);

    return () => {
      window.removeEventListener("resize", checkWindowSize);
    };
  }, [breakpoint]);

  return mdAndUp;
};

export default useDisplay;
