
import React from "react";
import { Component } from "react";
import Grid from '@material-ui/core/Grid';
import {  Typography } from "@material-ui/core";
import { OrderSummary } from "../api/OrderSummary";
import { OrderSummaryCard } from './OrderSummaryCard';

export interface Props {
  orderSummariesPromise: Promise<{ [customerName: string]: OrderSummary[] }>;
  // changeSelectedCustomer: (customerName: string) => void;
  selectedCustomerName?: string;
}

interface State {
  orderSummaries: { [customerName: string]: OrderSummary[] };
  classes?: Record<"card" | "expand" | "expandOpen", string>;
}



export class OrderList extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      orderSummaries: {},
    };
  }

  componentWillMount() {
    this.props.orderSummariesPromise.then((orderSummaries) => {
      this.setState({ orderSummaries })
    });
  }

  render(): JSX.Element {
    if (this.props.selectedCustomerName
      && this.state.orderSummaries
      && this.state.orderSummaries[this.props.selectedCustomerName]) {
      const customerSummaries = this.state.orderSummaries[this.props.selectedCustomerName]
      const allOrders = customerSummaries.map((orderSummary, index) => {
        return (
          <Grid item
            key={`${orderSummary.customerName}${index}`}
          >
            <OrderSummaryCard
              orderSummary={orderSummary}
              index={index}
            />
          </Grid>);
      });
      return (
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          {allOrders}
        </Grid>
      );

    }
    return <Typography>Select a customer to display their orders</Typography>;
  }
}
