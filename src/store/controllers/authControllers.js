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
    //To Register User
    this.ERROR_INTERNET = 'Please check your internet connection';
    this.registerUser = (gamerTag, email, password, usertype) => {
      return new Promise((resolve, reject) => {
        console.log('TEST 01.1---GAMER TAG IN CONTROLLER');
        console.log(gamerTag);
        console.log('TEST 01.2---EMAIL IN CONTROLLER');
        console.log(email);
        console.log('TEST 01.3---PASSWORD IN CONTROLLER');
        console.log(password);
        console.log('TEST 01.4---USER TYPE IN CONTROLLER');
        console.log(usertype);

        axios({
          method: 'POST',
          url: `https://ohyv1x69pg.execute-api.us-west-1.amazonaws.com/dev/user?gamerTag=${gamerTag}&email=${email}&password=${password}&userType=${usertype}`,
          headers: {
            'x-api-key': 'hRKgPbPzQj1YGl1GquotW8mSE9VwNQFN93gfnoDb',
          },
        })
          .then((userRegRes) => {
            if (userRegRes) {
              console.log(
                'TEST 02---REGISTER DATA IN CONTROLLER AFTER SUCCESS',
              );
              console.log(userRegRes);

              resolve(true);
            } else {
              console.log(
                'TEST 03---REGISTER DATA IN CONTROLLER AFTER FAILURE',
              );
              console.log(userRegRes.data);

              if (userRegRes.data.message) {
              } else {
                reject({
                  error: {message: userRegRes.data.customMsg},
                  success: false,
                });
              }
            }
          })
          .catch((err) => {
            console.log('CATCH, AUTH CONTROLLER, ERROR IN REGISTER USER');
            console.log(err);
            switch (err.response.status) {
              case 400:
                reject({
                  error: {message: err.response.data.customMsg},
                  success: false,
                });
                break;
              case 502:
                resolve({
                  error: {message: 'User has registered'},
                  success: true,
                });

                break;
              default:
                reject({error: {message: this.ERROR_INTERNET}, success: false});
                break;
            }
          });
      });
    };

    //To Login User
    this.ERROR_INTERNET = 'Please check your internet connection';
    this.loginUser = (email, password, usertype, attempt = 0) => {
      return new Promise((resolve, reject) => {
        console.log(`>Login Attempt #${attempt}`);
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
            if (userLoginRes.data.email) {
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

              if (userLoginRes.data.message) {
              } else {
                reject({
                  error: {message: userLoginRes.data.customMsg},
                  success: false,
                });
              }
            }
          })
          .catch((err) => {
            console.log('CATCH, AUTH CONTROLLER, ERROR IN LOGIN USER');
            console.log(err);
            switch (err.response.status) {
              case 400:
                reject({
                  error: {message: err.response.data.customMsg},
                  success: false,
                });
                break;
              case 502:
                if (attempt < 2) {
                  this.loginUser(email, password, usertype, attempt + 1)
                    .then((res) => resolve(res))
                    .catch((err) => reject(err));
                } else {
                  reject({
                    error: {message: err.response.data.message},
                    success: false,
                  });
                }
                break;
              default:
                reject({error: {message: this.ERROR_INTERNET}, success: false});
                break;
            }
          });
      });
    };

    //  To Get Player Stats Summary
    this.getPlayerStats = () => {
      return new Promise((resolve, reject) => {
        // console.log('TEST 01---TOKEN IN GET PLAYER STATS CONTROLLER');
        // console.log(tokenValue);
        this.getAuthToken()
          .then((tokenValue) => {
            axios({
              method: 'GET',
              url: `https://ohyv1x69pg.execute-api.us-west-1.amazonaws.com/dev/playerStatsSummary?token=${tokenValue}`,
              headers: {
                'x-api-key': 'hRKgPbPzQj1YGl1GquotW8mSE9VwNQFN93gfnoDb',
              },
            })
              .then((playerStatsRes) => {
                if (playerStatsRes.data) {
                  console.log(
                    'TEST 02---PLAYER STATS IN CONTROLLER AFTER SUCCESS',
                  );
                  console.log(playerStatsRes.data);

                  store.dispatch({
                    type: GET_PLAYER_STATS,
                    payload: playerStatsRes.data,
                  });
                  resolve({success: true});
                } else {
                  console.log(
                    'TEST 03---PLAYER STATS IN CONTROLLER AFTER FAILURE',
                  );
                  console.log(playerStatsRes.data);
                  reject({
                    error: {message: 'Server is currently offline'},
                    success: false,
                  });
                }
              })
              .catch((err) => {
                console.log(
                  'CATCH, AUTH CONTROLLER, ERROR IN GETTING PLAYER STATS',
                );
                console.log(err);
                reject({error: {message: this.ERROR_INTERNET}, success: false});
              });
          })
          .catch((err) => {
            //// logout
            reject({error: {message: err}, success: false});
          });
      });
    };

    //  To Get User Data
    this.getUserData = () => {
      return new Promise((resolve, reject) => {
        // console.log('TEST 01---TOKEN IN GET USER DATA CONTROLLER');
        // console.log(tokenValue);

        this.getAuthToken()
          .then((tokenValue) => {
            axios({
              method: 'GET',
              url: `https://ohyv1x69pg.execute-api.us-west-1.amazonaws.com/dev/userData?token=${tokenValue}`,
              headers: {
                'x-api-key': 'hRKgPbPzQj1YGl1GquotW8mSE9VwNQFN93gfnoDb',
              },
            })
              .then((userData) => {
                if (userData.data) {
                  console.log(
                    'TEST 02---USER DATA IN CONTROLLER AFTER SUCCESS',
                  );
                  console.log(userData.data);

                  store.dispatch({
                    type: GET_USER_DATA,
                    payload: userData.data,
                  });
                  resolve({success: true});
                } else {
                  console.log(
                    'TEST 03---USER DATA IN CONTROLLER AFTER FAILURE',
                  );
                  console.log(userData.data);
                  reject(userData.data);
                }
              })
              .catch((err) => {
                console.log(
                  'CATCH, AUTH CONTROLLER, ERROR IN GETTING USER DATA',
                );
                console.log(err);
                reject({error: {message: this.ERROR_INTERNET}, success: false});
              });
          })
          .catch((err) => {
            //// logout
            reject({error: {message: err}, success: false});
          });
      });
    };
    this.getAuthToken = () => {
      return new Promise((resolve, reject) => {
        AsyncStorage.getItem(TOKEN_ASYNC_STORAGE)
          .then((token) => {
            console.log(
              'TEST 01---TOKEN FOUND FROM ASYNC STORAGE IN HOME SCREEN ENTRY',
            );
            console.log(token);
            if (token !== null) {
              let savedToken = JSON.parse(token);
              console.log(
                'TEST 02---ASYSNC DATA FROM HOME SCREEN (THEN-IF BLOCK)',
              );
              console.log(savedToken);
              resolve(savedToken);
            } else {
              reject('Session Expired');
            }
          })
          .catch((err) => {
            console.log(err);
            reject('Storage not available');
          });
      });
    };
  }
}

const MyAuthController = new AuthController();
export default MyAuthController;
