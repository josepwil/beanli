import { useState, useEffect } from "react";
import { Button } from "@material-ui/core";

import { convertCentsToDollars } from "../../../helpers/math";

import "./styles.scss";

function YourCartButton(props) {
  const [cart, setCart] = useState(props.cart);
  const [total, setTotal] = useState(props.total);

  useEffect(() => {
    setCart(props.cart);
    setTotal(props.total);
  }, [props]);

  return (
    <Button
      className="total-cart-button"
      variant="contained"
      onClick={props.handleOpen}
    >
      Your cart ({cart.length}) total: ${convertCentsToDollars(total)}
    </Button>
  );
}

export default YourCartButton;
