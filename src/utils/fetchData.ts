import React from 'react';

const baseUrl = 'http://localhost:4000/';
const requestUrl = 'sick?q=';

export default async function fetchData(queryData: string) {
  const response = await fetch(baseUrl + requestUrl + queryData);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}
