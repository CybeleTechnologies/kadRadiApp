/* @flow */
import React from 'react';
import {
  Text,
  View,
  Animated,
  UIManager,
  findNodeHandle,
  NativeMethodsMixin,
  BackHandler,
  AsyncStorage,
  PermissionsAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Orientation from 'react-native-orientation';
import { ActionCreators } from '../actions';
import Home from './MasterDumb/Home';
import Login from './MasterDumb/Login';
type Props = {
  menuVisibileNo: any,
  userProfile: any,
  userId: any,
  userSetToken: any,
  locationGrant: any,
  userLocation: any,
  getCoordsAction: any
}

class MasterComponent extends React.Component<Props> {

  componentWillMount(): void {
    // this.getLocation();
    this.idCheck();
    if(!this.props.recentlySeen.length) {
      this.props.freshStartRecently();
    }
    Orientation.lockToPortrait();
  }

  // getLocation = async () => {
  //   try {
  //     console.log("EVOOO SMO");
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         'title': 'Location',
  //         'message': 'Location ' +
  //                  'so you can take awesome pictures.'
  //       }
  //     )
  //     console.log("JA SAM GRANT ", granted)
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log("JA SAM KULISA ", granted)
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           this.props.locationGrant(true);
  //           this.props.getCoordsAction(position.coords);
  //           console.log("EVOOOO LOKACIJEEE 0m0", position.coords)
  //         },
  //         (error) => this.setState({ error: error.message }),
  //         { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
  //       )
  //     } else {
  //       console.log("NEMAAAA LOKACIJE   ")
  //       this.props.locationGrant(false);
  //     }
  //   } catch (err) {
  //     console.warn(err)
  //   }
  // }

  idCheck = async () => {
    let id = await AsyncStorage.getItem('userId');
    let token = await AsyncStorage.getItem('userToken')
    if(id !== null ) {
      this.props.userId(parseInt(id));
    } 
    if(token) {
      this.props.userSetToken(token);
    }
  }

  render() {
    let {userProfile} = this.props;

    return (
      userProfile.logedIn ?  <Home /> : <Login />
    );
  }
}
function mapDispatchToProps(dispatch: mixed) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(({ menuVisible, userProfile, userLocation, recentlySeen }) => ({
  menuVisible,
  userProfile,
  userLocation,
  recentlySeen,
}), mapDispatchToProps)(MasterComponent);
