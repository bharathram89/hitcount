import React, {Component} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StatusBar,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {THEME_COLOR, WHITE_COLOR, PRIMARY_COLOR} from '../../themes/colors';
import CustomButton from '../../components/customButton';
import CustomTextInput from '../../components/customTextInput';
import styles from './styles';
import MyAuthController from '../../store/controllers/authControllers';
import {connect} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import Toast, {DURATION} from 'react-native-easy-toast';
// import { LinearGradient } from 'expo-linear-gradient';

class LoginScreen extends Component {
  state = {
    email: '', ///sivhitcounter@gmail.com
    password: '', /// testasdfasdf
    usertype: 'player',
    spinner: false,
    errMessage: '',
  };

  HandleLoginPress = () => {
    this.setState({errMessage: ''});

    let validated = true;
    if (!this.emailRef.InputsValidation()) {
      validated = false;
    }

    if (!this.passwordRef.InputsValidation()) {
      validated = false;
    }

    if (!this.usertypeRef.InputsValidation()) {
      validated = false;
    }

    if (validated === true) {
      this.setState({spinner: true});
      MyAuthController.loginUser(
        this.state.email.trim(),
        this.state.password.trim(),
        this.state.usertype.trim(),
      )
        .then(() => {
          this.setState({spinner: false});
          this.props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'HomeScreen'}],
            }),
          );
        })
        .catch((err) => {
          this.setState({spinner: false});
          console.log('CATCH, LOGIN SCREEN, USER LOGIN API');
          console.log(err);
          if (Platform.OS === 'android') {
            this.toast.show(err.error.message, 2000);
          } else {
            this.setState({errMessage: err.error.message});
          }
        });
    } else if (validated === false) {
      console.log('Email, Password and UserType Required!!');
    }
  };

  render() {
    const {state} = this;
    return (
      <View style={styles.containerStyle}>
       
        <StatusBar backgroundColor={PRIMARY_COLOR} barStyle={'dark-content'} />
        <ScrollView
          keyboardShouldPersistTaps={'always'}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
          <View style={styles.logoViewStyle}>
            <Image
              source={require('../../images/logo.png')}
              style={{height: 60, width: 170}}
            />
          </View>

          <View style={{height: 30}} />
          <Text style={styles.pageTitleTextStyle}>Login</Text>
          <View style={{height: 20}} />

          <CustomTextInput
            iconName="user"
            placeholder="Email"
            value={state.email}
            onChangeText={(text) => this.setState({email: text})}
            keyboardType="email-address"
            errorText="Email is required"
            ref={(e) => (this.emailRef = e)}
          />

          <CustomTextInput
            iconName="unlock-alt"
            placeholder="Password"
            value={state.password}
            onChangeText={(text) => this.setState({password: text})}
            keyboardType="default"
            errorText="Password is required"
            ref={(e) => (this.passwordRef = e)}
            secureTextEntry
          />

          <CustomTextInput
            iconName="user"
            placeholder="User Type"
            value={state.usertype}
            onChangeText={(text) => this.setState({usertype: text})}
            keyboardType="default"
            errorText="User Type is required"
            ref={(e) => (this.usertypeRef = e)}
          />

          {/* Login Button */}
          <View style={{height: 20}} />
          <Text style={{alignSelf: 'center', color: '#E06666'}}>
            {this.state.errMessage}
          </Text>
          <View style={{height: 45}}>
            {state.spinner ? (
              <ActivityIndicator color={THEME_COLOR} size={40} />
            ) : (
              <CustomButton
                showIcon
                iconName={'sign-in'}
                backgroundColor={THEME_COLOR}
                onPress={() => {
                  this.HandleLoginPress();
                }}
              />
            )}
          </View>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SignupScreen')}>
            <Text style={{paddingTop: 20, textAlign: 'center'}}>
              Don't have an account?
              <Text
                style={{
                  fontWeight: 'bold',
                  paddingTop: 10,
                }}>{` Sign Up`}</Text>
            </Text>
          </TouchableOpacity>

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
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  // isInternetAvailable: state.AuthReducer.internetStatus,
});

export default connect(mapStateToProps, null)(LoginScreen);
