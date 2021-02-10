import React, {PureComponent} from 'react';
import store from './src/store';
import {Provider} from 'react-redux';
import AppContainer from './src/navigation';
import {SafeAreaView} from 'react-native';
import SignupScreen from './src/screens/signupScreen';
import HomeScreen from './src/screens/HomeScreen';

class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <SafeAreaView style={{flex: 1}}>
          <AppContainer />
        </SafeAreaView>
      </Provider>
    );
  }
}

export default App;
