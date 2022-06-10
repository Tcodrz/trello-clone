/* eslint-disable */
export default {
  displayName: 'trello-clone',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
  coverageDirectory: '../../coverage/apps/trello-clone',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': 'jest-preset-angular',
  },
  // transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  // https://github.com/salesforce/akita/issues/781#issuecomment-1018856090
  transformIgnorePatterns: ['node_modules/(?!.*.mjs$|@datorama/akita)'],
  // transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
