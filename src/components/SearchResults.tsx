import React from 'react';

interface IResponse {
  sickCd: string;
  sickNm: string;
}

export default function SearchResults(props: any) {
  const { relativeSearchWords, focusIdx } = props;
  console.log(focusIdx);
  return (
    <div>
      {relativeSearchWords.length > 0 ? (
        relativeSearchWords.map(
          (word: IResponse) =>
            word && (
              <div key={word.sickCd}>
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
