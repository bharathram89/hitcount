import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    Text,
    ScrollView,
    RefreshControl,
    Image,
} from 'react-native';
import { BLACK_COLOR, PRIMARY_COLOR, WHITE_COLOR } from '../../themes/colors';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ripple from 'react-native-material-ripple';
import { DATA_ASYNC_STORAGE } from '../../store/controllers/types';
import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions } from '@react-navigation/native';
import MyAuthController from '../../store/controllers/authControllers';
import { LARGE, MEDIUM } from '../../themes/fonts';
import TileComponent from '../../components/tileComponent';
import SecureTopNav from '../../components/secureTopNav';
import Toast, { DURATION } from 'react-native-easy-toast';
import MyApiController from '../../store/controllers/apiController';
import SecureBottomNav from '../../components/secureBottomNav';

class ProfileScreen extends Component {
    constructor() {
        super();
        this.PD_LOADED = false;
        this.UD_LOADED = false;
        this.state = {
            isDataLoaded: false,
        };
    }
    PastGameinPress() {
        console.log('we got in here?')
    }
    componentDidMount() {
        this._handleLoadData();
    }

    _handleIsLoading = () => {
        this.setState({ isDataLoaded: this.UD_LOADED && this.PD_LOADED });
    };

    _handleLoadData = () => {
        this.UD_LOADED = false;
        this.PD_LOADED = false;

        MyApiController.call(MyAuthController.getPlayerStats, (error, response) => {
            this.PD_LOADED = true;
            this._handleIsLoading();
            if (error) {
                console.log('ERROR in CALL: getPlayerStats');
                console.log(error);
            } else {
                console.log('Success response: getPlayerStats');
                console.log(response);
            }
        });

        MyApiController.call(MyAuthController.getUserData, (error, response) => {
            this.UD_LOADED = true;
            this._handleIsLoading();

            if (error) {
                console.log('ERROR in CALL:getUserData');
                console.log(error);
            } else {
                console.log('Success response:getUserData');
                console.log(response);
            }
        });
    };

    render() {
        return (
            <View style={styles.containerStyle}>
                <StatusBar backgroundColor={PRIMARY_COLOR} barStyle={'dark-content'} />

                {/* Header */}

                <SecureTopNav navigation={this.props.navigation}></SecureTopNav>

                <View style={{ flex: 6 }}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={!this.state.isDataLoaded}
                                onRefresh={this._handleLoadData}
                            />
                        }>
                    </ScrollView>
                </View>

                <SecureBottomNav navigation={this.props.navigation}></SecureBottomNav>
                {/* Toast about Internet Status */}
                <Toast
                    ref={(toast) => (this.toast = toast)}
                    style={{ backgroundColor: '#666666', borderRadius: 5 }}
                    position={'bottom'}
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    textStyle={{ color: 'white' }}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    stats: state.AuthReducer.playerStats,
    data: state.AuthReducer.userData,
});

export default connect(mapStateToProps, null)(ProfileScreen);

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: PRIMARY_COLOR,
    },
    tagStyle: {
        height: 45,
        width: 130,
        backgroundColor: WHITE_COLOR,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxOutterViewStyle: {
        height: 190,
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxStyle: {
        height: 100,
        width: '80%',
        alignSelf: 'center',
        flexDirection: 'row',
    },
    headingStyle: {
        fontSize: LARGE,
        fontWeight: 'bold',
        paddingTop: 10,
        paddingLeft: 20,
    },
    headerViewStyle: {
        height: 60,
        flexDirection: 'row',
    },
    flexStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 80,
    },
    buttonViewStyle: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    rippleStyle: {
        height: 50,
        width: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
