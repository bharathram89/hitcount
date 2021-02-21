import {BLACK_COLOR, WHITE_COLOR, PRIMARY_COLOR} from '../../themes/colors';
import {EXTRA_LARGE, SMALL} from '../../themes/fonts';
import {StyleSheet} from 'react-native';
 
const Styles = StyleSheet.create({
  
  containerStyle: {
    flex: 1, 
    backgroundColor:  PRIMARY_COLOR,
    justifyContent: 'center',
  }, 
  logoViewStyle: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageTitleTextStyle: {
    color: BLACK_COLOR,
    fontSize: EXTRA_LARGE,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Styles;
