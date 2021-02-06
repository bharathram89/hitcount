import React, {PureComponent} from 'react';
import {StyleSheet, View, Text, StatusBar, Image} from 'react-native';
import {WHITE_COLOR} from '../../themes/colors';
import {DATA_ASYNC_STORAGE} from '../../store/controllers/types';
import AsyncStorage from '@react-native-community/async-storage';
import {CommonActions} from '@react-navigation/native';
import MyAuthController from '../../store/controllers/authControllers';
import Toast, {DURATION} from 'react-native-easy-toast';

class SplashScreen extends PureComponent {
  componentDidMount() {
    AsyncStorage.getItem(DATA_ASYNC_STORAGE)
      .then((user) => {
        console.log('TEST 01---USER ASYSNC DATA IN SPLASH SCREEN ENTRY');
        console.log(user);
        if (user !== null) {
          let userData = JSON.parse(user);
          console.log(
            'TEST 02---USER ASYSNC DATA IN SPLASH SCREEN(THEN-IF BLOCK)',
          );
          console.log(userData);

          MyAuthController.loginUser(
            userData.email,
            userData.password,
            userData.usertype,
          )
            .then(() => {
              setTimeout(
                () =>
                  this.props.navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{name: 'HomeScreen'}],
                    }),
                  ),
                3000,
              );
            })
            .catch((err) => {
              console.log('CATCH, SPLASH SCREEN, USER LOGIN API');
              console.log(err);
              this.toast.show('Internal server error(502 Bad Gateway)', 2000);
              setTimeout(
                () =>
                  this.props.navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{name: 'LoginScreen'}],
                    }),
                  ),
                3000,
              );
            });
        } else {
          console.log(
            'TEST 03---USER ASYSNC DATA IN SPLASH SCREEN( THEN-ELSE BLOCK )',
          );
          setTimeout(
            () =>
              this.props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'LoginScreen'}],
                }),
              ),
            3000,
          );
        }
      })
      .catch((err) => {
        console.log('TEST 04---USER ASYSNC DATA IN SPLASH SCREEN CATCH BLOCK');
        console.log(err);
      });
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <StatusBar backgroundColor={WHITE_COLOR} barStyle={'dark-content'} />
        <Image
          source={require('../../images/logo.png')}
          style={{height: 80, width: 280}}
        />

        {/* Toast about Internet Status */}
        <Toast
          ref={(toast) => (this.toast = toast)}
          style={{backgroundColor: '#666666', borderRadius: 5}}
          position={'bottom'}
          positionValue={100}
          fadeInDuration={750}
          fadeOutDuration={1000}
          textStyle={{color: 'white'}}
        />
      </View>
    );
  }
}

export default SplashScreen;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE_COLOR,
  },
});
