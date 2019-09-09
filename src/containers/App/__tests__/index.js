import React from 'react';
import axios from 'axios';
import App from '..';
import {
  render,
  cleanup,
  waitForElement,
} from '../../../../tests/helpers/testHelper';
import '@testing-library/jest-dom/extend-expect';
import * as mockData from './mockData.json';
import { getAPIData } from '../../../utils/API';
import { BARS_URI } from '../../../constants/api';

afterEach(cleanup);

jest.mock('axios');

it('loads and displays greeting', async () => {
  await waitForElement(axios.get.mockResolvedValueOnce(mockData.raw));

  const { getByTestId, getAllByTestId } = render(<App />);

  expect(getByTestId('loading')).toBeInTheDocument();


  getAPIData(BARS_URI).then((response) => {
    expect(response).toEqual(mockData.raw.data);
  });

  const resultNode = await waitForElement(() => getByTestId('myresult'));

  expect(axios.get).toHaveBeenCalledTimes(1);


  expect(resultNode).toHaveClass('container');
  expect(resultNode).toBeInTheDocument();

  expect(getByTestId('select-bar')).toBeInTheDocument();
  expect(getAllByTestId('button')[0]).toHaveTextContent(37);
  expect(getAllByTestId('button')[3]).toHaveTextContent(-36);
});
