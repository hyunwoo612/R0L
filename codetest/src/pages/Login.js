import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ setLoggedInUser }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUserData = JSON.parse(localStorage.getItem('user'));

    if (storedUserData) {
      if (formData.username === storedUserData.username && formData.password === storedUserData.password) {
        setLoggedInUser(formData.username);
        alert('로그인 성공!');
        navigate(`/${formData.username}`);
      } else {
        alert('아이디 또는 비밀번호가 틀렸습니다.');
      }
    } else {
      alert('회원가입을 먼저 해주세요.');
    }
  };

  return (
    <div className="LoginContainer">
      <h1>나만의 리스트로!</h1>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputGroup">
          <input
            type="text"
            name="username"
            placeholder="아이디"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="inputGroup">
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="loginButton">
          로그인
        </button>
      </form>
    </div>
  );
};

export default Login;