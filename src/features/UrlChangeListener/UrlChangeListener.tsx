// src/pages/url-change-listener.tsx

import { useEffect } from "react";
import { useRouter } from "next/router";

export function UrlChangeListener() {
  const router = useRouter();

  useEffect(() => {
    const startHandler = () => {
      console.log("Router change started");
    };

    const completeHandler = () => {
      console.log("Router change completed");
    };

    router.events.on("routeChangeStart", startHandler);

    router.events.on("routeChangeComplete", completeHandler);

    return () => {
      router.events.off("routeChangeStart", startHandler);
      router.events.off("routeChangeComplete", completeHandler);
    };
  }, []);

  return <></>;
}
