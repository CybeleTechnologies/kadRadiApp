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
  }}, mapDispatchToProps)
@graphql(
  gql` query objectsByName($name: String!) {
    objectsByName(name: $name){
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
    }
  }`,
  {
    options: (props) => ({
      variables: {
        name: props.match.params.searchString,
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
  componentDidMount() {
    this.props.setSearchString(this.props.match.params.searchString);
  }
  render() {
    const coordinates = this.props.userLocation.coordinates || {};
    const {objectsByName} = this.props.data || [];
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
              objectCl={objectsByName}
            />
        }
      </View>
    );
  }
}

export default MapViewContainer;
