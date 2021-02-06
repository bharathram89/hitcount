import React, {Component} from 'react';
import {StyleSheet, View, StatusBar, Text, ScrollView, RefreshControl} from 'react-native';
import {WHITE_COLOR} from '../../themes/colors';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ripple from 'react-native-material-ripple';
import {
  DATA_ASYNC_STORAGE,
  TOKEN_ASYNC_STORAGE,
} from '../../store/controllers/types';
import AsyncStorage from '@react-native-community/async-storage';
import {CommonActions} from '@react-navigation/native';
import MyAuthController from '../../store/controllers/authControllers';
import {LARGE} from '../../themes/fonts';
import TileComponent from '../../components/tileComponent';
import Toast, {DURATION} from 'react-native-easy-toast';
import MyApiController from '../../store/controllers/apiController';

class HomeScreen extends Component {

  constructor(){
    super();
    this.PD_LOADED = false;
    this.UD_LOADED = false;
    this.state = {
      isDataLoaded: false
    }
  }

  componentDidMount() {
       this._handleLoadData();
  }

  _handleIsLoading = () => {
   this.setState({isDataLoaded: (this.UD_LOADED && this.PD_LOADED)});
  }

  _handleLoadData = () => {

    this.UD_LOADED = false;
    this.PD_LOADED = false;


    MyApiController.call(MyAuthController.getPlayerStats, (error, response) => {
      this.PD_LOADED = true;
      this._handleIsLoading()
      if(error){
        console.log("ERROR in CALL: getPlayerStats");
        console.log(error)
      } else{
      

        console.log("Success response: getPlayerStats");
        console.log(response);
      }
    })

    MyApiController.call(MyAuthController.getUserData, (error, response) => {
      this.UD_LOADED = true;
      this._handleIsLoading()

      if(error){
        console.log("ERROR in CALL:getUserData");
        console.log(error)
      } else{
        
        console.log("Success response:getUserData");
        console.log(response);
      }
    })
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <StatusBar backgroundColor={WHITE_COLOR} barStyle={'dark-content'} />
        <View style={styles.headerViewStyle}>
          <View style={{flex: 1}} />
          <View style={[styles.flexStyle, {flex: 3}]}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>HitCount</Text>
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
        <ScrollView refreshControl={ <RefreshControl refreshing={!this.state.isDataLoaded} onRefresh={this._handleLoadData}/>}>
          <Text style={styles.headingStyle}>Player Stats Summary:</Text>
          <TileComponent name={'User Id'} value={this.props.stats.userID} />
          <TileComponent name={'Email'} value={this.props.stats.email} />
          <TileComponent
            name={'Total Kills'}
            value={this.props.stats.totalKills}
          />
          <TileComponent
            name={'Total Revived'}
            value={this.props.stats.totalRevived}
          />
          <TileComponent
            name={'Total Respawn'}
            value={this.props.stats.totalRespawn}
          />
          <TileComponent
            name={'Total Mediced'}
            value={this.props.stats.totalMediced}
          />
          <TileComponent
            name={'Total Death'}
            value={this.props.stats.totalDeath}
          />
          <TileComponent
            name={'Total Games'}
            value={this.props.stats.totalGames}
          />
          <View style={{height: 20}} />

          <Text style={styles.headingStyle}>User Data:</Text>
          <TileComponent name={'Email'} value={this.props.data.email} />
          <TileComponent name={'User Type'} value={this.props.data.userType} />
          <TileComponent name={'Gamer Tag'} value={this.props.data.gamerTag} />
          <TileComponent
            name={'Player Id'}
            value={this.props.data.playerProfileID}
          />
          <TileComponent name={'User Id'} value={this.props.data.userID} />
          <TileComponent name={'Facebook'} value={this.props.data.facebook} />
          <TileComponent name={'Youtube'} value={this.props.data.youtube} />
          <TileComponent name={'Twitter'} value={this.props.data.twitter} />
          <TileComponent name={'Clan Tag'} value={this.props.data.clanTag} />
          <TileComponent
            name={'Profile Pic'}
            value={this.props.data.profilepic}
          />
          <TileComponent name={'About'} value={this.props.data.about} />

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
        </ScrollView>
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
  },

  headingStyle: {
    fontSize: LARGE,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingLeft: 20,
  },
  headerViewStyle: {
    height: 70,
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
    height: 60,
    width: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
