import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import { ActionCreators } from '../../actions';
import { List, ListItem } from 'react-native-elements';
const style = StyleSheet.create({
  listItemTitle: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: '#a6a6a6',
  },
  absolute: {
    position: 'absolute',
    right: '3%',
    bottom: 10,
  }
})

@graphql(
  gql` query myFriends($token: String!) {
    myFriends(token: $token){
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
    }
  }`,
  {
    options: ( props ) => ({
      variables: {
        token: props.userProfile.token,
      },
      fetchPolicy: 'network-only'
    })
  }
)
class Inbox extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let myFriends = [];
    myFriends = this.props.data.myFriends || [];
    return(
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        <List containerStyle={{flexDirection: 'column',backgroundColor: "white", borderTopWidth: 0, justifyContent: 'flex-start',marginTop: 0}}>
          {
            myFriends.map((item,key) => (
              <ListItem
                key={key}
                roundAvatar={true}
                avatarOverlayContainerStyle={{
                  borderColor: 'white',
                  borderWidth: 1,
                }}
                avatar={{uri: item.profileInfo.profileImageUrl}}
                title={item.firstName + ' ' + item.lastName}
                chevronColor={'transparent'}
                subtitle={item.message}
                rightTitle={item.time}
                titleStyle={style.listItemTitle}
                containerStyle={{borderTopColor: "white", borderBottomColor: "rgb(236, 236, 236)", borderBottomWidth: 0.5}}
                onPress={() => {
                  this.props.chatWith(item);
                  this.props.history.push(`/chat/${item.id}`);
                }}
              />
            ))
          }
        </List>
      </ScrollView>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default withRouter(connect((state) => { return {
  userProfile: state.userProfile
}}, mapDispatchToProps)(Inbox));