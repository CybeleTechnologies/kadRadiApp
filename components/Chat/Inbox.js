import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
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
  gql` query getInbox($token: String!) {
    getInbox(token: $token){
     channel
     person {
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
     seen 
     message
     name
     time
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
    let getInbox = [];
    getInbox = this.props.data.getInbox || [];
    return(
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        <List containerStyle={{flexDirection: 'column',backgroundColor: "white", borderTopWidth: 0, justifyContent: 'flex-start',marginTop: 0}}>
          {
            getInbox.map((item,key) => (
              <ListItem
                key={key}
                roundAvatar={true}
                avatarOverlayContainerStyle={{
                  borderColor: 'white',
                  borderWidth: 1,
                }}
                avatar={{uri: item.person.profileInfo.profileImageUrl}}
                title={item.person.firstName + ' ' + item.person.lastName}
                chevronColor={'transparent'}
                subtitle={item.message}
                subtitleStyle={
                  item.seen ? {
                    fontWeight: 'bold'
                  } :
                  {
                    fontWeight: '400'
                  }
                }
                rightTitle={item.time}
                titleStyle={style.listItemTitle}
                containerStyle={{borderTopColor: "white", borderBottomColor: "rgb(236, 236, 236)", borderBottomWidth: 0.5}}
                onPress={() => {
                  this.props.chatWith(item.person);
                  this.props.history.push(`/chat/${item.person.id}`);
                }}
              />
            ))
          }
        </List>
      </ScrollView>
      <View style={style.absolute}>
        <TouchableOpacity 
          onPress={() => {
            this.props.history.push('/newChat')
          }}
        >
          <Image 
            source={require('../../imgs/Chatdugme.png')}
            resizeMode={'contain'}
            style={{width: 50, height: 50 }}
          />
        </TouchableOpacity>
      </View>
    </View>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default withRouter(connect((state) => { return {
  userProfile: state.userProfile
}}, mapDispatchToProps)(Inbox));