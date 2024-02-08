import React, { useState } from 'react';

const ChessSettings = () => {
  const [difficulty, setDifficulty] = useState('');

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  return (
    <div>
      <h1>체스 환경 설정</h1>

      <div>
        <h2>난이도 설정</h2>
        <select value={difficulty} onChange={handleDifficultyChange}>
          <option value="">-- 난이도를 선택하세요 --</option>
          <option value="easy">쉬움</option>
          <option value="normal">보통</option>
          <option value="hard">어려움</option>
        </select>
      </div>

      {/* 여기에 다른 설정 항목들을 추가할 수 있습니다. */}
    </div>
  );
};

export default ChessSettings;
