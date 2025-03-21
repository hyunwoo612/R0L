import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Loginpage.module.css';
import git from '../components/image/github1.svg';
import google from '../components/image/Google.svg';

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
    <div className={styles.Login}>
      <div className={styles.title}>로그인</div>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputlogin}>
          <input
            type="text"
            name="username"
            placeholder="아이디"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputlogin}>
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className={styles.loginButton}>
          로그인
        </button>
        <div className={styles.whatsign}>
          <div className={styles.what}>
          아직 회원이 아니신가요?
          </div>
          <div className={styles.signnow}
          onClick={() => navigate('/Sign')}>
           회원가입
        </div>
        </div>
        <div className={styles.github}>
          <img src={git} alt='1'/>
          <div>GitHub로 로그인하기</div>
        </div>
        <div className={styles.google}>
          <img src={google} alt='1'/>
          <div>Google로 로그인하기</div>
        </div>
      </form>
    </div>
  );
};

export default Login;