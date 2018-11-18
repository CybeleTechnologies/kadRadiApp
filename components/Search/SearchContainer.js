import React from 'react';
import {
  View,
  Text
} from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Loader from '../CommonDumb/Loader'
import SearchComponent from '../MasterDumb/HomepageDumb/SearchComponent';
import CategoryContentContainer from '../Categories/CategoryContentContainer';
import TextFont from '../../TextFont';
@connect(state => { return {
  recentlySeen: state.recentlySeen,
  searchedStringProps: state.searchedString,
  sortObjectBy: state.sortObjectBy,
  userProfile: state.userProfile,
  visibleLive: state.liveIsVisible,
  lookAt: state.viewThisProfile,
  }}, mapDispatchToProps)
@withRouter
@graphql(
  gql` query objectsByName($name: String!, $token: String, $byRating: Boolean, $alphabetical: Boolean, $price: Int, $page: Int) {
    objectsByName(name: $name, token: $token, byRating: $byRating, alphabetical: $alphabetical, price: $price, page: $page){
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
        city
        address
      }
    }
    peopleByName(name:$name, token: $token) {
      id
      email
      firstName
      lastName
      profileInfo {
        profileImageUrl
        photos
        checkedPlaces
        favorites
      }
      friends {
        id
      }
      isFriend
      friendRequest
    }
  }`,
  {
    options: ( props ) => ({
      variables: {
        name: props.searchedStringProps.string || '',
        token: props.userProfile.token,
        byRating: props.sortObjectBy.rating,
        alphabetical: props.sortObjectBy.abc,
        price: props.sortObjectBy.price,
        page: 1
      },
      fetchPolicy: 'network-only'
    })
  }
)

class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchMe: 'idemoo',
      newSearched: [],
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.searchedStringProps != '') {
      const query = async () => {
        let newItem = await this.props.data.refetch(
          {
            name: nextProps.searchedStringProps.string,
            token: this.props.userProfile.token,
            byRating: this.props.sortObjectBy.rating,
            alphabetical: this.props.sortObjectBy.abc,
            price: this.props.sortObjectBy.price,
            page: 1
          }
        );
      }
    }
  }
  render() {
    let {data} = this.props || [];
    let {objectsByName} = data || [];
    return (
      !this.props.visibleLive.open?
      <View style={{flex:1,}}>
        <View>
        <SearchComponent
          containerStyle={{
            backgroundColor: 'rgba(0,0,0,0)',
            borderTopWidth: 0,
            borderTopColor: 'rgba(0,0,0,0)',
            borderBottomWidth: 0,
            borderBottomColor: 'rgba(0,0,0,0)',
            marginTop: responsiveHeight(-2)
          }}
          />
        </View>
        <View style={{flex: 1, marginTop: responsiveHeight(-7), zIndex: -1}}>
          <CategoryContentContainer 
            data={data}
            goToMap={() => this.props.history.push(`/map-view-search/${this.props.searchedStringProps.string}`)} 
            search
            {...this.props}
            />
        </View>
      </View>
      :
      null
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default SearchContainer;