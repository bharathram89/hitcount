import React, { Component , useState} from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    Text,
    NativeModules,
    NativeEventEmitter,
    SafeAreaView,
    FlatList,
    ScrollView,
    Button,
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
import { AppRegistry } from "react-native";
// import App from "react-native-ble-manager/example/App"; //<-- simply point to the example js!
// AppRegistry.registerComponent("PhoneSync", () => App);
import { v4 as uuidv4 } from 'uuid';

import BleManager from 'react-native-ble-manager';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

class PhoneSync extends Component { 
  // const [isScanning, setIsScanning] = useState(false);
  peripherals = new Map();
  // const [list, setList] = useState([]);
  isScanning= false;
  
  list=[]; 
  setList(newList){
    this.props.list = newList
  }
  render() {

    return (
      <View style={styles.containerStyle}>
      <StatusBar backgroundColor={PRIMARY_COLOR} barStyle={'dark-content'} />

      {/* Header */}
      <SecureTopNav navigation={this.props.navigation}></SecureTopNav>
 
 
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
           
          <View style={styles.body}>
            
            <View style={{margin: 10}}>
              <Button 
                title={'Scan Bluetooth (' + (this.props.isScanning ? 'on' : 'off') + ')'}
                onPress={() => this.startScan() } 
              />            
            </View>

            <View style={{margin: 10}}>
              <Button title="Retrieve connected peripherals" onPress={() => this.retrieveConnected() } />
            </View>

            
            {(this.list.length == 0) &&
              <View style={{flex:1, margin: 20}}>
                <Text style={{textAlign: 'center'}}>No peripherals</Text>
              </View>
            }      
        <FlatList
            data={this.props.list}
            renderItem={({ item }) => this.renderItem(item) }
            keyExtractor={item => item.id}
          />           
          </View>      
          </ScrollView>     
      </SafeAreaView>
       
            <SecureBottomNav navigation={this.props.navigation}></SecureBottomNav>
      
            </View>
  )}
 
