import { DefaultApi, Configuration } from "api-client";

export const goalsApi = new DefaultApi(
  new Configuration({
    basePath: "http://192.168.1.179:8000",
  })
);
