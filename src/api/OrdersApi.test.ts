
import 'jest';

import { OrdersApi } from './OrdersApi';
import { getFetchMock } from '../__mocks__/fetch';
import { OrderSummary } from './OrderSummary';

const fetchMock = getFetchMock();

describe('OrdersApi', () => {
  let ordersApi: OrdersApi;
  let orderSummary: OrderSummary;
  beforeEach(() => {
    fetchMock.resetMocks();
    orderSummary = {
      address: {
        street: 'street',
        city: 'city',
        state: 'state',
        zipCode: 'zipCode',
      },
      customerName: 'customerName',
      lines: [{
        name: 'name',
        description: 'description',
        subtotal: 10,
      }],
      status: 'status',
      totalPrice: 10,
    }
    fetchMock.mockResponseOnce(JSON.stringify({ payload: [orderSummary] }))
    ordersApi = new OrdersApi();
  });

  describe('getOrderSummariesByCustomer', () => {
    it('should map order summaries by customer name', async () => {
      const result = await ordersApi.getOrderSummariesByCustomer();
      expect(result).toEqual({ customerName: [orderSummary] })
    });
  });
});