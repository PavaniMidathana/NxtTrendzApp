import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    //   TODO: Update the code here to implement addCartItem

    const {cartList} = this.state
    let newCartList = []
    const productIds = cartList.map(each => each.id)
    if (productIds.includes(product.id)) {
      newCartList = cartList.map(each => {
        if (each.id === product.id) {
          return {...each, quantity: each.quantity + product.quantity}
        }
        return each
      })
    } else {
      newCartList = [...cartList, product]
    }

    this.setState({cartList: newCartList})
  }

  removeCartItem = id => {
    this.setState(pre => ({
      cartList: pre.cartList.filter(each => each.id !== id),
    }))
  }

  incrementCartItemQuantity = id => {
    this.setState(pre => ({
      cartList: pre.cartList.map(each => {
        if (each.id === id) {
          return {...each, quantity: each.quantity + 1}
        }
        return each
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    let quantity = 0
    cartList.forEach(each => {
      if (each.id === id) {
        quantity = each.quantity
      }
    })
    let newCartList = []

    if (quantity === 1) {
      newCartList = cartList.filter(each => each.id !== id)
    } else {
      newCartList = cartList.map(each => {
        if (each.id === id) {
          return {...each, quantity: each.quantity - 1}
        }
        return each
      })
    }

    this.setState({cartList: newCartList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
