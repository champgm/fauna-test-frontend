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
      const orderSummaries: OrderSummary[] = (await fetchResult.json()).payload;
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