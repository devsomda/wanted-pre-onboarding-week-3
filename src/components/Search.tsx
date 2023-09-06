import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

interface IResponse {
  sickCd: string;
  sickNm: string;
}

export default function Search() {
  const [relativeSearchWords, setRelativeSearchWords] = useState<IResponse[]>([]);

  return (
    <div>
      <SearchBar setRelativeSearchWords={setRelativeSearchWords} />
      <SearchResults relativeSearchWords={relativeSearchWords} />
    </div>
  );
}