  setIsScanning(val){
    this.props.isScanning = val;
  };
  uuid(){
    let d = new Date().getTime();

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);

      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
  }

   startScan(){
    BleManager.start({showAlert: false});
    
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
          if (result) {
            console.log("Permission is OK");
          } else {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
              if (result) {
                console.log("User accept");
              } else {
                console.log("User refuse");
              }
            });
          }
      });
    }  
    
    bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
    bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan );
    bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
    bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );
    if (!this.props.isScanning) {
      BleManager.scan([], 3, true).then((results) => {
        console.log('Scanning...');
        setIsScanning(true);
      }).catch(err => {
        console.error(err);
      });
    }    
  }

  handleStopScan(){
    console.log('Scan is stopped');
    setIsScanning(false);
  }

  handleDisconnectedPeripheral(data){
    let peripheral = peripherals.get(data.peripheral);
    if (peripheral) {
      peripheral.connected = false;
      peripherals.set(peripheral.id, peripheral);
      setList(Array.from(peripherals.values()));
    }
    console.log('Disconnected from ' + data.peripheral);
  }

  handleUpdateValueForCharacteristic(data){
    console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
  }

  retrieveConnected(){
    BleManager.getConnectedPeripherals([]).then((results) => {
      if (results.length == 0) {
        console.log('No connected peripherals')
      }
      console.log(results);
      for (var i = 0; i < results.length; i++) {
        var peripheral = results[i];
        peripheral.connected = true;
        peripherals.set(peripheral.id, peripheral);
        setList(Array.from(peripherals.values()));
      }
    });
  }

  handleDiscoverPeripheral(peripheral){
    console.log('Got ble peripheral', peripheral);
    if (!peripheral.name) {
      peripheral.name = 'NO NAME';
    }
    peripherals.set(peripheral.id, peripheral);
    setList(Array.from(peripherals.values()));
  }

  testPeripheral  (peripheral) {
    if (peripheral){
      if (peripheral.connected){
        BleManager.disconnect(peripheral.id);
      }else{
        BleManager.connect(peripheral.id).then(() => {
          let p = peripherals.get(peripheral.id);
          if (p) {
            p.connected = true;
            peripherals.set(peripheral.id, p);
            setList(Array.from(peripherals.values()));
          }
          console.log('Connected to ' + peripheral.id);


          setTimeout(() => {

            /* Test read current RSSI value */
            BleManager.retrieveServices(peripheral.id).then((peripheralData) => {
              console.log('Retrieved peripheral services', peripheralData);

              BleManager.readRSSI(peripheral.id).then((rssi) => {
                console.log('Retrieved actual RSSI value', rssi);
                let p = peripherals.get(peripheral.id);
                if (p) {
                  p.rssi = rssi;
                  peripherals.set(peripheral.id, p);
                  setList(Array.from(peripherals.values()));
                }                
              });                                          
            });

            // Test using bleno's pizza example
            // https://github.com/sandeepmistry/bleno/tree/master/examples/pizza
            
            BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
              console.log(peripheralInfo);
              var service = '13333333-3333-3333-3333-333333333337';
              var bakeCharacteristic = '13333333-3333-3333-3333-333333330003';
              var crustCharacteristic = '13333333-3333-3333-3333-333333330001';
              setTimeout(() => {
                BleManager.startNotification(peripheral.id, service, bakeCharacteristic).then(() => {
                  console.log('Started notification on ' + peripheral.id);
                  setTimeout(() => {
                    BleManager.write(peripheral.id, service, crustCharacteristic, [0]).then(() => {
                      console.log('Writed NORMAL crust');
                      BleManager.write(peripheral.id, service, bakeCharacteristic, [1,95]).then(() => {
                        console.log('Writed 351 temperature, the pizza should be BAKED');
                        
                        //var PizzaBakeResult = {
                        //  HALF_BAKED: 0,
                        //  BAKED:      1,
                        //  CRISPY:     2,
                        //  BURNT:      3,
                        //  ON_FIRE:    4
                        //};
                      });
                    });
                  }, 500);
                }).catch((error) => {
                  console.log('Notification error', error);
                });
              }, 200);
            });

            

          }, 900);
        }).catch((error) => {
          console.log('Connection error', error);
        });
      }
    }

  }

   renderItem (item){
    const color = item.connected ? 'green' : '#fff';

    useEffect(() => {
      // BleManager.start({showAlert: false});
  
      // bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
      // bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan );
      // bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
      // bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );
  
      if (Platform.OS === 'android' && Platform.Version >= 23) {
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
            if (result) {
              console.log("Permission is OK");
            } else {
              PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
                if (result) {
                  console.log("User accept");
                } else {
                  console.log("User refuse");
                }
              });
            }
        });
      }  
      
      return (() => {
        console.log('unmount');
        bleManagerEmitter.removeEventListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
        bleManagerEmitter.removeEventListener('BleManagerStopScan', handleStopScan );
        bleManagerEmitter.removeEventListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
        bleManagerEmitter.removeEventListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );
      })
    }, []);
    return (
      <TouchableHighlight onPress={() => testPeripheral(item) }>
        <View style={[styles.row, {backgroundColor: color}]}>
          <Text style={{fontSize: 12, textAlign: 'center', color: '#333333', padding: 10}}>{item.name}</Text>
          <Text style={{fontSize: 10, textAlign: 'center', color: '#333333', padding: 2}}>RSSI: {item.rssi}</Text>
          <Text style={{fontSize: 8, textAlign: 'center', color: '#333333', padding: 2, paddingBottom: 20}}>{item.id}</Text>
        </View>
      </TouchableHighlight>
    );
  }

};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: PRIMARY_COLOR,
  }, 
  containerStyle: {
    backgroundColor: PRIMARY_COLOR,
  }, 
});

export default PhoneSync;