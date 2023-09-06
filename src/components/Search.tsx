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

  return (
    <div>
      <SearchBar
        setRelativeSearchWords={setRelativeSearchWords}
        focusIdx={focusIdx}
        setFocusIdx={setFocusIdx}
      />
      <SearchResults relativeSearchWords={relativeSearchWords} focusIdx={focusIdx} />
    </div>
  );
}
