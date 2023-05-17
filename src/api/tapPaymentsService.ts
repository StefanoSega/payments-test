import { getConfig } from "~/config";
import { RestService } from "./restService";
import {
  Card,
  CreateChargeRequest,
  CreateChargeResponse,
  CreateTokenRequest,
  CreateTokenResponse,
} from "./tapPaymentsTypes";
import { PaymentGatewayApiConfig } from "./apiTypes";
import cacheService from "~/cache";

const tokenCacheKey = "tap-payments:token";

export class TapPaymentsService {
  private readonly config: PaymentGatewayApiConfig;
  private readonly restService: RestService;

  constructor() {
    this.config = getConfig().api.tapPayments;
    this.restService = new RestService(this.config.baseUrl);
  }

  private async createToken(params: CreateTokenRequest) {
    const response = await this.restService.post<
      CreateTokenResponse,
      CreateTokenRequest
    >("tokens", params, this.config.apiKey);
    if (!response.isSuccess) {
      throw new Error(response.error);
    }

    const newToken = response.data.id;
    await cacheService.set(tokenCacheKey, newToken);

    return newToken;
  }

  private async getToken(card: Card) {
    const token = await cacheService.get(tokenCacheKey);
    if (!token) {
      return await this.createToken({
        card,
      });
    }

    return token;
  }

  async createCharge(card: Card, amount: number, phoneNumber: number) {
    const token = await this.getToken(card);
    const response = await this.restService.post<
      CreateChargeResponse,
      CreateChargeRequest
    >(
      "charges",
      {
        amount,
        currency: "AED",
        customer: {
          first_name: card.name,
          phone: {
            country_code: 971,
            number: phoneNumber,
          },
        },
        threeDSecure: true,
        source: {
          id: token,
        },
        redirect: {
          url: this.config.redirectUrl,
        },
      },
      this.config.apiKey
    );

    if (!response.isSuccess) {
      const errorMessage = response.error.errors
        .map((err) => err.description)
        .join(" ");
      throw new Error(errorMessage);
    }

    return response.data;
  }
}
