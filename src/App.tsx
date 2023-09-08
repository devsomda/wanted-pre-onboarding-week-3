import React from 'react';
import Search from './components/Search';
import styled from 'styled-components';

function App() {
  return (
    <GlobalStyle>
      <h2>
        국내 모든 임상시험 검색하고 <br />
        온라인으로 참여하기
      </h2>
      <Search />
    </GlobalStyle>
  );
}

export default App;

const GlobalStyle = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
