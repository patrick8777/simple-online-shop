import React, { useState } from "react"
import PropTypes from "prop-types"
import useFetch from "../../hooks/useFetch"
import "./index"

function Cards({ title = "Shopping Cart" }) {
  const { data, loading, error } = useFetch("")

  const [cartItems, setCartItems] = useState([])
  const [taxRate] = useState(5)

  const addToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id)

    if (existingItem) {
      const updatedCart = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
      setCartItems(updatedCart)
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }])
    }
  }

  const changeQuantity = (itemId, newQuantity) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    )
    setCartItems(updatedCart)
  }

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId)
    setCartItems(updatedCart)
  }

  const calculateSubTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  }

  const calculateTotal = () => {
    const subTotal = calculateSubTotal()
    const taxAmount = (subTotal * taxRate) / 100
    const total = subTotal + taxAmount
    return total.toFixed(2)
  }

  return (
    <div>
      <h2 className="card h2">{title}</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data &&
        data.map((product) => (
          <div key={product.id} style={{ textAlign: "center" }}>
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{ width: "100px", height: "100px" }}
            />
            <p>{product.title}</p>
            <p>{product.description}</p>
            <p>Rating: {product.rating}</p>
            <p>Category: {product.category}</p>
            <p>CHF {product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}

      <h2 className="card h2">Shopping Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id} style={{ textAlign: "center" }}>
          <img
            src={item.thumbnail}
            alt={item.title}
            style={{ width: "100px", height: "100px" }}
          />
          <p>{item.title}</p>
          <p>{item.description}</p>
          <p>Rating: {item.rating}</p>
          <p>Category: {item.category}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Price: CHF {(item.price * item.quantity).toFixed(2)}</p>
          <button onClick={() => changeQuantity(item.id, item.quantity + 1)}>
            +
          </button>
          <button
            onClick={() =>
              changeQuantity(item.id, Math.max(item.quantity - 1, 1))
            }>
            -
          </button>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}

      <div>
        <h3 className="cart-section h3">Total: CHF {calculateTotal()}</h3>
      </div>
    </div>
  )
}

Cards.propTypes = {
  title: PropTypes.string,
}

export default Cards
