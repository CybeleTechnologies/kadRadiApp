import React from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import { withRouter } from 'react-router-dom';
import { ActionCreators } from '../../actions';
import { styles } from '../../Styles/Styles';
import ProfileHero from '../DumbComponents/ProfileDumb/ProfileHero';
import ProfileOptions from '../MyProfile/ProfileOptions';
import TextFont from 'TextFont';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexDirection: 'column',
    backgroundColor: 'rgb(243, 243, 242)',
    justifyContent: 'flex-start',
  },
  listContainer: {
    backgroundColor: 'white',
    borderTopWidth: 0,
    marginTop: 0,
  },
  titleStyle: {
    color: 'black',
    fontSize: responsiveFontSize(1.6),
    fontFamily: 'OpenSans-Regular',
  },
  listContainerStyle: {
    borderBottomColor: 'white',
    borderTopColor: 'rgb(236, 236, 236)',
    borderTopWidth: 1,
  },
  listItemTitle: {
    fontSize: responsiveFontSize(2),
    fontFamily: 'OpenSans-Regular',
    color: '#a6a6a6',
  },
  listItemContainer: {
    borderTopColor: 'rgb(236, 236, 236)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(236, 236, 236)',
  },
});

@graphql(
  gql`mutation sendFriendRequest($token: String!, $personId: Int!) {
    sendFriendRequest(token: $token, personId: $personId) {
      success
      error
    }
  }`, 
  {
    name: 'sendRequest',
  }
)

class SearchedProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      send: false,
    }
  }
  sendReq = async () => {
    let { token } = this.props.userProfile;
    let personId = this.props.lookAt.id;
    let muta = await this.props.sendRequest({
      variables: {
        token: token,
        personId: personId,
      }
    })
    if(muta.data.sendFriendRequest.success) {
      let data = this.props.lookAt;
      let friendRequest = 1;
      let replace = {...data, friendRequest};
      this.props.viewProfile(replace); 
    }
  }
  render() {
    return (
      <View style={style.container}>
        <Image
          source={require('../../imgs/pozadinablur.jpg')} 
          style={{
            width: '100%',
            height: responsiveHeight(21),
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            {
              this.props.userProfile.id != this.props.lookAt.id?
            <View style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
              <TouchableOpacity
                disabled={this.props.lookAt.isFriend}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginBottom: responsiveHeight(4),
                  }}
                onPress={() => {
                  this.sendReq()
                }}
              >
              {
                this.props.lookAt.isFriend?
                <Image source={require('../../imgs/prijateljdodat.png')} style={{ width: 35, height: 35 }} />
                :
                <Image source={this.props.lookAt.friendRequest == 0 ? require('../../imgs/dodajprijatelja.png') : this.props.lookAt.friendRequest == 1 ? require('../../imgs/cekanjeprijatelja.png') : require('../../imgs/cekanjeprijatelja.png')} 
                  style={{ width: 35, height: 35 }} 
                />
              }
              </TouchableOpacity>
              <TouchableOpacity 
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginBottom: responsiveHeight(4)
                }}
                onPress={() => {
                  this.props.chatWith(this.props.lookAt);
                  this.props.history.push(`/chat/${this.props.lookAt.id}`);
                }}
              >
                <Image source={require('../../imgs/poruka.png')} style={{ width: 35, height: 35 }} />
              </TouchableOpacity>
            </View>
              :
              <View style={{flex: 1, flexDirection: 'row' }}></View>
            }
            <View style={{ flex: 1 }}>
              <ProfileHero
                profileImg={this.props.lookAt.profileInfo.profileImageUrl} 
                firstName={this.props.lookAt.firstName} 
                lastName={this.props.lookAt.lastName}
                friends
              />
            </View>
            <View style={{ flex: 1 }}>
            </View>
          </View>
        </Image>
        <ProfileOptions friends={this.props.lookAt.friends.length} pictures={this.props.lookAt.profileInfo.photos} cekirana={this.props.lookAt.profileInfo.checkedPlaces} omiljena={this.props.lookAt.profileInfo.favorites}/>
        <View style={style.scrollContainer}>
          <ScrollView>
            <View
              style={{
                flexDirection: 'row',
                height: responsiveHeight(6),
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingLeft: 10,
              }}
            >
              <TextFont
                style={{
                  fontSize: responsiveFontSize(2.3),
                }}
              >
                Aktivnosti
              </TextFont>
            </View>
            <View style={styles.aktivnostiProfil}>
              <TextFont
                style={{
                  fontSize: 14,
                }}
              >
                Nažalost nema nikakvih aktivnosti...
              </TextFont>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default withRouter(connect((state) => {return {
  userProfile: state.userProfile,
  lookAt: state.viewThisProfile,
}}, mapDispatchToProps)(SearchedProfile));