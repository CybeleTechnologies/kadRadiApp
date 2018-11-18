import React from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet
} from 'react-native';
import { ButtonGroup, Avatar } from 'react-native-elements';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Hero from 'react-native-hero';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import SearchComponent from './HomepageDumb/SearchComponent';
import HeroComponent from './HomepageDumb/HeroComponent';
import CategoryContainer from './HomepageDumb/CategoryContainer';
import CarouselContainer from './HomepageDumb/CarouselContainer';
import FooterContainer from '../CommonDumb/FooterContainer';
import MapView from 'react-native-maps';
type State = {
  width: number,
  height: number,
}

@withRouter
@connect((state) => {return {
  menuVisible: state.menuVisible,
  userProfile: state.userProfile,
  }}, mapDispatchToProps)
@graphql(
  gql` query people($id: Int) {
    people(id: $id){
      email
      firstName
      lastName
      token
      profileInfo {
        profileImageUrl
        photos
        checkedPlaces
        favorites
      }
      friends {
        id,
        firstName,
        lastName,
        profileInfo {
          profileImageUrl,
          checkedPlaces
          favorites
        }
        email
      }
    }
  }`,
  {
    options: (props) => ({
      variables: {
        id: props.userProfile.id,
      },
      fetchPolicy: 'network-only'
    })
  }
)
class Home extends React.Component<State> {
  componentWillReceiveProps(nextProps) {
    if(nextProps.data.people) {
      if(nextProps.userProfile.firstName == undefined){
        let {people} = nextProps.data;
        if(people.length != 0) {
          let [first] = people;
          this.props.userId(parseInt(nextProps.userProfile.id), first.firstName, first.lastName, first.profileInfo.profileImageUrl, first.token, first.email, first.friends, first.profileInfo.photos, first.profileInfo.checkedPlaces, first.profileInfo.favorites);
        }
      }
    }
  }
  render() {
    return (
      <ScrollView style={{flex:1,backgroundColor: 'white', width: responsiveWidth(100)}}>
        <HeroComponent key={1}/>
        <View key={2} style={{width: responsiveWidth(100), marginTop: -40, flexDirection: 'column'}}>
          <SearchComponent home />
          <CategoryContainer />
          <CarouselContainer />
        </View>
      </ScrollView>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default Home;
