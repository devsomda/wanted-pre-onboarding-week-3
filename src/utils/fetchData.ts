import React from 'react';

const baseUrl = process.env.REACT_APP_JSON_SERVER_URL;
const requestUrl = 'sick?q=';

export default async function fetchData(queryData: string) {
  const cacheStorage = await caches.open('searchCache');
  const url = baseUrl + requestUrl + queryData;
  const cachedResponse = await cacheStorage.match(url);
  if (cachedResponse && cachedResponse.ok) {
    const data = await cachedResponse.json();
    return data;
  }
  console.info('calling api');
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
  console.log(clonedResponse, '복제된 값');
  await cacheStorage.put(url, clonedResponse); // 복제본을 캐시에 저장

  const data = await response.json();
  return data;
}
