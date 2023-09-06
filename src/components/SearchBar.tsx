import React, { useState, useEffect, useCallback } from 'react';
import fetchData from '../utils/fetchData';

interface IResponse {
  sickCd: string;
  sickNm: string;
}

export default function SearchBar(props: any) {
  const { setRelativeSearchWords } = props;
  const [searchValue, setSearchValue] = useState('');
  const [timer, setTimer] = useState<NodeJS.Timeout>(); // 디바운싱 타이머

  const onChangeInputs = (e: any) => {
    setSearchValue(e.target.value);

    const newSearchValue = e.target.value;
    if (timer) {
      clearTimeout(timer);
    }

    // Question: focus가 되고, 안 되는 것도 change event로 인식함
    const newTimer = setTimeout(async () => {
      await callback(newSearchValue);
    }, 700);

    setTimer(newTimer);
  };

  const callback = async (newSearchValue: string) => {
    try {
      if (newSearchValue) {
        console.info('calling api');
        const res = await fetchData(newSearchValue);
        setRelativeSearchWords(res);
      } else {
        setRelativeSearchWords([]);
      }
    } catch (error) {
      // 오류 처리
      console.error(error);
    }
  };

  return (
    <div>
      <input type='text' value={searchValue} onChange={onChangeInputs} />
      <button>검색</button>
    </div>
  );
}
