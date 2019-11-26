
import React from "react";
import { Component } from "react";
import { CustomerList } from "./CustomerList"
import { OrdersApi } from "../api/OrdersApi"
import { CircularProgress, Grid } from "@material-ui/core";
import { OrderList } from "./OrderList";



interface State {
  selectedCustomerName?: string;
}

export class OrderSummaryContainer extends Component<{}, State> {
  ordersApi: OrdersApi;

  constructor(props: {}) {
    super(props);
    this.ordersApi = new OrdersApi();
    this.state = {};
  }


  // async componentDidMount() {

  // }

  changeSelectedCustomer(customerName: string): void {
    console.log(`Selecting customer: ${customerName}`);
    this.setState({ selectedCustomerName: customerName })
  }

  render(): JSX.Element {
    if (this.state) {
      return (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <CustomerList
              orderSummariesPromise={this.ordersApi.getOrderSummariesByCustomer()}
              changeSelectedCustomer={this.changeSelectedCustomer.bind(this)}
              selectedCustomerName={this.state.selectedCustomerName}
            />
          </Grid>
          <Grid item>
            <OrderList
              orderSummariesPromise={this.ordersApi.getOrderSummariesByCustomer()}
              selectedCustomerName={this.state.selectedCustomerName}
            />
          </Grid>
        </Grid>
      );
    }
    return <CircularProgress />;
  }
}
