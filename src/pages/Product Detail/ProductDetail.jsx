import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const allProducts = [
    { id: 1, name: "Bánh mì trứng ốp la", images: "https://i.pinimg.com/564x/29/cf/68/29cf688a1d866eef3552da8878a5b8b5.jpg", price: 20000, description: "Bánh mì giòn rụm, kèm trứng ốp la và rau sống tươi.", rating: 4.5 },
    { id: 2, name: "Phở bò", images: "https://i.pinimg.com/564x/94/35/5e/94355e10374da588596a3b6e0029fd86.jpg", price: 40000, description: "Phở bò truyền thống, nước dùng thơm ngon, bò tái mềm.", rating: 4.8 },
  ];

  const product = allProducts.find((prod) => prod.id === parseInt(productId));

  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        totalPrice: product.price * quantity,
      };

      const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const existingItemIndex = storedCartItems.findIndex(item => item.id === cartItem.id);

      if (existingItemIndex >= 0) {
        storedCartItems[existingItemIndex].quantity += cartItem.quantity;
        storedCartItems[existingItemIndex].totalPrice += cartItem.totalPrice;
      } else {
        storedCartItems.push(cartItem);
      }

      localStorage.setItem('cartItems', JSON.stringify(storedCartItems));
      setIsAddedToCart(true);
      alert(`Đã thêm ${cartItem.quantity} ${cartItem.name} vào giỏ hàng!`);
      navigate('/cart'); // Chuyển hướng đến trang giỏ hàng sau khi thêm vào giỏ
    }
  };

  return (
    <div className="product-detail">
      {product ? (
        <>
          <h2 className="product-detail-title">{product.name}</h2>
          <img src={product.images} alt={product.name} className="product-detail-image" />
          <p className="product-detail-description">{product.description}</p>
          <p className="product-detail-price">Giá: {product.price.toLocaleString()} VND</p>
          <div className="product-detail-rating">
            Đánh giá: {"⭐".repeat(Math.round(product.rating))} ({product.rating})
          </div>

          <div className="quantity-control">
            <button onClick={handleDecrease} className="quantity-btn">-</button>
            <span className="quantity">{quantity}</span>
            <button onClick={handleIncrease} className="quantity-btn">+</button>
          </div>

          <p className="product-total-price">
            Tổng cộng: {(product.price * quantity).toLocaleString()} VND
          </p>

          <button 
            onClick={handleAddToCart} 
            className={`add-to-cart-btn ${isAddedToCart ? 'added' : ''}`}
          >
            Thêm vào giỏ hàng
          </button>
        </>
      ) : (
        <p>Sản phẩm không tồn tại</p>
      )}
    </div>
  );
};

export default ProductDetail;
