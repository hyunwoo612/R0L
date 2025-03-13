import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Main.css';

function Main() {
  const navigate = useNavigate();
  const location = useLocation();

  const username = location.pathname.split('/')[1];

  const handleButtonClick = () => {
    if (username) {
      navigate(`/SongList/${username}`);
    } else {
      navigate('/Sign');
    }
  };

  return (
    <main className="Main">
      <h1>나만의 음악 플레이리스트를<br />만들어 보세요!</h1>
      <button onClick={handleButtonClick} className="start">
        지금 시작해보기!
      </button>
    </main>
  );
}

export default Main;
