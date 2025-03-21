import React, {useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import icon from './image/icon.svg'

function Header({ loggedInUser, setLoggedInUser }) {
  const navigate = useNavigate();
  const location = useLocation();

  if (localStorage.getItem('token') != '') {
    loggedInUser = localStorage.getItem('username');
    setLoggedInUser(true);
  } 

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('expires')
    alert('로그아웃 되었습니다.');
    navigate('/');
  };

  useEffect = () => {
    console.log()
  }
  

  return (
    <header className={styles.Header}>
      <div className={styles.ilog}>
        <div
        className={styles.icon}
        onClick={() => navigate(loggedInUser ? `/${loggedInUser}` : '/')}
        >
        <img src={icon} alt='.'/>
        </div>
        <div 
        className={styles.logo}
        onClick={() => navigate(loggedInUser ? `/${loggedInUser}` : '/')}
        >
         CODENENDA
        </div>
      </div>
      
      <div className={styles.SL}>
        {loggedInUser ? (
          <>
            <div className={styles.welcomeMessage}>반갑습니다 {loggedInUser}님!</div>
            <div className={styles.Logout} onClick={handleLogout}>
              로그아웃
            </div>
          </>
        ) : (
          <>
            <div
              className={`${styles.Login} ${location.pathname === '/coding' ? styles.active : ''}`}
              onClick={() => navigate('/Login')}
            >
              문제 풀기
            </div>
            <div
              className={`${styles.Login} ${location.pathname === '/Login' ? styles.active : ''}`}
              onClick={() => navigate('/Login')}
            >
              로그인
            </div>
            <div
              className={`${styles.Sign} ${location.pathname === '/Sign' ? styles.active : ''}`}
              onClick={() => navigate('/Sign')}
            >
              회원가입
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;