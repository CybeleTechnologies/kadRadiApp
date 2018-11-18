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
  recentlySeen: state.recentlySeen,
  userLocation: state.userLocation,
  }}, mapDispatchToProps)
  @graphql(
    gql` query objectArray($ids: [Int]) {
      objectArray(ids: $ids){
        id
        name
        avgRating
        ratingCount
        objectCategory {
          name
        }
        workingTimeInfo {
          isWorking
        }
        images {
          profileImage {
            fileUrl
            desc
          }
        }
        objectLocations {
          address
          city
          zipCode
          lat
          lng
        }  
      }
    }`,
    {
      options: (props) => { 
        return ({
          variables: {
            ids: props.recentlySeen.ids,
          }
        });
      }
    }
  )
class MapViewContainerRecently extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markit: [],
    };
  }
render() {
    const coordinates = this.props.userLocation.coordinates || {};
    const { objectArray } = this.props.data || [];
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
              objectCl={objectArray}
            />
        }
      </View>
    );
  }
}

export default MapViewContainerRecently;
