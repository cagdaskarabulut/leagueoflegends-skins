import { useCallback } from "react";

export default function useAdClick(apiPath = "/api/commercial/add_click") {
  // Tıklama API çağrısını tetikleyen işlev
  const handleAdClick = useCallback(() => {
    fetch(apiPath)
      .then((response) => {
        if (!response.ok) throw new Error("API isteği başarısız oldu");
        return response.json();
      })
      .then((data) => console.log("API response:", data))
      .catch((error) => console.error("API error:", error));
  }, [apiPath]);

  return handleAdClick;
}
