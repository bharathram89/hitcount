import React, {PureComponent} from 'react';
import store from './src/store';
import {Provider} from 'react-redux';
import AppContainer from './src/navigation';
import MyAuthController from './src/store/controllers/authControllers';
import HomeScreen from './src/screens/HomeScreen';

class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
        {/* <HomeScreen /> */}
      </Provider>
    );
  }
}

export default App;
