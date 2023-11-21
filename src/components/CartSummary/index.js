// Write your code here
import './index.css'
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let totalCost = 0
      cartList.forEach(each => {
        totalCost += each.quantity * each.price
      })

      return (
        <div className="cart-summary-div">
          <h1 className="cart-summary-h">
            Order Total:{' '}
            <span className="cart-summary-h-span">Rs {totalCost}/-</span>
          </h1>
          <p className="cart-summary-p">{cartList.length} Items in cart</p>
          <button className="cart-summary-btn" type="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
