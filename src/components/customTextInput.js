import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';
import {WHITE_COLOR, ICONS_COLOR, TEXT_COLOR} from '../themes/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import AuthValidations from './validations';

export default class CustomTextField extends Component {
  state = {validation: true};

  InputsValidation = () => {
    const keyboardType = this.props.keyboardType ? this.props.keyboardType : '';

    if (keyboardType == 'email-address') {
      const emailValid = new AuthValidations().emailValidation(
        this.props.value,
      );

      if (emailValid == true) {
        this.setState({validation: true});
        return true;
      } else {
        this.setState({validation: false});
        return false;
      }
    }
    if (keyboardType === 'default') {
      const passwordValid = new AuthValidations().passwordValidation(
        this.props.value,
      );

      if (passwordValid === true) {
        this.setState({validation: true});
        return true;
      } else {
        this.setState({validation: false});
        return false;
      }
    } else {
      this.setState({validation: false});
      return false;
    }
  };

  render() {
    const {
      iconName,
      iconSize,
      placeholder,
      placeholderTxtClr,
      keyboardType,
      value,
      onChangeText,
      multiline,
      editable,
      secureTextEntry,
      errorText,
      inputHeight,
      inputWidth,
      inputBgColor,
      inputBorderColor,
      inputBorderRadius,
      hideInputIcon,
      justifyContent,
      errTextPadding,
    } = this.props;

    return (
      <React.Fragment>
        <View
          style={[
            styles.textFieldLineStyle,
            {
              height: inputHeight ? inputHeight : 45,
              width: inputWidth ? inputWidth : '85%',
              backgroundColor: inputBgColor ? inputBgColor : '#F6F6F6',
              borderColor: inputBorderColor ? inputBorderColor : '#F6F6F6',
              borderRadius: inputBorderRadius ? inputBorderRadius : 10,
            },
          ]}>
          {hideInputIcon ? (
            false
          ) : (
            <View style={[styles.flexStyle, {alignItems: 'center'}]}>
              <Icon
                name={iconName ? iconName : 'home'}
                size={iconSize ? iconSize : 17}
                color={ICONS_COLOR}
              />
            </View>
          )}
          <View
            style={[
              styles.flexStyle,
              {
                flex: 6,
                justifyContent: justifyContent ? justifyContent : 'center',
              },
            ]}>
            <TextInput
              placeholder={placeholder}
              keyboardType={keyboardType}
              value={value}
              onChangeText={onChangeText}
              placeholderTextColor={
                placeholderTxtClr ? placeholderTxtClr : TEXT_COLOR
              }
              secureTextEntry={secureTextEntry ? true : false}
              style={{
                width: '100%',
                height: '100%',
                paddingLeft: hideInputIcon ? 12 : 0,
              }}
              multiline={multiline ? multiline : false}
              editable={editable ? false : true}
            />
          </View>
        </View>

        <View style={styles.errorTextViewStyle}>
          {this.state.validation ? (
            <View />
          ) : (
            <Text
              style={[
                styles.errorTextStyle,
                {
                  color: '#E06666',
                  paddingLeft: errTextPadding ? errTextPadding : '12.5%',
                },
              ]}>
              {errorText}
            </Text>
          )}
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  textFieldLineStyle: {
    alignSelf: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    elevation: 1,
    marginTop: 8,
  },

  flexStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  errorTextViewStyle: {
    height: 15,
    justifyContent: 'center',
  },
  errorTextStyle: {
    fontSize: 10,
  },
});
