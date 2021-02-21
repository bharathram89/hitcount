import React, { Component } from 'react';
import { StyleSheet, View, Modal, Text, TouchableOpacity, TouchableHighlight, Image } from 'react-native';
import { WHITE_COLOR, BLACK_COLOR } from '../themes/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CommonActions, withNavigation } from '@react-navigation/native';
import Ripple from 'react-native-material-ripple';
import { LARGE, MEDIUM } from '../themes/fonts';
import { Button } from 'react-native-vector-icons/FontAwesome5';
import { Overlay } from 'react-native-elements';

import AsyncStorage from '@react-native-community/async-storage';
import {DATA_ASYNC_STORAGE} from '../store/controllers/types';

// import {withNavigation} from '@react-navigation'; 
import { connect } from 'react-redux';
class SecureTopNav extends Component {
    constructor(props) {
        super(props)
    }

    logout() {
        AsyncStorage.removeItem(DATA_ASYNC_STORAGE)
            .then((user) => {
                console.log('User Removed from Async Storage Successfully');
                console.log(user);
                this.props.navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'LoginScreen' }],
                    }),
                );
            })
            .catch((err) => {
                console.log(
                    'CATCH, URL SCREEN, ERROR IN REMOVING USER FROM ASYNC STORAGE',
                );
                console.log(err);
            })
    }
    visible = true;
    toggleOverlay = () => {
        console.log('toggling overly')
        this.visible = !this.visible;
    };
    state = {
        modalVisible: false
    };

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    render() {
        const { modalVisible } = this.state;
        console.log(this.props, "props")
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

                <View style={styles.headerViewStyle}>
                    <View style={{ flex: 1 }} />
                    <View style={[styles.flexStyle, { flex: 3 }]}>
                        <Text style={{ fontSize: LARGE, fontWeight: 'bold', color: '#0037FF' }}>
                            "Hit Counter"
                        </Text>
                    </View>
                    <View style={styles.flexStyle}>
                        <Ripple
                            style={styles.rippleStyle}
                            rippleContainerBorderRadius={50}
                            rippleCentered={true}
                            onPress={() => {
                                this.setModalVisible(true)
                            }}>
                            <Icon name={'bars'} color={'black'} size={25} />
                        </Ripple>
                    </View>
                </View>
                <View style={{ height: 1, backgroundColor: BLACK_COLOR }} />



                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        this.setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Hello World!</Text>

                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => this.setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Past Games</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => this.setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Custom Game Types</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => this.setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Edit Profile</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    this.setModalVisible(!modalVisible);
                                    AsyncStorage.removeItem(DATA_ASYNC_STORAGE)
                                        .then((user) => {
                                        console.log('User Removed from Async Storage Successfully');
                                        console.log(user);
                                        this.props.navigation.dispatch(
                                            CommonActions.reset({
                                            index: 0,
                                            routes: [{name: 'LoginScreen'}],
                                            }),
                                        );
                                        })
                                        .catch((err) => {
                                        console.log(
                                            'CATCH, URL SCREEN, ERROR IN REMOVING USER FROM ASYNC STORAGE',
                                        );
                                        console.log(err);
                                    })
                                    }}
                            >
                                <Text style={styles.textStyle}>Sign Out</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => this.setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

 
                <View style={{ height: 50, flexDirection: 'row' }}>

                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('PhoneSync')}
                        style={styles.flexStyle}
                    >
                        <View >
                            <Text style={styles.nav}>
                                Sync with Phone
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: 1, backgroundColor: BLACK_COLOR }} />

                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('NewGameScreen')}
                        style={styles.flexStyle}
                    >
                        <View>
                            <Text style={styles.nav}>
                               Start New Game
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 1, backgroundColor: BLACK_COLOR }} />

            </View>
        );
    }

}

const mapStateToProps = (state) => ({
});
export default SecureTopNav;

const styles = StyleSheet.create({
    nav: {
        width: '100%',
        fontSize: MEDIUM,
        fontWeight: 'bold',
    },
    flexStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerViewStyle: {
        height: 50,
        flexDirection: 'row',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
});
