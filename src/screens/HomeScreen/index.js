import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  ScrollView,
  RefreshControl,
  Image,
} from 'react-native';
import {BLACK_COLOR, PRIMARY_COLOR, WHITE_COLOR} from '../../themes/colors';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ripple from 'react-native-material-ripple';
import {DATA_ASYNC_STORAGE} from '../../store/controllers/types';
import AsyncStorage from '@react-native-community/async-storage';
import {CommonActions} from '@react-navigation/native';
import MyAuthController from '../../store/controllers/authControllers';
import {LARGE, MEDIUM} from '../../themes/fonts';
import TileComponent from '../../components/tileComponent';
import Toast, {DURATION} from 'react-native-easy-toast';
import MyApiController from '../../store/controllers/apiController';

class HomeScreen extends Component {
  constructor() {
    super();
    this.PD_LOADED = false;
    this.UD_LOADED = false;
    this.state = {
      isDataLoaded: false,
    };
  }

  componentDidMount() {
    this._handleLoadData();
  }

  _handleIsLoading = () => {
    this.setState({isDataLoaded: this.UD_LOADED && this.PD_LOADED});
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
        <View style={styles.headerViewStyle}>
          <View style={{flex: 1}} />
          <View style={[styles.flexStyle, {flex: 3}]}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#0037FF'}}>
              "Hit Counter"
            </Text>
          </View>
          <View style={styles.flexStyle}>
            <Ripple
              style={styles.rippleStyle}
              rippleContainerBorderRadius={50}
              rippleCentered={true}
              onPress={() =>
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
              }>
              <Icon name={'power-off'} color={'red'} size={25} />
            </Ripple>
          </View>
        </View>

        <View style={{height: 1, backgroundColor: BLACK_COLOR}} />
        <View style={{height: 50, flexDirection: 'row'}}>
          <View style={styles.flexStyle}>
            <Text style={{fontSize: MEDIUM, fontWeight: 'bold'}}>
              Past Games
            </Text>
          </View>
          <View style={{width: 1, backgroundColor: BLACK_COLOR}} />
          <View style={styles.flexStyle}>
            <Text style={{fontSize: MEDIUM, fontWeight: 'bold'}}>
              New Games
            </Text>
          </View>
        </View>
        <View style={{height: 1, backgroundColor: BLACK_COLOR}} />

        <View style={{flex: 6}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={!this.state.isDataLoaded}
                onRefresh={this._handleLoadData}
              />
            }>
            <View style={{height: 200, flexDirection: 'row'}}>
              <View style={styles.flexStyle}>
                <Image
                  source={require('../../images/image.jpg')}
                  style={{height: 130, width: 130, borderRadius: 100}}
                />
              </View>
              <View style={[styles.flexStyle, {flex: 1.3}]}>
                <Text
                  style={{fontSize: 15, fontWeight: 'bold', paddingRight: 25}}>
                  {this.props.data.about
                    ? this.props.data.about
                    : 'About is null'}
                </Text>
              </View>
            </View>

            <View style={{height: 50, flexDirection: 'row'}}>
              <View style={styles.flexStyle}>
                <View style={styles.tagStyle}>
                  <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                    {this.props.data.clanTag
                      ? this.props.data.clanTag
                      : 'Clan Tag'}
                  </Text>
                </View>
              </View>
              <View style={styles.flexStyle}>
                <View style={styles.tagStyle}>
                  <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                    {this.props.data.gamerTag
                      ? this.props.data.gamerTag
                      : 'Gamer Tag'}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.boxOutterViewStyle}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <View style={{height: 2, backgroundColor: '#B5824E'}} />
                <View style={styles.boxStyle}>
                  <View style={{width: 2, backgroundColor: '#B5824E'}} />
                  <View
                    style={[styles.flexStyle, {backgroundColor: '#EBCFB7'}]}>
                    <Text style={{fontSize: MEDIUM, fontWeight: 'bold'}}>
                      Total Kills
                    </Text>
                    <View style={{height: 30}} />
                    <Text style={{fontSize: MEDIUM, fontWeight: 'bold'}}>
                      {this.props.stats.totalKills
                        ? this.props.stats.totalKills
                        : null}
                    </Text>
                  </View>
                  <View style={{width: 2, backgroundColor: '#B5824E'}} />
                  <View
                    style={[styles.flexStyle, {backgroundColor: '#EBCFB7'}]}>
                    <Text style={{fontSize: MEDIUM, fontWeight: 'bold'}}>
                      Death Ratio
                    </Text>
                    <View style={{height: 30}} />
                    <Text style={{fontSize: MEDIUM, fontWeight: 'bold'}}>
                      {this.props.stats.totalDeath
                        ? this.props.stats.totalDeath
                        : null}
                    </Text>
                  </View>
                  <View style={{width: 2, backgroundColor: '#B5824E'}} />
                  <View
                    style={[styles.flexStyle, {backgroundColor: '#EBCFB7'}]}>
                    <Text style={{fontSize: MEDIUM, fontWeight: 'bold'}}>
                      Total Games
                    </Text>
                    <View style={{height: 30}} />
                    <Text style={{fontSize: MEDIUM, fontWeight: 'bold'}}>
                      {this.props.stats.totalGames
                        ? this.props.stats.totalGames
                        : null}
                    </Text>
                  </View>
                  <View style={{width: 2, backgroundColor: '#B5824E'}} />
                </View>
                <View
                  style={{
                    height: 2.3,
                    backgroundColor: '#B5824E',
                    marginBottom: 2,
                  }}
                />
              </View>
            </View>

