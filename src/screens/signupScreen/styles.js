import {BLACK_COLOR, WHITE_COLOR} from '../../themes/colors';
import {EXTRA_LARGE, SMALL} from '../../themes/fonts';
import {StyleSheet} from 'react-native';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: WHITE_COLOR,
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
  flexStyle: {
    flex: 1,
  },
});

export default Styles;
