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

const ProgressText = styled('div')`
  margin-left: 50%;
  position: absolute;
`;

const ProgressBar = memo((props) => {
  const {
    min, max, value, className,
  } = props;
  const [width, setWidth] = useState(0);

  const wrapperClassname = `${PROGRESS}${className}`;

  useEffect(() => {
    setWidth((value / max) * 100);
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
        style={{ width: `${width}%` }}
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
      />
      <ProgressText>
        {`${value}%`}
      </ProgressText>
    </ProgressWrapper>
  );
});

ProgressBar.defaultProps = {
  className: '',
  min: MIN_VALUE,
  max: MAX_VALUE,
};

ProgressBar.propTypes = {
  max: PropTypes.number,
  min: PropTypes.number,
  value: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default ProgressBar;
