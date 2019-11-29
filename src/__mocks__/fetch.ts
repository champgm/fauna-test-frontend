
import { GlobalWithFetchMock } from "jest-fetch-mock";
import { FetchMock } from "jest-fetch-mock";


export function getFetchMock(): FetchMock {
  const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;
  customGlobal.fetch = require('jest-fetch-mock');
  customGlobal.fetchMock = customGlobal.fetch;
  const fetchMock = fetch as FetchMock;
  return fetchMock;
}