import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {LARGE} from '../themes/fonts';

class TileComponent extends Component {
  render() {
    return (
      <>
        <View style={styles.viewStyle}>
          <View style={styles.flexStyle}>
            <Text style={{paddingLeft: 10}}>{this.props.name}</Text>
          </View>
          <View style={[styles.flexStyle, {flex: 2, alignItems: 'flex-end'}]}>
            <Text style={{paddingRight: 10}}>{this.props.value}</Text>
          </View>
        </View>
      </>
    );
  }
}

export default TileComponent;

const styles = StyleSheet.create({
  flexStyle: {flex: 1, justifyContent: 'center'},

  viewStyle: {
    minHeight: 35,
    flexDirection: 'row',
    width: '90%',
    backgroundColor: '#F6F6F6',
    borderRadius: 5,
    marginTop: 5,
    alignSelf: 'center',
  },
});
