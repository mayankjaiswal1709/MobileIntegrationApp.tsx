const mock = jest.genMockFromModule('react-native-gesture-handler');
// Provide mock implementations for any specific functions you are using
mock.createGestureHandler = jest.fn();
export default mock;