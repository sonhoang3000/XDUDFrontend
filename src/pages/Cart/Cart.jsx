import React, { useEffect, useState } from 'react';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  const handleQuantityChange = (id, change) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        const newTotalPrice = newQuantity * item.price;
        return { ...item, quantity: newQuantity, totalPrice: newTotalPrice };
      }
      return item;
    }).filter(item => item.quantity > 0);

    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const handleRemoveItem = (id) => {
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Giỏ hàng của bạn đang trống!");
      return;
    }

    const totalPrice = getTotalPrice().toLocaleString();
    const confirmed = window.confirm(`Tổng số tiền thanh toán là ${totalPrice} VND. Bạn có muốn thanh toán không?`);

    if (confirmed) {
      alert("Thanh toán thành công!");
      setCartItems([]);
      localStorage.removeItem('cartItems');
    }
  };

  return (
    <div className="cart">
      <h2>Giỏ Hàng</h2>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống!</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <h3>{item.name}</h3>
              <p>Giá: {item.price.toLocaleString()} VND</p>
              <p>Số lượng: 
                <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                {item.quantity}
                <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
              </p>
              <p>Tổng: {item.totalPrice.toLocaleString()} VND</p>
              <button onClick={() => handleRemoveItem(item.id)}>Xóa</button>
            </div>
          ))}
          <h3>Tổng giá: {getTotalPrice().toLocaleString()} VND</h3>
          <div className="checkout-container">
            <button onClick={handleCheckout} className="checkout-btn">Thanh toán</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
