import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableHighlight, Image } from 'react-native';
import { WHITE_COLOR, BLACK_COLOR , PRIMARY_COLOR} from '../themes/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {CommonActions , withNavigation} from '@react-navigation/native'; 
import Ripple from 'react-native-material-ripple';
import { LARGE, MEDIUM } from '../themes/fonts';
import { Button } from 'react-native-vector-icons/FontAwesome5'; 
 

// import {withNavigation} from '@react-navigation'; 
import {connect} from 'react-redux';
class SecureBottomNav extends Component { 
    constructor(props) {
        super(props)
      }
    
    state = {};
    render() {
        console.log(this.props,"props")
        const {
            height,
            width,
            backgroundColor,
            borderRadius, 
        } = this.props;
        const btnHeight = height ? height : 45;
        const btnWidth = width ? width : '50%';
        const btnBgColor = backgroundColor ? backgroundColor : BLACK_COLOR;
        const btnBorderRadius = borderRadius ? borderRadius : 10;
        return (
            <View >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                    }}>
                    <View style={{ height: 1, backgroundColor: BLACK_COLOR }} />
                    <View style={{ height: 50, flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('HomeScreen')}
                            style={styles.flexStyle}
                        >
                        <View  >
                            <Text style={styles.nav}>GO HOME</Text>
                        </View>
                        </TouchableOpacity>
                        <View style={{ width: 1, backgroundColor: BLACK_COLOR }} />
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('NewGameScreen')}
                            style={styles.flexStyle}
                        >
                        <View >
                            <Text style={styles.nav}>
                                Custom Game
                            </Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
 
}

const mapStateToProps = (state) => ({ 
  });
export default  SecureBottomNav;

const styles = StyleSheet.create({
    nav: {
        width: '100%', 
        fontSize: MEDIUM,
        fontWeight: 'bold',
    },
    flexStyle: {
        backgroundColor: PRIMARY_COLOR,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row' 
    }
});
