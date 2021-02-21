import {
  USER_LOGIN,
  GET_PLAYER_STATS,
  GET_USER_DATA,
} from '../../controllers/types';
import {produce} from 'immer';
const state = {
  token: '',
  playerStats: {},
  userData: {},
};

function AuthReducer(mState = {...state}, action) {
  switch (action.type) {
    case USER_LOGIN:
      return produce(mState, (draftState) => {
        draftState.token = action.payload;
        console.log('TOKEN FROM AUTH REDUCER');
        console.log(draftState.token);
      });

    case GET_PLAYER_STATS:
      return produce(mState, (draftState) => {
        action.payload.map((data) => (draftState.playerStats = data));
        console.log('PLAYER STATS FROM AUTH REDUCER');
        console.log(draftState.playerStats);
      });

    case GET_USER_DATA:
      return produce(mState, (draftState) => {
        action.payload.map((data) => (draftState.userData = data));
        console.log('USER DATA FROM AUTH REDUCER');
        console.log(draftState.userData);
      });

    default:
      return {...mState};
  }
}

export default AuthReducer;