            <View
              style={{
                height: 1.5,
                backgroundColor: '#B5824E',
                width: '70%',
                alignSelf: 'center',
              }}
            />

            <View
              style={{
                height: 200,
                justifyContent: 'center',
              }}>
              <Text
                style={{paddingLeft: 40, fontWeight: 'bold', fontSize: MEDIUM}}>
                Share
              </Text>
              <View style={{height: 10}} />
              <View
                style={{
                  height: 60,
                  flexDirection: 'row',
                  width: '90%',
                  alignSelf: 'center',
                }}>
                <View style={styles.flexStyle}>
                  <Ripple
                    style={styles.rippleStyle}
                    rippleContainerBorderRadius={50}
                    rippleCentered={true}>
                    <Icon name={'facebook'} size={25} />
                  </Ripple>
                </View>
                <View style={styles.flexStyle}>
                  <Ripple
                    style={styles.rippleStyle}
                    rippleContainerBorderRadius={50}
                    rippleCentered={true}>
                    <Icon name={'instagram-square'} size={25} />
                  </Ripple>
                </View>
                <View style={styles.flexStyle}>
                  <Ripple
                    style={styles.rippleStyle}
                    rippleContainerBorderRadius={50}
                    rippleCentered={true}>
                    <Icon name={'google-plus'} size={25} />
                  </Ripple>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <View style={{height: 1, backgroundColor: BLACK_COLOR}} />
          <View style={{height: 50, flexDirection: 'row'}}>
            <View style={styles.flexStyle}>
              <Text style={{fontSize: MEDIUM, fontWeight: 'bold'}}>Home</Text>
            </View>
            <View style={{width: 1, backgroundColor: BLACK_COLOR}} />
            <View style={styles.flexStyle}>
              <Text style={{fontSize: MEDIUM, fontWeight: 'bold'}}>
                Profile
              </Text>
            </View>
            <View style={{width: 1, backgroundColor: BLACK_COLOR}} />
            <View style={styles.flexStyle}>
              <Text style={{fontSize: MEDIUM, fontWeight: 'bold'}}>
                Custom Game
              </Text>
            </View>
          </View>
        </View>

        {/* Toast about Internet Status */}
        <Toast
          ref={(toast) => (this.toast = toast)}
          style={{backgroundColor: '#666666', borderRadius: 5}}
          position={'bottom'}
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={1000}
          textStyle={{color: 'white'}}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  stats: state.AuthReducer.playerStats,
  data: state.AuthReducer.userData,
});

export default connect(mapStateToProps, null)(HomeScreen);

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
