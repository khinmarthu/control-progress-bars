import {
  configure, shallow, render, mount,
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// React 16 Enzyme adapter
configure({ adapter: new Adapter() });

export { shallow, mount, render };
