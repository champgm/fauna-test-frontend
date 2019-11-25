import { Address } from "./Address";

export interface LineSummary {
  name: string;
  description: string;
  subtotal: number;
}

export interface OrderSummary {
  address: Address;
  customerName: string;
  lines: LineSummary[];
  status: string;
  totalPrice: number;
}