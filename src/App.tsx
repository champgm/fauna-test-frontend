import React from 'react';
import './App.css';
import { OrderSummaryContainer } from './component/OrderSummaryContainer';



const App: React.FC = () => {
  return (
    <div className="App">
      <OrderSummaryContainer/>
    </div>
  );
}

export default App;
