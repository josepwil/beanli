import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Stripe from './Stripe'

import NearbyStores from './NearbyStores'
import UserInfo from './UserInfo'
import UserNav from './UserNav'
import YourCartButton from './YourCartButton'
import StoreInfo from './StoreInfo'
import Menu from './Menu'
import HomeButton from './HomeButton';
import PreviousOrders from './PreviousOrders'
import Cart from './Cart'
import OrderConfirmation from './OrderConfirmation';

import { getTotal } from '../../helpers/getTotal'


export default function Customer() {

  const [showCart, setShowCart] = useState(false)
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(getTotal(cart))
  const [beansSpent, setBeansSpent] = useState(0)

  const updateCart = (id, name, price) => {
    for(let i = 0; i < cart.length; i++) {
      if(cart[i].menuItemId === id) {
        return setCart((prev) => {
          const cartCopy = [...prev];
          cartCopy[i].quantity++;
          return cartCopy
        })
      } 
    }
    setCart((prev) => {
      return [...prev, {
        menuItemId: id,
        itemName: name,
        price: price,
        quantity: 1
      }]
    })
  }

  // this is triggered when updating cart state 
  useEffect(() => {
    setTotal(getTotal(cart))
  }, [cart])


  const handleOpen = () => {
    setShowCart(true)
  }

  const handleClose = () => {
    setShowCart(false)
  }

  return(
    <Router>
      <Switch>
        <Route path="/history">
          <UserInfo />
          <UserNav />
          <PreviousOrders />
          <HomeButton />
          {cart.length > 0 && 
            <YourCartButton 
              total={total} 
              cart={cart} 
              handleOpen={event => handleOpen()}
            />
          }
          <Cart 
            getTotal={getTotal} 
            cart={cart} 
            showCart={showCart} 
            handleClose={event => handleClose()}
            setCart={setCart}
            beansSpent={beansSpent}
            setBeansSpent={setBeansSpent}
            total={total}
            setTotal={setTotal}
          />
        </Route>

        <Route path="/checkout">
            <Stripe 
            total={total} 
            cart={cart} 
            beansSpent={beansSpent}
            />
        </Route>


        <Route path="/stores/:storeId/menu">
          <StoreInfo />
          <Menu updateCart={updateCart}/>
          <HomeButton />
          {cart.length > 0 && 
            <YourCartButton 
              total={total} 
              cart={cart} 
              handleOpen={event => handleOpen()}
            />
          }
          <Cart 
            getTotal={getTotal} 
            cart={cart} 
            showCart={showCart} 
            handleClose={event => handleClose()}
            setCart={setCart}
            beansSpent={beansSpent}
            setBeansSpent={setBeansSpent}
            total={total}
            setTotal={setTotal}
          />
        </Route>

        <Route path="/orderconfirmed">
          <OrderConfirmation 
            cart={cart}
            total={total}
            setTotal={setTotal}
            setCart={setCart}
          />
          <HomeButton />
        </Route>


        <Route path="/">
          <UserInfo />
          <UserNav />
          <NearbyStores />
          {cart.length > 0 && 
            <YourCartButton 
              total={total} 
              cart={cart} 
              handleOpen={event => handleOpen()}
            />
          }
          <Cart 
            getTotal={getTotal} 
            cart={cart} 
            showCart={showCart} 
            handleClose={event => handleClose()}
            setCart={setCart}
            beansSpent={beansSpent}
            setBeansSpent={setBeansSpent}
            total={total}
            setTotal={setTotal}
          />
        </Route>
      </Switch>
    </Router>
  )
}