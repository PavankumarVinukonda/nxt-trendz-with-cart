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

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredList = cartList.filter(item => item.id !== id)
    this.setState({
      cartList: [...filteredList],
    })
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const indexOfItem = cartList.findIndex(item => item.id === product.id)

    if (indexOfItem !== -1) {
      cartList[indexOfItem].quantity += 1
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
    //   TODO: Update the code here to implement addCartItem
  }

  removeAllCartItems = () => {
    const {cartList} = this.state
    this.setState({
      cartList: [],
    })
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const upadtedCartlist = cartList
    const indexOfItem = cartList.findIndex(item => item.id === id)
    upadtedCartlist[indexOfItem].quantity += 1
    console.log(cartList[indexOfItem].quantity)
    this.setState({
      cartList: [...upadtedCartlist],
    })
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const upadtedCartlist = cartList
    const indexOfItem = cartList.findIndex(item => item.id === id)
    upadtedCartlist[indexOfItem].quantity -= 1
    console.log(cartList[indexOfItem].quantity)
    if (upadtedCartlist.quantity > 0) {
      this.setState({
        cartList: [...upadtedCartlist],
      })
    } else {
      const filteredList = cartList.filter(item => item.id !== id)
      this.setState({
        cartList: [...filteredList],
      })
    }
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
