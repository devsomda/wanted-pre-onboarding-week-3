import React from 'react';
import styled from 'styled-components';

interface IResponse {
  sickCd: string;
  sickNm: string;
}

export default function SearchResults(props: any) {
  const { changeFocus, relativeSearchWords, focusIdx } = props;

  return (
    <div>
      {relativeSearchWords.length > 0 ? (
        relativeSearchWords.map(
          (word: IResponse, idx: number) =>
            word && (
              <div
                key={word.sickCd}
                style={
                  focusIdx === idx ? { border: '1px solid red' } : { border: '1px solid black' }
                }
                onKeyUp={changeFocus}
              >
                <p>{word.sickNm}</p>
              </div>
            ),
        )
      ) : (
        <p>검색어 없음</p>
      )}
    </div>
  );
}
