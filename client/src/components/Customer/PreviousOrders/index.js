import { Button } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';


function PreviousOrders() {

  // function to get previous orders

  // mock data
  const prevOrders = [
  {
    id: 1,
    totalPrice: 8,
    orderItems: [
      {
        name: 'latte',
        price: 3.00,
        quantity: 1,
        image:'https://images.unsplash.com/photo-1541167760496-1628856ab772?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1788&q=80'
      },
      {
        name: 'Hot chocolate',
        price: 2.50,
        quantity: 2,
        image:'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
      }

    ]
  },
  {
    id: 2,
    totalPrice: 1.00,
    orderItems: [
      {
        name: 'espresso',
        price: 1.00,
        quantity: 1,
        image:'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
      }
    ]

  }
]


const previous = prevOrders.map((order) => {
  return(
    <div>
      {order.orderItems.map((item) => {
        return(
        <div>
          <Card>
          <div>
            <CardContent>
              {item.name}
              ${item.price * item.quantity}
            </CardContent>
          </div>
          <CardMedia
            image={item.image}
            title={item.name}
          />
      </Card>
        </div>
        )
      })}
      <p>Total ${order.totalPrice}</p>
      <Button variant="contained">Reorder</Button>
    </div>
)
})

  
  return(
    <div>
      <h3>Previous Orders</h3>
      {previous}
    </div>
  )
}

export default PreviousOrders