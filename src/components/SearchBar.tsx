import React, { useState, useEffect, useCallback } from 'react';

interface resType {
  sickCd: string;
  sickNm: string;
}

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const [relativeSearchWords, setRelativeSearchWords] = useState<resType[]>([]);
  const [timer, setTimer] = useState<number | NodeJS.Timeout>(0); // 디바운싱 타이머

  const onChangeInputs = (e: any) => {
    setSearchValue(e.target.value);
    const newSearchValue = e.target.value;

    if (timer) {
      console.log('clear timer');
      clearTimeout(timer);
    }

    const newTimer = setTimeout(() => {
      fetch(`http://localhost:4000/sick?q=${newSearchValue}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setRelativeSearchWords(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }, 800);

    setTimer(newTimer);
  };

  return (
    <div>
      <input type='text' value={searchValue} onChange={onChangeInputs} />
      <button>검색</button>
      {relativeSearchWords.map(
        (word: resType) =>
          word && (
            <div key={word.sickCd}>
              <p>{word.sickNm}</p>
            </div>
          ),
      )}
    </div>
  );
}
