import { Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { useContext } from "react";
import { convertCentsToDollars } from "../../../helpers/math";
import { appContext } from "../../appContext";
import { getTotal } from "../../../helpers/getTotal";
import bean from "../../../assets/logo/beans.png";
import { getOrdersInfo } from "../../../helpers/selectors";

import "./styles.scss";

function PreviousOrders(props) {
  const { state } = useContext(appContext);
  const prevOrders = getOrdersInfo(state.orders);

  const reorder = (order) => {
    props.setCart(order.orderItems);
  };

  if (prevOrders) {
    const previous = prevOrders.map((order, index) => {
      return (
        <div className="prev-order-container" key={index}>
          {order.orderItems.map((item, index) => {
            return (
              <div className="prev-orders" key={index}>
                <Card className="root">
                  <CardContent className="content">
                    <div className="order-item-details">
                      <p>{item.name}</p>
                    </div>
                    <div className="price-quantity-container">
                      <p>Qty: {item.quantity}</p>
                      <p>
                        ${convertCentsToDollars(item.price * item.quantity)}
                      </p>
                    </div>
                  </CardContent>
                  <CardMedia
                    className="cover"
                    image={item.image}
                    title={item.name}
                  />
                </Card>
              </div>
            );
          })}
          <div className="reorder-container">
            <p>Total ${convertCentsToDollars(order.totalPrice)}</p>
            {order.totalPrice < getTotal(order.orderItems) && (
              <img src={bean} alt="Bean" width="30" height="30"></img>
            )}
            <Button
              style={{ position: "inherit" }}
              variant="contained"
              onClick={() => reorder(order)}
            >
              Reorder
            </Button>
          </div>
        </div>
      );
    });

    return (
      <div className="previous-order-root">
        <h3 className="prev-order-title">Previous Orders</h3>
        {previous}
      </div>
    );
  } else {
    return (
      <div className="previous-order-root">
        <h3 className="prev-order-title">Previous Orders</h3>
      </div>
    );
  }
}

export default PreviousOrders;
