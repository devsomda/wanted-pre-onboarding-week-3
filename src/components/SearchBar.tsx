import React, { useState } from 'react';
import fetchData from '../utils/fetchData';
import styled from 'styled-components';

export default function SearchBar(props: any) {
  const { changeFocus, relativeSearchWords, setRelativeSearchWords, focusIdx, setFocusIdx } = props;
  const [searchValue, setSearchValue] = useState('');
  const [timer, setTimer] = useState<NodeJS.Timeout>(); // 디바운싱 타이머

  const onChangeInputs = (e: any) => {
    setFocusIdx(-1);
    setSearchValue(e.target.value);
    const newSearchValue = e.target.value;

    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(async () => {
      await callback(newSearchValue);
    }, 700);

    setTimer(newTimer);
  };

  const callback = async (newSearchValue: string) => {
    try {
      if (newSearchValue) {
        const res = await fetchData(newSearchValue);
        if (res.length > 10) {
          setRelativeSearchWords(res.splice(0, 10));
        } else {
          setRelativeSearchWords(res);
        }
      } else {
        setRelativeSearchWords([]);
      }
    } catch (error) {
      // 오류 처리
      console.error(error);
    }
  };

  return (
    <SearchBarContainer>
      <input type='text' value={searchValue} onChange={onChangeInputs} onKeyUp={changeFocus} />
      <button>검색</button>
    </SearchBarContainer>
  );
}

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid gray;
  border-radius: 10px;

  input,
  button {
    margin: 10px;
    border: none;
    background-color: inherit;
  }
  input {
    width: 250px;
    &:focus,
    &:focus-visible {
      outline: none;
    }
  }
  button {
    border-left: 1px solid gray;
  }
`;
