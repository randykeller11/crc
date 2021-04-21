import { useState, useEFfect } from "react";

export const useFetchHook = () => {
  const { result, setResult } = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setResult(data);
      } catch (error) {
        console.error("Error fetching data");
        setError.error.message;
      }
      setIsLoading(false);
    }
  }, []);
};
