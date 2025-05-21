import { CustomerProps } from './Customer.interface';

export interface TokenProps {
  success: string;
  access_token: string;
  token_type: string;
  expiration: string;
  customer: CustomerProps;
}
