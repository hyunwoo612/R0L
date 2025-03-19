import React, { useState, useRef } from 'react';
import './SongList.css';

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const audioPlayer = useRef(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const fileInputRef = useRef(null);
  const [addCount, setAddCount] = useState(0);

  const handleFileUpload = (event) => {
    const files = event.target.files;
    const newSongs = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type === 'audio/mpeg') {
        const songName = file.name.replace('.mp3', '');

        const isDuplicate = songs.some((song) => song.name === songName);

        if (isDuplicate) {
          alert(`"${songName}" 노래는 이미 추가된 노래입니다.`);
        } else {
          const songData = {
            name: songName,
            file: URL.createObjectURL(file),
          };
          newSongs.push(songData);
        }
      } else {
        alert('mp3 파일만 업로드 가능합니다.');
      }
    }

    if (newSongs.length > 0) {
      setSongs((prevSongs) => [...prevSongs, ...newSongs]);
      setAddCount((prevCount) => prevCount + newSongs.length);
      const newAddCount = addCount + newSongs.length;
      
      if (newAddCount >= 100) {
        const blob = new Blob(["마 그만해라..."], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'stop.txt';
        link.click();
        alert('내가 보내는 마지막 편지이다...');
        setAddCount(0);
      }
    }
  };

  const playSong = (index) => {
    if (currentSongIndex === index) {
      return;
    }

    setCurrentSongIndex(index);
    if (audioPlayer.current) {
      audioPlayer.current.src = songs[index].file;
      audioPlayer.current.play();
    }
  };

  const handleSongEnd = () => {
    if (currentSongIndex !== null && currentSongIndex + 1 < songs.length) {
      playSong(currentSongIndex + 1);
    }
  };

  const filteredSongs = searchTerm
    ? songs.filter((song) =>
        song.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : songs;

  const handleAddMoreSongs = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="SongListContainer">
      <div className="searchBar">
        <input
          type="text"
          placeholder="   검색하기"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="songList">
        {filteredSongs.length > 0 ? (
          <ul>
            {filteredSongs.map((song, index) => (
              <li
                key={index}
                onClick={() => playSong(index)}
                style={{
                  fontWeight: index === currentSongIndex ? 'bold' : 'normal',
                }}
              >
                {index + 1}. {song.name}
              </li>
            ))}
          </ul>
        ) : (
          <div className="noSongs">
            <p>검색어와 일치하는 노래가 없습니다.</p>
          </div>
        )}
      </div>
      <div className="addMore">
        {songs.length === 0 ? (
          <div>
            <p>만약 노래가 없다면?</p>
            <button onClick={handleAddMoreSongs}>지금 넣어보기!</button>
          </div>
        ) : (
          <div>
            <p>추가하고 싶은 노래가 더 있나요?</p>
            <button onClick={handleAddMoreSongs}>추가하기!</button>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept=".mp3"
          multiple
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
      </div>
      {currentSongIndex !== null && (
        <div className="audioPlayer">
          <p>현재 재생 중: {songs[currentSongIndex].name}</p>
          <audio
            ref={audioPlayer}
            controls
            onEnded={handleSongEnd}
          />
        </div>
      )}
    </div>
  );
};

export default SongList;