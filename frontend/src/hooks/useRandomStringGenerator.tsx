import { stringify } from "querystring";
import { useCallback } from "react";

const useRandomStringGenerator = () => {
  const generateRandomString = useCallback((type: string) => {
    const min = 1000000000000000;
    const max = 9999999999999999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    return `${type}-${randomNumber}`;
  }, []);

  return { generateRandomString };
};

export default useRandomStringGenerator;
