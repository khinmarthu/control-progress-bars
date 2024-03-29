import React, {
  useEffect, useState, useCallback, useMemo,
} from 'react';
import {
  map, forEach, toNumber, isEmpty,
} from 'lodash';
import { Button, Select, Skeleton } from 'antd';
import styled from 'styled-components';
import uuidv4 from 'uuid/v4';
import { getAPIData } from '../../utils/API';
import allComponents from '../../components';
import { PROGRESS_VALUES } from '../../constants/defaultValue';
import { BARS_URI } from '../../constants/api';

const { ProgressBar } = allComponents;

const { MIN_VALUE } = PROGRESS_VALUES;

const { Option } = Select;

const Wrapper = styled('div').attrs(() => ({
  className: 'container',
}))`
  width: 50%;
  padding: 20px;
  border: 1px solid #ECECEC;
  border-radius: 10px;
  margin-top: 10px;
`;

const AppWrapper = styled(Wrapper)`
  background-color: aliceblue;
`;

const Row = styled('div').attrs(() => ({
  className: 'row',
}))`
  padding: 10px;
  &:last-of-type {
    margin: 10px;
    text-align: center;
    
    @media (max-width: 1150px) {
      .col-sm {
        margin-bottom: 10px;
      }
    }
  }
`;

const Col = styled('div').attrs(() => ({
  className: 'col-sm',
}))``;

const App = () => {
  const [bars, setBars] = useState({});
  const [buttons, setButtons] = useState([]);

  const [currentBar, setCurrentBar] = useState('#progress1');

  useEffect(() => {
    const getBarsValue = (response) => {
      const { bars: barValues, limit } = response;
      let barsResult = {};
      forEach(barValues, (value, index) => {
        const text = `#progress${index + 1}`;
        barsResult = {
          ...barsResult,
          [text]: {
            text,
            value,
            limit,
            key: uuidv4(),
          },
        };
      });
      return barsResult;
    };

    const getButtonsValue = (values) => map(values, (value) => ({
      value,
      key: uuidv4(),
    }));

    getAPIData(BARS_URI)
      .then((res) => {
        setButtons(getButtonsValue(res.buttons));
        setBars(getBarsValue(res));
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log('error: ', error);
      });
  }, []);

  const convertToNumber = (value) => toNumber(value);

  const getValue = useCallback((oldValue, newValue) => {
    const oldVal = convertToNumber(oldValue);
    const newVal = convertToNumber(newValue);

    const value = oldVal + newVal;

    if (value < MIN_VALUE) {
      return MIN_VALUE;
    }
    return value;
  }, []);

  const handleButtonClick = useCallback((event) => {
    event.preventDefault();
    const { value } = bars[currentBar];
    setBars({
      ...bars,
      [currentBar]: {
        ...bars[currentBar],
        value: getValue(value, event.target.value),
      },
    });
  }, [bars, currentBar, getValue]);

  const renderBars = useMemo(() => map(bars, (bar) => (
    <Row key={bar.key}>
      <Col>
        <ProgressBar value={bar.value} max={bar.limit} />
      </Col>
    </Row>
  )), [bars]);

  const handleSelectChange = useCallback((value) => {
    setCurrentBar(value);
  }, []);

  const getSelectOption = useMemo(() => map(bars, (bar) => (
    <Option value={bar.text} key={bar.key}>{bar.text}</Option>
  )), [bars]);

  const renderSelect = useMemo(() => (
    <Col key="select-bar">
      <Select
        data-testid="select-bar"
        defaultValue={currentBar}
        value={currentBar}
        style={{ width: 120 }}
        onChange={handleSelectChange}
      >
        {getSelectOption}
      </Select>
    </Col>
  ), [currentBar, getSelectOption, handleSelectChange]);

  const renderButtons = useMemo(() => map(buttons, (button) => (
    <Col key={button.key}>
      <Button data-testid="button" type="default" value={button.value} onClick={handleButtonClick}>
        {button.value}
      </Button>
    </Col>
  )), [buttons, handleButtonClick]);

  if (isEmpty(bars) || isEmpty(buttons)) {
    return <Wrapper data-testid="loading"><Skeleton active /></Wrapper>;
  }

  return (
    <AppWrapper data-testid="myresult">
      {renderBars}
      <Row key="row-last">
        {renderSelect}
        {renderButtons}
      </Row>
    </AppWrapper>
  );
};

export default App;
