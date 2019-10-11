import React from 'react';
import { ThemeProvider } from 'styled-components';
import { shallow, mount } from '../setupTests';

export * from './testingLibraryHelper';

export {
  mountWithTheme,
  unmountComponent,
  shallowWithTheme,
  getWrapper,
};

let mountedComponent;

/**
 * Mount component with full rendering using theme styled component
 * @param {Object} tree A component that should be mounted
 * @param {Object} theme A theme component
 */
function mountWithTheme(tree, theme) {
  if (theme) {
    const context = shallow(<ThemeProvider theme={theme} />)
      .instance()
      .getChildContext();

    mountedComponent = mount(tree, {
      context,
      childContextTypes: ThemeProvider.childContextTypes,
    });
  } else {
    mountedComponent = mount(tree);
  }
  return mountedComponent;
}

function unmountComponent() {
  if (mountedComponent.exists()) {
    mountedComponent.unmount();
  }
}

/**
 * Mount component with shallow rendering using theme styled component
 * @param {Object} tree A component that should be mounted
 * @param {Object} theme A theme component
 */
function shallowWithTheme(tree, theme) {
  if (theme) {
    const context = shallow(<ThemeProvider theme={theme} />)
      .instance()
      .getChildContext();
    return shallow(tree, { context });
  }
  return shallow(tree);
}

function getWrapper(props, CurrentComponent, type = 'mount') {
  switch (type) {
    case 'shallow':
      return shallowWithTheme(<CurrentComponent {...props} />);
    default:
      return mountWithTheme(<CurrentComponent {...props} />);
  }
}
