import './styles.scss'
import { Button } from '@material-ui/core'

function YourCartButton(props) {

  // const onClick = () => {
  //   console.log('going to cart')
  // }

  return(
    <Button variant='contained' onClick={props.handleOpen}>Your cart (2) total: $10.15</Button>
  )
}

export default YourCartButton