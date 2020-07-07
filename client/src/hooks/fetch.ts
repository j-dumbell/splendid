import { useState, useEffect } from "react";
import fetch from "node-fetch";

import config from "../config";

export const useAsyncFetchData = (path: string) => {
  const [data, setData] = useState();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!config.apiUrl) {
      const errorMessage = 'apiUrl not set';
      setError(errorMessage);
      return;
    }
  
    const url = config.apiUrl + path;
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const { result } = await response.json();
        setData(result);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [path]);

  return [loading, error, data];
};
