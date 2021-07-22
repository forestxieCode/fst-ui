module.exports = {
  moduleFileExtensions: ['js', 'json', 'vue'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
  },
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/scripts/testSetup'],
  collectCoverageFrom: [
    'src/components/**/*.{js,vue}',
    '!src/components/theme-chalk/*'
  ]
}
