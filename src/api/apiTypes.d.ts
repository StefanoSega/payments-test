interface PaymentGatewayApiConfig {
  baseUrl: string;
  apiKey: string;
  redirectUrl: string;
}

export interface ApiConfig {
  tapPayments: PaymentGatewayApiConfig;
}
