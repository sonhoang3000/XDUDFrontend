import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dữ liệu đăng nhập:', formData);
    alert('Đăng nhập thành công!');
    
    navigate('/product'); 

    setFormData({ username: '', password: '' });
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="register-page">
      <h1 className="title">Đăng Nhập</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <div>
          <label htmlFor="username">Tên người dùng:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Mật khẩu:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Đăng Nhập</button>
        <p className="register-redirect">
          Bạn chưa có tài khoản? <button type="button" onClick={handleLoginRedirect}>Đăng Ký</button>
        </p>
      </form>
    </div>
  );
};

export default Register;
