import { getWrapper, unmountComponent } from '../../../../tests/helpers/testHelper';
import ProgressBar from '../index';

describe('ProgressBar:', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {};
    wrapper = getWrapper(props, ProgressBar);
  });

  afterEach(() => {
    unmountComponent();
  });

  it('should render the ProgressBar with no props', () => {
    wrapper = getWrapper(props, ProgressBar, 'shallow');
    // console.log(wrapper.debug());
    expect(wrapper.find('.progress').exists()).toBe(true);
  });

  describe('when props.value is passed as 10,', () => {
    let ProgressTextWrapper;
    let ProgressBarWrapper;
    beforeEach(() => {
      props = {
        value: 10,
      };
      wrapper = getWrapper(props, ProgressBar);
      ProgressBarWrapper = wrapper.find('.progress-bar');
      ProgressTextWrapper = wrapper.find('.progress-text');
    });

    it('should render progress bar', () => {
      expect(ProgressBarWrapper.exists()).toBe(true);
    });

    it('should render progress text', () => {
      expect(ProgressTextWrapper.exists()).toBe(true);
    });

    it('should display 10 (10.00%) as progress children', () => {
      expect(ProgressTextWrapper.text()).toBe('10 (10.00%)');
    });
  });

  describe('when props.value is less than 0,', () => {
    let ProgressBarWrapper;
    let ProgressTextWrapper;
    beforeEach(() => {
      props = {
        value: -1,
      };
    });

    it('progress bar width should be 0', () => {
      wrapper = getWrapper(props, ProgressBar, 'shallow');
      ProgressBarWrapper = wrapper.find('.progress-bar');
      expect(ProgressBarWrapper.props().style.width).toBe('0%');
    });

    it('progress text should display 0 (0.00%)', () => {
      wrapper = getWrapper(props, ProgressBar);
      ProgressTextWrapper = wrapper.find('.progress-text');
      expect(ProgressTextWrapper.text()).toBe('0 (0.00%)');
    });
  });

  describe('when props.value is greater than bar limit,', () => {
    beforeEach(() => {
      props = {
        value: 200,
        max: 150,
      };
    });

    it('progress bar should have classname progress-bar-danger', () => {
      wrapper = getWrapper(props, ProgressBar, 'shallow');
      expect(wrapper.find('.progress-bar-danger').exists()).toBe(true);
    });

    it('progress text should display 200 (133.33%)', () => {
      const ProgressTextWrapper = getWrapper(props, ProgressBar).find('.progress-text');
      expect(ProgressTextWrapper.text()).toBe('200 (133.33%)');
    });
  });
});
