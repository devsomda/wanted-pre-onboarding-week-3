import React from 'react';

const baseUrl = 'http://localhost:4000/';
const requestUrl = 'sick?q=';

export default async function fetchData(queryData: string) {
  const cacheStorage = await caches.open('searchCache');
  const url = baseUrl + requestUrl + queryData;
  const cachedResponse = await cacheStorage.match(url);
  if (cachedResponse && cachedResponse.ok) {
    const data = await cachedResponse.json();
    console.log(data, '저장된 값');
    return data;
  }
  console.info('calling apid');
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const clonedResponse = response.clone();
  console.log(clonedResponse, '복제된 값');
  await cacheStorage.put(url, clonedResponse); // 복제본을 캐시에 저장

  const data = await response.json();
  return data;
}
