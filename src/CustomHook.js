import { useState, useEffect } from "react";

export const useFetch = url => {
  const [data, setData] = useState();
  const [hasError, sethasError] = useState(false);
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setData(data))
      .error(error => sethasError(true));
  });
  return {
    data,
    hasError
  };
};
