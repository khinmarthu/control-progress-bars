import React, {
  useState, useEffect, useMemo, memo,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PROGRESS_BAR_DANGER, PROGRESS_BAR, PROGRESS } from '../../constants/defaultClassName';
import { PROGRESS_VALUES } from '../../constants/defaultValue';


const { MAX_VALUE, MIN_VALUE } = PROGRESS_VALUES;

const ProgressWrapper = styled('div')``;

const Progress = styled('div')``;

const ProgressText = styled('div').attrs(() => ({
  className: 'progress-text',
}))`
  margin-left: 50%;
  position: absolute;
`;

const ProgressBar = memo((props) => {
  const {
    max, value, className,
  } = props;
  const [percentage, setPercentage] = useState(0);
  const [actualValue, setActualValue] = useState(value); // progress bar actual value

  const wrapperClassname = `${PROGRESS}${className}`;

  useEffect(() => {
    if (value < MIN_VALUE) {
      setPercentage(MIN_VALUE);
      setActualValue(MIN_VALUE);
    } else {
      setPercentage((value / max) * 100);
      setActualValue(value);
    }
  }, [value, max]);

  const progressClassname = useMemo(() => {
    if (value > max) {
      return `${PROGRESS_BAR} ${PROGRESS_BAR_DANGER}`;
    }
    return PROGRESS_BAR;
  }, [value, max]);


  return (
    <ProgressWrapper className={wrapperClassname}>
      <Progress
        className={progressClassname}
        role="progressbar"
        style={{ width: `${percentage}%` }}
        aria-valuenow={actualValue}
        aria-valuemin={MIN_VALUE}
        aria-valuemax={max}
      />
      <ProgressText>
        {`${actualValue} (${percentage.toFixed(2)}%)`}
      </ProgressText>
    </ProgressWrapper>
  );
});

ProgressBar.defaultProps = {
  className: '',
  max: MAX_VALUE,
  value: MIN_VALUE,
};

ProgressBar.propTypes = {
  max: PropTypes.number,
  value: PropTypes.number,
  className: PropTypes.string,
};

export default ProgressBar;
