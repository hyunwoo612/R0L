import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Signpage.module.css';

const Sign = () => {
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    password: '',
    password_check: '',
    email: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (formData.name && formData.id && formData.password && formData.password_check && formData.email) {
      const existingUser = JSON.parse(localStorage.getItem('user'));
        
      if (existingUser && existingUser.id === formData.id) {
        alert('이미 가입된 아이디입니다. 다른 아이디를 사용해주세요.');
        return;
      }
      if (formData.password_check !== formData.password) {
        alert("비밀번호가 틀렸습니다. 다시 입력해주세요.")
        return;
      }
    }
      try {
        const { confirmPassword, ...dataToSend } = formData;
        const response = await axios.post('http://127.0.0.1:8080/user', dataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert(response.data.message || '회원가입 완료!');
      navigate('/Login');
    } catch (error) {
      console.error('오.류.발.생', error);
      alert(error.response?.data?.message || '응 아니야');
    }
  };
  
  return (
    <div className={styles.Sign}>
      <div className={styles.title}>회원가입</div>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputsign}>
          <input
            type="text"
            name="id"
            placeholder="아이디"
            value={formData.id}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputsign}>
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputsign}>
          <input
            type="password"
            name="password_check"
            placeholder="비밀번호 확인"
            value={formData.password_check}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputsign}>
          <input
            type="text"
            name="name"
            placeholder="닉네임"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputsign}>
          <input
            type="tel"
            name="email"
            placeholder="이메일"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className={styles.signUpButton}>
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Sign;