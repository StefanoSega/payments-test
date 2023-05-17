import { getAuthConfig } from "./auth";
import { getDbConfig } from "./db";
import { getApiConfig } from "./api";

export const getConfig = () => ({
  auth: getAuthConfig(),
  db: getDbConfig(),
  api: getApiConfig(),
});
