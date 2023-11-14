import { DefaultApi, Configuration } from "api-client";

export const goalsApi = new DefaultApi(
  new Configuration({
    basePath: "http://0.0.0.0:8000",
  })
);
