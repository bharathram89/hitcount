import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {WHITE_COLOR, BLACK_COLOR} from '../themes/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {LARGE} from '../themes/fonts';
import Ripple from 'react-native-material-ripple';
class CustomButton extends Component {
  state = {};
  render() {
    const {
      height,
      width,
      backgroundColor,
      borderRadius,
      onPress,
      showIcon,
      iconName,
      iconSize,
      btnTextAlignment,
      btnTextSize,
      btnFontWeight,
      btnTextColor,
      buttonText,
    } = this.props;
    const btnHeight = height ? height : 45;
    const btnWidth = width ? width : '50%';
    const btnBgColor = backgroundColor ? backgroundColor : BLACK_COLOR;
    const btnBorderRadius = borderRadius ? borderRadius : 10;
    return (
      <View style={styles.container}>
        <Ripple
          onPress={onPress}
          rippleCentered={true}
          style={[
            styles.buttonStyle,
            {
              height: btnHeight,
              width: btnWidth,
              backgroundColor: btnBgColor,
              borderRadius: btnBorderRadius,
            },
          ]}>
          {showIcon ? (
            <View style={styles.iconFlexStyle}>
              <Icon
                name={iconName ? iconName : 'home'}
                size={iconSize ? iconSize : 20}
                color={'white'}
              />
            </View>
          ) : (
            <View style={{flex: 0.6}} />
          )}
          <View
            style={[
              styles.buttonTextFlexStyle,
              {
                alignItems: btnTextAlignment ? btnTextAlignment : 'center',
              },
            ]}>
            <Text
              style={{
                width: '100%',
                textAlign: 'center',
                fontSize: btnTextSize ? btnTextSize : LARGE,
                fontWeight: btnFontWeight ? btnFontWeight : 'bold',
                color: btnTextColor ? btnTextColor : WHITE_COLOR,
              }}>
              {buttonText ? buttonText : 'LOG IN'}
            </Text>
          </View>
          <View style={{flex: 0.6}} />
        </Ripple>
      </View>
    );
  }
}

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    height: 55,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    flexDirection: 'row',
  },
  iconFlexStyle: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextFlexStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
