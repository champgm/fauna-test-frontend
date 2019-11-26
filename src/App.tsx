import React from 'react';
import './App.css';
import { OrdersApi } from './api/OrdersApi';
import { CustomerList } from './component/CustomerList';

const ordersApi = new OrdersApi();

function changeDisplayedHost(customerName: string): void {

}

const App: React.FC = () => {
  return (
    <div className="App">
      <CustomerList
        orderSummariesPromise={ordersApi.getOrderSummariesByCustomer()}
        changeDisplayedHost={changeDisplayedHost}
      />
    </div>
  );
}

export default App;
