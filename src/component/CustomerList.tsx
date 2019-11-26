
import React from "react";
import { Component } from "react";
import Grid from '@material-ui/core/Grid';
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import { List, makeStyles, Paper, Typography, Divider, Chip } from "@material-ui/core";
import { OrderSummary } from "../api/OrderSummary";

export interface Props {
  orderSummariesPromise: Promise<{ [customerName: string]: OrderSummary[] }>;
  changeDisplayedHost: (customerName: string) => void;
}

interface State {
  customerData: OrderTotal[];
  displayedCustomer?: string;
}

interface OrderTotal {
  name: string,
  totalSpend: number,
}

export class CustomerList extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      customerData: [{
        name: 'No data loaded',
        totalSpend: 0
      }]
    };
  }


  async componentDidMount() {
    // Calculate total spending for each customer over all orders
    const orderSummaries = await this.props.orderSummariesPromise;
    const customerSpendTotalMap = Object.keys(orderSummaries).reduce((accumulator, customerName) => {
      const totalSpend = orderSummaries[customerName].reduce((totalSpend, orderSummary) => {
        return totalSpend + orderSummary.totalPrice;
      }, 0)
      accumulator[customerName] = totalSpend;
      return accumulator;
    }, {} as { [customerName: string]: number });

    // Convert that map to an array and sort it based on spend amount
    const customerSpendTotals: OrderTotal[] = Object.keys(customerSpendTotalMap)
      .map((name) => ({ name, totalSpend: customerSpendTotalMap[name] }))
      .sort((first, second) => {
        if (first.totalSpend > second.totalSpend) return -1;
        if (first.totalSpend < second.totalSpend) return 1;
        return 0;
      })

    this.setState({ customerData: customerSpendTotals })
  }

  render(): JSX.Element {
    const allAddresses = this.state.customerData.map((customerData) => {
      const selected: boolean = (this.state.displayedCustomer !== undefined && (this.state.displayedCustomer === customerData.name))
      return (
        <ListItem
          key={customerData.name}
          selected={selected}
          onClick={event => this.props.changeDisplayedHost(customerData.name)}
        >
          {/* <ListItemAvatar>
            <Avatar>
              <DesktopWindowsIcon />
            </Avatar>
          </ListItemAvatar> */}
          <ListItemText
            primary={customerData.name}
            secondary={`$${customerData.totalSpend}`}
          />
        </ListItem>
      );
    })
    return (
      <List style={{
        overflow: 'auto',
        maxHeight: 500
      }}>
        {allAddresses}
      </List>
    );
  }
}
