# wanted-pre-onboarding-week-3
원티드 프리온보딩 프론트엔드 3주차 과제 (개인) 

## 프로젝트 소개

※ 본 과제는 검색창 구현 + 검색어 추천 기능 구현 + 캐싱 기능 구현 프로젝트입니다.

```
- 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현
  - 검색어가 없을 시 “검색어 없음” 표출

- API 호출별로 로컬 캐싱 구현
  - 캐싱 기능을 제공하는 라이브러리 사용 금지(React-Query 등)
  - expire time을 구현 (optional)
    
- 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행
    
- API를 호출할 때 마다 `console.info("calling api")` 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정

- 키보드만으로 추천 검색어들로 이동 가능하도록 구현
```

### 실행 방법

- 배포 링크: [https://pre-onboarding-12th-3-2.vercel.app/](https://search-bar-complete.netlify.app/)
- 링크가 실행되지 않는 경우 아래 명령어를 차례대로 입력하여 실행해주세요.

```jsx
// client
git clone https://github.com/devsomda/wanted-pre-onboarding-week-3.git
npm install
npm start

// server
git clone https://github.com/walking-sunset/assignment-api.git
npm install
npm start
```

<br />

## 💬 구현 내용

### ✅ Assignment 
- API 호출을 통한 검색어 추천 기능 구현
- 검색어가 없을 시 “검색어 없음” 표출
- API 호출별로 로컬 캐싱 구현
- API를 호출할 때 마다 `console.info("calling api")` 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정

**1. api 호출: fetch**
> api request가 하나만 존재하고 있어, axios를 도입하지 않고 fetch를 사용했습니다. fetchData()함수를 통해 api 호출 및 로컬 캐싱을 구현했습니다.

**2. 검색어 없음 처리 방식** <br />
▶ fetch 응답을 저장한 상태값(searchList)의 길이에 따라 메시지를 렌더링 합니다.

**3. 캐시 저장소: Cache Storage**
> Local Storage, Session Storage의 경우 용량이 적으며 캐싱을 하기에 더 권장되는 Cache Storage를 사용했습니다.

```ts
export default async function fetchData(queryData: string) {
  const cacheStorage = await caches.open('searchCache');
  const url = baseUrl + requestUrl + queryData;
  const cachedResponse = await cacheStorage.match(url);
  if (cachedResponse && cachedResponse.ok) {
    const data = await cachedResponse.json();
    return data;
  }
  console.info('calling api'); // 호출 시점을 콘솔에 출력력
  console.log(baseUrl);
  const response = await fetch(url, {
    headers: {
      Accept: 'application / json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const clonedResponse = response.clone();
  await cacheStorage.put(url, clonedResponse); // 복제본을 캐시에 저장

  const data = await response.json();
  return data;
}
```

<br />

### ✅ Assignment
- 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행
  
**API 호출 횟수 감소 방식: Debouncing**
▶ 기존 로직에서는, ‘담낭’ 키워드를 입력했을 때 ‘ㄷ’, ‘다’, ‘담’, ‘담ㄴ’, ‘담나’, ‘담낭’ 총 6회의 API가 호출됩니다. 관련해 throttling과 debouncing 중 마지막 키워드가 검색 요청 내용이라는 점에서, 더욱 적합한 `debouncing`를 사용하기로 했습니다. input값이 변함에 따라 onChangeInputs 함수가 실행되고 0.7초마다 api를 호출하고, 반환값 리스트를 갱신하는 callback 함수를 실행합니다.
```ts
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
```

<br />

### ✅ Assignment 
- 키보드만으로 추천 검색어들로 이동 가능하도록 구현

**구현 방식: `onKeydown`**

▶ `keydown`이벤트로 키보드의 방향키를 눌렀을 때 이동을 구현했습니다. 별도의 `selectedIndex`상태값을 두어 selectedIndex와 검색어 아이템의 인덱스가 같을 경우, `ref.current.focus()`로 해당 아이템을 포커싱하여 강조하는 스타일링을 구현했습니다. 초기 keyUp 이벤트로 두었을 때, 최초 이벤트가 두 번 실행되는 것을 막는 `if (e.nativeEvent.isComposing) return;`가 실행되지 않아, keydown 이벤트로 변경해 키보드를 누르는 중에도 한국어는 e.nativeEvent.isComposing의 리턴값이 true일 수 있게 했습니다.

```ts
  const changeFocus = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    const lastIndex = relativeSearchWords.length - 1;
    if (e.code === 'ArrowDown') {
      setFocusIdx((prev: number) => (prev < lastIndex ? prev + 1 : 0));
    } else if (e.code === 'ArrowUp') {
      setFocusIdx((prev: number) => (prev > 0 ? prev - 1 : lastIndex));
    }
  };
```


## 🧑🏻‍💻 프로젝트 정보

### 사용 라이브러리 및 기술

- JavaScript / TypeScript / React
- 스타일: styled-components

```jsx
"dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^16.18.43",
    "@types/react": "^18.2.21",
    "@types/react-dom": "^18.2.7",
    "axios": "^1.4.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.15.0",
    "react-scripts": "5.0.1",
    "styled-components": "^6.0.7",
    "typescript": "^4.9.5",
    "web-vitals": "^2.1.4"
},

"devDependencies": {
    "@babel/plugin-proposal-private-property-in-object": "^7.21.11",
    "@typescript-eslint/parser": "^5.62.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-prettier": "^5.0.0",
    "husky": "^8.0.3",
    "lint-staged": "^14.0.1",
    "prettier": "^3.0.2"
}
```

