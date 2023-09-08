import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

interface IResponse {
  sickCd: string;
  sickNm: string;
}

export default function Search() {
  const [relativeSearchWords, setRelativeSearchWords] = useState<IResponse[]>([]);
  const [focusIdx, setFocusIdx] = useState<number>(-1);

  const changeFocus = (e: any) => {
    console.log(e.code);
    if (e.code === 'ArrowDown' && (focusIdx < relativeSearchWords.length - 1 || focusIdx < 9)) {
      setFocusIdx((prev: number) => prev + 1);
    } else if (e.code === 'ArrowUp' && focusIdx > -1) {
      setFocusIdx((prev: number) => prev - 1);
    }
  };

  return (
    <div>
      <SearchBar
        relativeSearchWords={relativeSearchWords}
        setRelativeSearchWords={setRelativeSearchWords}
        focusIdx={focusIdx}
        setFocusIdx={setFocusIdx}
        changeFocus={changeFocus}
      />
      <SearchResults
        relativeSearchWords={relativeSearchWords}
        focusIdx={focusIdx}
        changeFocus={changeFocus}
      />
    </div>
  );
}
