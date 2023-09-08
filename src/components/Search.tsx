import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import styled from 'styled-components';

interface IResponse {
  sickCd: string;
  sickNm: string;
}

export default function Search() {
  const [relativeSearchWords, setRelativeSearchWords] = useState<IResponse[]>([]);
  const [focusIdx, setFocusIdx] = useState<number>(-1);

  const changeFocus = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    const lastIndex = relativeSearchWords.length - 1;
    if (e.code === 'ArrowDown') {
      setFocusIdx((prev: number) => (prev < lastIndex ? prev + 1 : 0));
    } else if (e.code === 'ArrowUp') {
      setFocusIdx((prev: number) => (prev > 0 ? prev - 1 : lastIndex));
    }
  };

  return (
    <SearchContainer>
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
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  margin-top: 20px;
`;
