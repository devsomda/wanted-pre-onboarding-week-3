import React from 'react';
import styled from 'styled-components';

interface IResponse {
  sickCd: string;
  sickNm: string;
}

export default function SearchResults(props: any) {
  const { changeFocus, relativeSearchWords, focusIdx } = props;

  return (
    <SearchResultsContainer>
      {relativeSearchWords.length > 0 ? (
        relativeSearchWords.map(
          (word: IResponse, idx: number) =>
            word && (
              <InnerBox
                key={word.sickCd}
                style={focusIdx === idx ? { background: '#d6d7ef' } : { background: 'inherit' }}
                onKeyUp={changeFocus}
              >
                <InnerText>{word.sickNm}</InnerText>
              </InnerBox>
            ),
        )
      ) : (
        <InnerText>검색어 없음</InnerText>
      )}
    </SearchResultsContainer>
  );
}

const SearchResultsContainer = styled.div`
  margin-top: 10px;
  width: 350px;
  min-height: 350px;
  border: 1px solid gray;
  border-radius: 10px;
`;

const InnerBox = styled.div`
  border: none;
  border-radius: 5px;
`;

const InnerText = styled.p`
  margin: 10px 3px;
`;
