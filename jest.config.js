module.exports = {
  testURL: 'http://localhost/',
  setupFiles: [
    './tests/setupTests.js',
  ],
  moduleNameMapper: {
    '^.+\\.css$': 'identity-obj-proxy',
    '^.+\\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/tests/__mocks__/fileMock.js',
  },
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
  collectCoverageFrom: [
    'src/components/**/*.{js,jsx}',
    '!src/components/(helper|style-utils|index).{js,jsx}',
  ],
  coverageThreshold: {
    global: {
      statements: 98,
      branches: 91,
      functions: 98,
      lines: 98,
    },
  },
};
