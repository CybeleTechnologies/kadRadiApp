import React from 'react';
import { View } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';
import Loader from '../CommonDumb/Loader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import MapView, { Marker } from 'react-native-maps';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
@connect((state) => {return {
  userLocation: state.userLocation,
  }}, mapDispatchToProps)
@withRouter
class MapViewFindMe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markit: [],
    };
  }
  render() {
    const coordinates = this.props.userLocation.coordinates || {};
    return (
      <View
        style={{
          width: '100%',
          height: responsiveHeight(100),
          backgroundColor: '#fff',
        }}
      >
        <MapView
            style={{width: '100%', height: responsiveHeight(100),}}
            provider="google"
            showsUserLocation={true}
            showsMyLocationButton={true}
            showsCompass={true}
            followsUserLocation={true}
            loadingEnabled={true}
            toolbarEnabled={true}
            zoomEnabled={true}
            scrollEnabled={true}
            rotateEnabled={true}
            initialRegion={{
              latitude: coordinates.latitude || 44.787197,
              longitude: coordinates.longitude || 20.457273,
              latitudeDelta: 0.215,
              longitudeDelta: 0.215,
            }}
            >
            <Marker
              coordinate={{
                latitude: parseFloat(this.props.match.params.lat),
                longitude: parseFloat(this.props.match.params.lng),
              }}
              description={this.props.match.params.address}
              title={this.props.match.params.name}
            />
          </MapView>
      </View>
    );
  }
}

export default MapViewFindMe;