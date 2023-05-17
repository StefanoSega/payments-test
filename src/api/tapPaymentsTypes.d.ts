export interface Card {
  number: number;
  exp_month: number;
  exp_year: number;
  cvc: number;
  name: string;
  address?: Address;
}

interface Address {
  country: string;
  line1: string;
  city: string;
  street: string;
  avenue: string;
}

interface ChargeReference {
  transaction: string;
  order: string;
}

interface ChargeReceipt {
  email: boolean;
  sms: boolean;
}

interface ChargeCustomer {
  first_name: string;
  middle_name?: string;
  last_name?: string;
  email?: string;
  phone?: {
    country_code: number;
    number: number;
  };
}

export interface CreateTokenRequest {
  card: Card;
  client_ip?: string;
}

// todo: not complete
export interface CreateTokenResponse {
  id: string;
}

export interface CreateChargeRequest {
  amount: number;
  currency: string;
  threeDSecure?: boolean;
  save_card?: boolean;
  description?: string;
  reference?: ChargeReference;
  receipt?: ChargeReceipt;
  customer: ChargeCustomer;
  source: {
    id: string;
  };
  post?: {
    url: string;
  };
  redirect?: {
    url: string;
  };
  metadata?: Record<string, string>;
}

// todo: not complete
export interface CreateChargeResponse {
  id: string;
  transaction: {
    url: string;
  };
}
