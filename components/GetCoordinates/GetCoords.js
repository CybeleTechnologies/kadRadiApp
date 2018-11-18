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
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

@withRouter
@connect((state) => {return {
  location: state.userLocation
  }}, mapDispatchToProps)

class GetCoords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      location: '',
    }
  }
  componentWillMount() {
    this.getLocation();
  }
  getLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Location',
          'message': 'Location ' +
                   'so you can take awesome pictures.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.props.locationGrant(true);
            this.props.getCoordsAction(position.coords);
          },
          (error) => this.setState({ error: error.message }),
          { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
        )
      } else {
        this.props.locationGrant(false);
      }
    } catch (err) {
      console.warn(err)
    }
  }

  render() {
    return(
      <View style={{flex:1}}>
      {this.props.children}
      </View>
    )
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default GetCoords;