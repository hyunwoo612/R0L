import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

function Header({ loggedInUser, setLoggedInUser }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setLoggedInUser(null);
    alert('로그아웃 되었습니다.');
    navigate('/');
  };

  return (
    <header className="Header">
      <div
        className="logo"
        onClick={() => navigate(loggedInUser ? `/${loggedInUser}` : '/')}
      >
        나만의 리스트로!
      </div>
      <div className="SL">
        {loggedInUser ? (
          <>
            <div className="welcomeMessage">반갑습니다 {loggedInUser}님!</div>
            <div className="Logout" onClick={handleLogout}>
              로그아웃
            </div>
          </>
        ) : (
          <>
            <div
              className={`Sign ${location.pathname === '/Sign' ? 'active' : ''}`}
              onClick={() => navigate('/Sign')}
            >
              회원가입
            </div>
            <div
              className={`Login ${location.pathname === '/Login' ? 'active' : ''}`}
              onClick={() => navigate('/Login')}
            >
              로그인
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;