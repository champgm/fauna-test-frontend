
import React from "react";
import { Component } from "react";
import Grid from '@material-ui/core/Grid';
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { orderSummaries } from "../api/orderSummaries";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import { List, makeStyles, Paper, Typography, Divider, Chip } from "@material-ui/core";
import { OrderSummary } from "../api/OrderSummary";

export interface Props {
  orderSummaries: OrderSummary[];
}

interface State {
  customerData: OrderTotal[];
  displayedCustomer?: string;
}

interface OrderTotal {
  name: string,
  totalSpend: number,
}

export class HostList extends Component<Props, State> {

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
    const customerSpendTotalMap = this.props.orderSummaries.reduce((accumulator, orderSummary) => {
      accumulator[orderSummary.customerName] = accumulator[orderSummary.customerName] !== undefined
        ? accumulator[orderSummary.customerName] = accumulator[orderSummary.customerName] + orderSummary.totalPrice
        : orderSummary.totalPrice
    }, {} as any);

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
      return (
        <ListItem
          key={customerData.name}
          selected={(this.state.displayedCustomer && this.state.displayedCustomer === customerData.name)}
          onClick={event => this.changeDisplayedHost(address)}
        >
          <ListItemAvatar>
            <Avatar>
              <DesktopWindowsIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={address} />
        </ListItem>
      );
    })
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={5}
      >
        <Grid item xs={2}>
          <List style={{
            overflow: 'auto',
            maxHeight: 500
          }}>
            {allAddresses}
          </List>
        </Grid>
        <Grid item xs={4}>
          <Paper>
            {this.getHostSummary()}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
