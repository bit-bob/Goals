import { ReactNode, useEffect, useState } from "react";

interface RenderAsyncProps<T> {
  fallback: ReactNode;
  renderElement: (data: T) => ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderErrorElement: (reason: any) => ReactNode;
  resolve: Promise<T>;
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

  if (loading && !data) {
    return fallback;
  }

  if (!error && data) {
    return renderElement(data);
  }

  return renderErrorElement(error);
}
