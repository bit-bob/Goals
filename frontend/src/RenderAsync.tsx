import { ReactNode, useEffect, useState } from "react";

interface RenderAsyncProps<T> {
  resolve: Promise<T>;
  fallback: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderErrorElement: (reason: any) => ReactNode;
  renderElement: (data: T) => ReactNode;
}

export function RenderAsync<T>({
  resolve,
  fallback,
  renderErrorElement,
  renderElement,
}: RenderAsyncProps<T>) {
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<any>(undefined);
  const [data, setData] = useState<T>();

  useEffect(() => {
    setLoading(true);
    setError(undefined);
    setData(undefined);
    resolve
      .then((data) => {
        setLoading(false);
        setData(data);
      })
      .catch((reason) => {
        setLoading(false);
        setError(reason);
      });
  }, [resolve]);

  if (loading) {
    return fallback;
  }

  if (!error && data) {
    return renderElement(data);
  }

  return renderErrorElement(error);
}
