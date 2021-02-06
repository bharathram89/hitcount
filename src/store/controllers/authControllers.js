import {
  TOKEN_ASYNC_STORAGE,
  DATA_ASYNC_STORAGE,
  GET_PLAYER_STATS,
  GET_USER_DATA,
} from './types';
import store from '../../store';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

class AuthController {
  constructor() {
    //To Login User
    this.loginUser = (email, password, usertype) => {
      return new Promise((resolve, reject) => {
        console.log('TEST 01.1---EMAIL IN CONTROLLER');
        console.log(email);
        console.log('TEST 01.2---USER PASWORD IN CONTROLLER');
        console.log(password);
        console.log('TEST 01.3---USER TYPE IN CONTROLLER');
        console.log(usertype);

        axios({
          method: 'POST',
          url: `https://ohyv1x69pg.execute-api.us-west-1.amazonaws.com/dev/signOn?email=${email}&password=${password}&userType=${usertype}`,
          headers: {
            'x-api-key': 'hRKgPbPzQj1YGl1GquotW8mSE9VwNQFN93gfnoDb',
          },
        })
          .then((userLoginRes) => {
            if (userLoginRes) {
              console.log('TEST 02---LOGIN DATA IN CONTROLLER AFTER SUCCESS');
              console.log(userLoginRes.headers['hit-token']);

              AsyncStorage.setItem(
                TOKEN_ASYNC_STORAGE,
                JSON.stringify(userLoginRes.headers['hit-token']),
              )
                .then((token) => {
                  console.log('TOKen Saved in Async Storage');
                  console.log(token);
                })
                .catch((err) => {
                  console.log('Error while Saving TOKEN in Async Storage');
                  console.log(err);
                });

              AsyncStorage.setItem(
                DATA_ASYNC_STORAGE,
                JSON.stringify({email, password, usertype}),
              )
                .then((user) => {
                  console.log('User has Saved in Async Storage');
                  console.log(user);
                })
                .catch((err) => {
                  console.log('Error while Saving User in Async Storage');
                  console.log(err);
                });

              resolve(true);
            } else {
              console.log('TEST 03---LOGIN DATA IN CONTROLLER AFTER FAILURE');
              console.log(userLoginRes.data);
              reject(userLoginRes.data);
            }
          })
          .catch((err) => {
            console.log('CATCH, AUTH CONTROLLER, ERROR IN LOGIN USER');
            console.log(err);
            reject({error: {message: 'Not Found Error'}, success: false});
          });
      });
    };

    //  To Get Player Stats Summary
    this.getPlayerStats = (tokenValue) => {
      return new Promise((resolve, reject) => {
        console.log('TEST 01---TOKEN IN GET PLAYER STATS CONTROLLER');
        console.log(tokenValue);

        axios({
          method: 'GET',
          url: `https://ohyv1x69pg.execute-api.us-west-1.amazonaws.com/dev/playerStatsSummary?token=${tokenValue}`,
          headers: {
            'x-api-key': 'hRKgPbPzQj1YGl1GquotW8mSE9VwNQFN93gfnoDb',
          },
        })
          .then((playerStatsRes) => {
            if (playerStatsRes.data) {
              console.log('TEST 02---PLAYER STATS IN CONTROLLER AFTER SUCCESS');
              console.log(playerStatsRes.data);

              store.dispatch({
                type: GET_PLAYER_STATS,
                payload: playerStatsRes.data,
              });
              resolve(true);
            } else {
              console.log('TEST 03---PLAYER STATS IN CONTROLLER AFTER FAILURE');
              console.log(playerStatsRes.data);
              reject(playerStatsRes.data);
            }
          })
          .catch((err) => {
            console.log(
              'CATCH, AUTH CONTROLLER, ERROR IN GETTING PLAYER STATS',
            );
            console.log(err);
            reject({error: {message: 'Not Found Error'}, success: false});
          });
      });
    };

    //  To Get User Data
    this.getUserData = (tokenValue) => {
      return new Promise((resolve, reject) => {
        console.log('TEST 01---TOKEN IN GET USER DATA CONTROLLER');
        console.log(tokenValue);

        axios({
          method: 'GET',
          url: `https://ohyv1x69pg.execute-api.us-west-1.amazonaws.com/dev/userData?token=${tokenValue}`,
          headers: {
            'x-api-key': 'hRKgPbPzQj1YGl1GquotW8mSE9VwNQFN93gfnoDb',
          },
        })
          .then((userData) => {
            if (userData.data) {
              console.log('TEST 02---USER DATA IN CONTROLLER AFTER SUCCESS');
              console.log(userData.data);

              store.dispatch({
                type: GET_USER_DATA,
                payload: userData.data,
              });
              resolve(true);
            } else {
              console.log('TEST 03---USER DATA IN CONTROLLER AFTER FAILURE');
              console.log(userData.data);
              reject(userData.data);
            }
          })
          .catch((err) => {
            console.log('CATCH, AUTH CONTROLLER, ERROR IN GETTING USER DATA');
            console.log(err);
            reject({error: {message: 'Not Found Error'}, success: false});
          });
      });
    };
  }
}

const MyAuthController = new AuthController();
export default MyAuthController;
