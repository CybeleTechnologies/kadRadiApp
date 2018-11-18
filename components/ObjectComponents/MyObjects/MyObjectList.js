import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image,
  ScrollView,
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import TextFont from '../../../TextFont';
import TouchableOpacity from 'TouchableOpacity';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../actions';
import Loader from '../../CommonDumb/Loader';

@withRouter
@connect((state) => {return {
  userProfile: state.userProfile,
  }}, mapDispatchToProps)
@graphql(
  gql` query myObjects($token: String!) {
    myObjects(token: $token){
      id
      name
      ratingCount
      images {
        profileImage {
          fileUrl
        }
      }
      objectCategory {
        name
        nameJ
      }
      objectLocations {
        city
        address
      }
    }
  }`,
  {
    options: ( props ) => ({
      variables: {
        token: props.userProfile.token,
      },
      fetchPolicy: 'network-only',
    })
  }
)

class MyObjectList extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render() {
    let {data} = this.props || [];
    let myObjects = [];
    myObjects = data.myObjects || [];
    return (
      <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
        {
          this.props.data.loading
          ? 
            <Loader />
          :
          myObjects.map((objects, key) => (
        <TouchableOpacity 
          key={key}
          style={{width: responsiveWidth(100), height: responsiveHeight(20)}}
          onPress={() => {
            this.props.history.push(`/my-object-page/${objects.id}`);
          }}>
          <View style={{flexDirection: 'row', width: responsiveWidth(100), height: responsiveHeight(20),justifyContent: 'space-between', borderBottomColor: 'black', borderBottomWidth: 0.5}}>
            <Image 
                source={{uri: objects.images.profileImage.fileUrl}}
                resizeMode={'cover'}
                style={{width: responsiveWidth(40)}}
              />
            <View style={{ width: responsiveWidth(55)}}>
              <View>
                <View style={{flexDirection: 'row',alignItems: 'center'}}>
                  <TextFont style={{ fontSize: 16 }} bold>{objects.name}</TextFont>
                </View>
                <View style={{flexDirection: 'column'}}>
                  <TextFont style={{ fontSize: 13 }}>{objects.ratingCount} Rewievs</TextFont>
                  <TextFont style={{ fontSize: 13 }}>{objects.objectLocations.city} , {objects.objectLocations.address}</TextFont>
                  <TextFont style={{ fontSize: 13 }}>{objects.objectCategory.nameJ}</TextFont>
                </View>
              </View> 
            </View>
          </View>
        </TouchableOpacity>
          ))}
      </ScrollView>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default MyObjectList;
