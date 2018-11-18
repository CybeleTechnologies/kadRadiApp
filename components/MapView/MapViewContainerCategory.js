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
import MapView from '../CommonDumb/MapView';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

@withRouter
@connect((state) => {return {
  menuVisible: state.menuVisible,
  userProfile: state.userProfile,
  userLocation: state.userLocation,
  activeButton: state.activeButtonContainer,
  }}, mapDispatchToProps)
@graphql(
    gql` query 
    nearestObjects($lat: Float, $lng: Float, $distance: Float, $categoryId: Int){
      nearestObjects(lat: $lat, lng: $lng, distance: $distance, categoryId: $categoryId) {
        id
        name
        avgRating
        ratingCount
        objectCategory {
          name
        }
        images {
          profileImage {
            fileUrl
            desc
          }
        }
        workingTimeInfo {
          isWorking
        }
        objectLocations {
          address
          city
          zipCode
          lat
          lng
        }
        isWorking
      }
    }`,
    {
      options: (props) => ({
        variables: {
          lat: props.userLocation.locationGranted? props.userLocation.coordinates.latitude : 45.00,
          lng: props.userLocation.locationGranted? props.userLocation.coordinates.longitude : 50.00,
          distance: props.activeButton.nearMe? 0.9 : 3.0,
          categoryId: props.match.params.categoryId,
        }
      })
    }
)
class MapViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markit: [],
    };
  }
  render() {
    const {categoryId} = this.props.match.params;
    const coordinates = this.props.userLocation.coordinates || {};
    if(this.props.activeButton.workingNow) {
      let blacko = this.props.data.nearestObjects || [];
      nearestObjects = blacko.filter((item) => ( item.isWorking === 'true' )); 
     } else {
       nearestObjects = this.props.data.nearestObjects || [];
     }
    return (
      <View
        style={{
          width: '100%',
          height: responsiveHeight(100),
          backgroundColor: '#fff',
        }}
      >
        {
          this.props.data.loading ?
            <Loader /> :
            <MapView
              coordinates={coordinates}
              objectCl={nearestObjects}
            />
        }
      </View>
    );
  }
}

export default MapViewContainer;
