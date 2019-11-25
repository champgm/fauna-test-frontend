import { OrderSummary } from "./OrderSummary";

const get = {
  method: "GET",
  json: true,
}

export class OrdersApi {
  async getOrderSummariesByCustomer(): Promise<{ [customerName: string]: OrderSummary[] }> {
    try {
      const uri = `order-summary/`;
      const fetchResult = await fetch(uri, get);
      console.log(`fetchResult${JSON.stringify(fetchResult, null, 2)}`);
      const orderSummaries: OrderSummary[] = await fetchResult.json();
      console.log(`Retrieved summaries:${JSON.stringify(orderSummaries, null, 2)}`);
      return orderSummaries.reduce((accumulator, orderSummary) => {
        if (!accumulator[orderSummary.customerName]) {
          accumulator[orderSummary.customerName] = [orderSummary]
        } else {
          accumulator[orderSummary.customerName].push(orderSummary)
        }
        return accumulator;
      }, {} as { [customerName: string]: OrderSummary[] })
    } catch (error) {
      console.log(`Unable to retrieve order summaries: ${error}`);
      return {};
    }
  }
}