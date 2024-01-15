module.exports = {
  preset: 'react-native',
  "moduleDirectories": ["node_modules", "src", "__mocks__"],
  "setupFiles": ["<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js"],
  transformIgnorePatterns: [
    "/node_modules/(?!(@react-navigation/elements)|(@react-native|react-native/))"
  ],

  // "testEnvironment": "node",
  // "moduleNameMapper": {
  //   "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  // }
};
