import React from 'react';
import { render } from '@testing-library/react';

/**
 * Inside the function, we can wrap with common data providers
 * like ThemeProvider, TranslationProvider, etc
 */
// eslint-disable-next-line react/prop-types
const AllTheProviders = ({ children }) => (
  <>
    { children }
  </>
);

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

// override render method
export { customRender as render };
