
import React from "react";
import { Typography, Card, CardHeader, IconButton, CardContent, CardActions, Collapse, Table, TableCell, TableRow, TableBody, TableHead } from "@material-ui/core";
import { OrderSummary, LineSummary } from "../api/OrderSummary";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';


const useStyles = makeStyles(theme => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  table: {
    minWidth: 350,
  },
}));

export interface Props {
  orderSummary: OrderSummary;
  index: number;
}

interface LineSummaryProps {
  // lines: LineSummary[];
  orderSummary: OrderSummary;
}

function LineItemTable(props: LineSummaryProps) {
  const classes = useStyles({});
  return (<Table className={classes.table} size="small" aria-label="a dense table">
    <TableHead>
      <TableRow>
        <TableCell>Item</TableCell>
        <TableCell align="right">Description</TableCell>
        <TableCell align="right">Total Amount Spent</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {props.orderSummary.lines.map(line => (
        <TableRow key={line.name}>
          <TableCell component="th" scope="row">
            {line.name}
          </TableCell>
          <TableCell align="right">{line.description}</TableCell>
          <TableCell align="right">{`$${line.subtotal}`}</TableCell>
        </TableRow>
      ))}
      <TableRow >
          <TableCell></TableCell>
          <TableCell align="right">Total</TableCell>
          <TableCell align="right">{`$${props.orderSummary.totalPrice}`}</TableCell>
      </TableRow>
    </TableBody>
  </Table>)
}

export function OrderSummaryCard(props: Props) {
  const classes = useStyles({});
  const { orderSummary, index } = props;
  // Calculate some values according to whether card is expanded or not
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => { setExpanded(!expanded); };

  // Generate a list of ordered items as a preview
  const lineItemNames = orderSummary.lines.map((line)=>line.name).join(', ')
  return (
    <Card>
      <CardHeader
        title={`${orderSummary.customerName}, Order #${index}`}
        subheader={`$${orderSummary.totalPrice}`}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {lineItemNames}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <LineItemTable orderSummary={orderSummary} />
        </CardContent>
      </Collapse>
    </Card>);
}