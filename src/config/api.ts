import { ApiConfig } from "~/api/apiTypes";

export const getApiConfig = (): ApiConfig => ({
  tapPayments: {
    baseUrl: "https://api.tap.company/v2",
    apiKey: process.env.TAP_API_KEY,
    redirectUrl: "http://localhost:3000/redirect",
  },
});
