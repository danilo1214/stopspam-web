import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function Loader(): JSX.Element | null {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [targetUrl, setTargetUrl] = useState<string | null>(null);

  useEffect(() => {
    const handleStart = (url: string) => {
      setTargetUrl(url);
      setLoading(true);
    };

    const handleComplete = (url: string) => {
      if (url === targetUrl) {
        setLoading(false);
        setTargetUrl(null);
      }
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router, targetUrl]);

  return loading ? (
    <div className="fixed left-0 top-0 z-50 h-1 w-full overflow-hidden bg-transparent">
      <div className="relative h-full w-full">
        <div className="animate-loader absolute left-[-30%] h-full w-1/3 bg-primary-500"></div>
      </div>
    </div>
  ) : null;
}

export default Loader;
