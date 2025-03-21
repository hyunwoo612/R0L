import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Main.module.css';

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
    <main className={styles.main}>
      
    </main>
  );
}

export default Main;
