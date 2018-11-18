import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import CategoryContentContainer from './CategoryContentContainer';
import Loader from '../CommonDumb/Loader';
import _ from 'lodash';
type State = {
  width: number,
  height: number,
}

@withRouter
@connect((state) => {return {
  userProfile: state.userProfile,
  location: state.userLocation,
  activeButton: state.activeButtonContainer,
  }}, mapDispatchToProps)
@graphql(
  gql` query objectCl($lat: Float, $lng: Float, $distance: Float, $categoryId: Int) {
    nearestObjects(lat: $lat, lng: $lng, distance: $distance, categoryId: $categoryId) {
          id
          name
          avgRating
          ratingCount
          avgPrice
          
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
            city
            address
          }
          checkedIn {
            isCheckedIn
          }
          isWorking
          checkedInCount
        }
  }`,
  {
    options: ( props ) => ({
      variables: {
        lat: props.location.locationGranted? props.location.coordinates.latitude : 45.00,
        lng: props.location.locationGranted? props.location.coordinates.longitude : 50.00,
        distance: props.activeButton.nearMe? 0.9 : 3.0,
        categoryId: props.match.params.categoryId,
      },
      fetchPolicy: 'network-only'
    })
  },
)

class CategoryContainer extends React.Component<State> {
  constructor(props) {
    super(props);
    this.state = {
      language: 'js',
      list: [
      ],
      data : {
      nearestObjects: [],
      },
    }
  }
  render() {
    let {data} = this.props || [];
    return (
      this.props.data.loading ?
        <Loader />
        :
        this.props.activeButton.nearMe?
        <CategoryContentContainer 
          data={data}
          goToMap={() => this.props.history.push(`/maps-view-nearMe/${this.props.match.params.categoryId}`)}
          {...this.props} 
        />
        :
        <CategoryContentContainer 
          data={data}
          goToMap={() => this.props.history.push(`/maps-view/${this.props.match.params.categoryId}`)}
          {...this.props} 
        />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default CategoryContainer;

