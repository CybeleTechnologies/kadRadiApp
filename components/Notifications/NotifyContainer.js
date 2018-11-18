import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import NotifyButtons from './NotifyButtons';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { responsiveHeight, responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { withRouter } from 'react-router-dom';
import { ActionCreators } from '../../actions';
import TextFont from 'TextFont';
import ImageForNotify from './ImageForNotify';
import moment from 'moment';
import _ from 'lodash';

@graphql(
  gql`query MojQuery($id: Int, $token: String!) {
    people(id: $id, token: $token) {
      id,
      myRequests {
        id
        firstName
        lastName
        profileInfo {
          profileImageUrl
        }
      }
      channel
    }
    getPublicNotifications(token: $token) {
      notifyJSON,
      error
    }
    getPrivateNotifications(token: $token) {
      notifyJSON,
      error
    }
  }`, 
  {
    options: (props) => ({
      variables: {
        id: props.userProfile.id,
        token: props.userProfile.token
      },
      fetchPolicy: 'network-only',
    })
  } 
)
@graphql(
  gql`mutation acceptFriendRequest($token: String!, $personId: Int!) {
    acceptFriendRequest(token: $token, personId: $personId) {
      success
      error
    }
  }`, 
  {
    name: 'prihvatiZahtev',
  }
)
@graphql(
  gql`mutation declineFriendRequest($token: String!, $personId: Int!) {
    declineFriendRequest(token: $token, personId: $personId) {
      success
      error
    }
  }`, 
  {
    name: 'odbijZahtev',
  }
)
@withRouter
class NotifyContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      me: true,
      friends: false,
      accept: false,
      dontAccept: false,
      niz: [{ id: 0, accept: false}],
      private: [],
      public: [],
    }
  }
  show = (me, friends) => {
    this.setState({
      me,
      friends
    })
  }

  addFriend = async (id) => {
    const {token} = this.props.userProfile;
    let added = await this.props.prihvatiZahtev({
      variables: {
        token: token,
        personId: id,
      }
    });
    if(added.data.acceptFriendRequest.success) {
      let noviAdd = { id: id, accept: true}
      this.setState(previusState => ({
        niz: [...previusState.niz, noviAdd]
      }));
    }
  }

  dontAddFriend = async (id) => {
    const {token} = this.props.userProfile;
    let dont = await this.props.odbijZahtev({
      variables: {
        token: token,
        personId: id,
      }
    });
    if(dont.data.declineFriendRequest.success) {
      let noviDontAdd = { id: id, accept: false}
      this.setState(previusState => ({
        niz: [...previusState.niz, noviDontAdd]
      }));
    }
  }
  checkImageAccept = (id) => {
    let tmp = this.state.niz;
    let filter = tmp.filter((item) => (
      item.id == id && item.accept
    ))
    if (filter.length) {
      return true;
    }
  }
  checkImageDontAccept = (id) => {
    let niz = this.state.niz;
    let find = niz.filter((item) => (
      item.id == id && !item.accept
    ))
    if (find.length) {
      return true;
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (!nextProps.data.loading) {
      let {getPrivateNotifications} = nextProps.data;
      let {getPublicNotifications} = nextProps.data;
      let parse = JSON.parse(getPrivateNotifications.notifyJSON);
      let parsePublic = JSON.parse(getPublicNotifications.notifyJSON);
      let sortedPrivate = _.orderBy(parse, ['date'], ['desc']);
      let sortedPublic = _.orderBy(parsePublic, ['date'], ['desc']);
      this.setState({
        private: sortedPrivate,
        public: sortedPublic,
      })
    }
  }  

  showProfile = () => {
    console.log(1)
  }

  render() {
    let { people } = this.props.data || [];
    let [first] = people || [];
    let {myRequests} = first || [];
    console.log(this.props.viewProfile, "DATAAA AA AA AA")
    return(
      <TouchableOpacity 
        onPress={() => {
           this.props.viewProfile(this.props.data);
           this.props.history.push(`/friendsProf`);
          console.log(1);
        }}
        style={{
          flexDirection: 'column',
          flex:1,
        }}
      >
       <NotifyButtons 
        show={this.show}
        state={this.state}
        />
        {
          this.state.me? 
          <ScrollView style={{flex:1, backgroundColor: 'white'}}>
            {
              myRequests != undefined?
              myRequests.length? myRequests.map((item,k) => (
                <View style={{flexDirection: 'column', borderBottomWidth: 0.5, borderBottomColor: 'gray'}} key={k}>
                  <View style={{flexDirection: 'row', width: '100%', justifyContent: 'flex-start', height: responsiveHeight(13)}}>
                    <View style={{width: "15%", margin: "2.5%", marginTop: 0, marginBottom: 0, height: responsiveHeight(13), justifyContent: 'center', alignItems: 'center'}}>
                      <Image
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 50 / 2,
                        }}
                        source={{uri: item.profileInfo.profileImageUrl}}
                      />
                    </View>
                    <View style={{width: "40%", margin: '2.5%', marginBottom: 0, marginTop: 0, flexDirection: 'row', justifyContent: "flex-start", alignItems: 'center'}}>
                      <TextFont 
                        semiBold 
                        style={{
                          textAlignVertical: 'center',
                          color: 'rgb(102, 102, 102)',
                        }}
                      ><TextFont semiBold style={{color: 'rgb(43, 157, 157)'}}>{item.firstName} {item.lastName}</TextFont> vam je poslao zahtev za prijateljstvo
                      </TextFont>
                    </View>
                    <View style={{flexDirection: 'row', width: '30%', height: responsiveHeight(13), margin: '2.5%', marginTop: 0, marginBottom: 0, justifyContent: 'space-between'}}>
                      {
                        !this.checkImageDontAccept(item.id) ? 
                        <TouchableOpacity 
                          style={{width: '48.75%', justifyContent: 'center', alignContent: 'center'}}
                          onPress={() => {
                            this.addFriend(item.id);
                          }}
                        >
                          <Image
                            source={this.checkImageAccept(item.id) ? require('../../imgs/prijateljdodat.png') : require('../../imgs/nijeAktivnoPrihvati.png')}
                            resizeMode={'center'}
                            style={{width: '100%'}}
                          />
                        </TouchableOpacity>
                        :
                        <View
                          style={{width: "48.75%"}}
                        >
                        </View>
                      }
                      { !this.checkImageAccept(item.id) ?
                        <TouchableOpacity
                          style={{width: '48.75%', justifyContent: 'center', alignContent: 'center'}}
                          onPress={() => {
                            this.dontAddFriend(item.id)
                          }}
                        >
                          <Image
                            source={this.checkImageDontAccept(item.id) ? require('../../imgs/odbijeno.png') : require('../../imgs/nijeAktivnoOdbij.png')}
                            resizeMode={'center'}
                            style={{width: '100%'}}
                          />
                        </TouchableOpacity>
                        :
                        <View
                          style={{width: "48.75%"}}
                        >
                        </View>
                      }
                    </View>
                  </View>
                </View>
              ))
              :
                null
              : null
            }
            {
              this.state.private.length
              ?
              this.state.private.map((item,key) => {
                if (item.name === 'reviewLike') {
                  return (
                    <ReviewItem 
                      key={key}
                      firstName={item.person.firstName}
                      lastName={item.person.lastName}
                      profileImg={item.person.profileImage}
                      date={moment(item.date).format("L")}
                      hours={new Date(item.date).getHours()}
                      minutes={new Date(item.date).getMinutes()}
                      likeType={item.likeType}
                    />
                  );
                }
                if (item.name === 'newFriendshipPrivate') {
                  return (
                    <FriendShipPrivate
                      key={key}
                      firstName={item.person.firstName}
                      lastName={item.person.lastName}
                      profileImg={item.person.profileImage}
                      date={moment(item.date).format("L")}
                      hours={new Date(item.date).getHours()}
                      minutes={new Date(item.date).getMinutes()}
                    />
                  );
                }
                if (item.name === 'answerLike') {
                  return (
                    <AnswerLike
                      key={key}
                      firstName={item.person.firstName}
                      lastName={item.person.lastName}
                      profileImg={item.person.profileImage}
                      date={moment(item.date).format("L")}
                      hours={new Date(item.date).getHours()}
                      minutes={new Date(item.date).getMinutes()}
                      likeType={item.likeType}
                    />
                  );
                }
                if (item.name === 'newLiveAnswer') {
                  return (
                    <LiveAnswer
                      key={key}
                      firstName={item.person.firstName}
                      lastName={item.person.lastName}
                      profileImg={item.person.profileImage}
                      date={moment(item.date).format("L")}
                      hours={new Date(item.date).getHours()}
                      minutes={new Date(item.date).getMinutes()}
                    />
                  );
                }
              })
              :
              null
            }
          </ScrollView>
          :
          <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
            {
              this.state.public.length
              ?
              this.state.public.map((item,key) => {
                if (item.name === 'newFriendshipPublic') {
                  return (
                    <FriendShipPublic
                      key={key}
                      firstName={item.person1.firstName}
                      lastName={item.person1.lastName}
                      profileImg={item.person1.profileImage}
                      firstName2={item.person2.firstName}
                      lastName2={item.person2.lastName}
                      date={moment(item.date).format("L")}
                      hours={new Date(item.date).getHours()}
                      minutes={new Date(item.date).getMinutes()}
                    />
                  );
                }
              })
              :
              null
            }
          </ScrollView>
        } 
      </TouchableOpacity>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default withRouter(connect((state) => {return {
  userProfile: state.userProfile,
  lookAt: state.viewThisProfile,  
}}, mapDispatchToProps)(NotifyContainer));


const ReviewItem = ({ firstName, lastName, profileImg, date, minutes, hours, likeType }) => (
  <View style={{flexDirection: 'column', borderBottomWidth: 0.5, borderBottomColor: 'gray'}}>
    <View style={{flexDirection: 'row', width: '100%', justifyContent: 'flex-start', height: responsiveHeight(13)}}>
      <View style={{width: "15%", margin: "2.5%", marginTop: 0, marginBottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 50 / 2,
          }}
          source={{uri: profileImg}}
        />
      </View>
      <View style={{width: "40%", margin: '2.5%', marginBottom: 0, marginTop: 0, flexDirection: 'row', justifyContent: "flex-start", alignItems: 'center'}}>
        <View style={{flexDirection: 'row', width: '70%', justifyContent: 'center'}}>
          <TextFont 
            semiBold 
            style={{
              textAlignVertical: 'center',
              color: 'rgb(102, 102, 102)',
            }}
          ><TextFont semiBold style={{color: 'rgb(43, 157, 157)'}}>{firstName} {lastName}</TextFont> je ocenio Vaš komentar
          </TextFont>
        </View>
        <View style={{flexDirection: 'row', width: '25%', justifyContent: 'center', margin: '2.5%', alignItems: 'center'}}>
          <Image 
            source={likeType === 1 ? require('../../imgs/superActive.png') : likeType === 2 ? require('../../imgs/thanksActive.png') : require('../../imgs/uselessActive.png')}
            resizeMode={'center'}
          />
        </View>
      </View>
      <View style={{width: "30%", margin: '2.5%', marginBottom: 0, marginTop: 0, flexDirection: 'column', justifyContent: "center", alignItems: 'center'}}>
       <TextFont semiBold style={{color: 'rgb(43, 157, 157)', textAlignVertical: 'center', textAlign: 'center'}}>{date}</TextFont>
       <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
        <TextFont semiBold style={{color: 'rgb(43, 157, 157)', textAlignVertical: 'center', textAlign: 'center'}}>{hours < 10 ? '0' + hours + ':' : hours + ':'}</TextFont>
        <TextFont semiBold style={{color: 'rgb(43, 157, 157)', textAlignVertical: 'center', textAlign: 'center'}}>{minutes < 10 ? '0' + minutes : minutes}</TextFont>
       </View>
      </View>
    </View>
  </View>
);

const AnswerLike = ({ firstName, lastName, profileImg, date, minutes, hours, likeType }) => (
  <View style={{flexDirection: 'column', borderBottomWidth: 0.5, borderBottomColor: 'gray'}}>
    <View style={{flexDirection: 'row', width: '100%', justifyContent: 'flex-start', height: responsiveHeight(13)}}>
      <View style={{width: "15%", margin: "2.5%", marginTop: 0, marginBottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 50 / 2,
          }}
          source={{uri: profileImg}}
        />
      </View>
      <View style={{width: "40%", margin: '2.5%', marginBottom: 0, marginTop: 0, flexDirection: 'row', justifyContent: "flex-start", alignItems: 'center'}}>
        <View style={{flexDirection: 'row', width: '70%', justifyContent: 'center'}}>
          <TextFont 
            semiBold 
            style={{
              textAlignVertical: 'center',
              color: 'rgb(102, 102, 102)',
            }}
          ><TextFont semiBold style={{color: 'rgb(43, 157, 157)'}}>{firstName} {lastName}</TextFont> je ocenio Vaš Live komentar
          </TextFont>
        </View>
        <View style={{flexDirection: 'row', width: '25%', justifyContent: 'center', margin: '2.5%', alignItems: 'center'}}>
          <Image 
            source={likeType === 1 ? require('../../imgs/superActive.png') : likeType === 2 ? require('../../imgs/thanksActive.png') : require('../../imgs/uselessActive.png')}
            resizeMode={'center'}
          />
        </View>
      </View>
      <View style={{width: "30%", margin: '2.5%', marginBottom: 0, marginTop: 0, flexDirection: 'column', justifyContent: "center", alignItems: 'center'}}>
       <TextFont semiBold style={{color: 'rgb(43, 157, 157)', textAlignVertical: 'center', textAlign: 'center'}}>{date}</TextFont>
       <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
        <TextFont semiBold style={{color: 'rgb(43, 157, 157)', textAlignVertical: 'center', textAlign: 'center'}}>{hours < 10 ? '0' + hours + ':' : hours + ':'}</TextFont>
        <TextFont semiBold style={{color: 'rgb(43, 157, 157)', textAlignVertical: 'center', textAlign: 'center'}}>{minutes < 10 ? '0' + minutes : minutes}</TextFont>
       </View>
      </View>
    </View>
  </View>
);

const FriendShipPrivate = ({ firstName, lastName, profileImg, date, minutes, hours}) => (
  <View style={{flexDirection: 'column', borderBottomWidth: 0.5, borderBottomColor: 'gray'}}>
    <View style={{flexDirection: 'row', width: '100%', justifyContent: 'flex-start', height: responsiveHeight(13)}}>
      <View style={{width: "15%", margin: "2.5%", marginTop: 0, marginBottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 50 / 2,
          }}
          source={{uri: profileImg}}
        />
      </View>
      <View style={{width: "40%", margin: '2.5%', marginBottom: 0, marginTop: 0, flexDirection: 'row', justifyContent: "flex-start", alignItems: 'center'}}>
        <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
          <TextFont 
            semiBold 
            style={{
              textAlignVertical: 'center',
              color: 'rgb(102, 102, 102)',
            }}
          ><TextFont semiBold style={{color: 'rgb(43, 157, 157)'}}>{firstName} {lastName}</TextFont> je postao Vaš prijatelj
          </TextFont>
        </View>
      </View>
      <View style={{width: "30%", margin: '2.5%', marginBottom: 0, marginTop: 0, flexDirection: 'column', justifyContent: "center", alignItems: 'center'}}>
       <TextFont semiBold style={{color: 'rgb(43, 157, 157)', textAlignVertical: 'center', textAlign: 'center'}}>{date}</TextFont>
       <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
        <TextFont semiBold style={{color: 'rgb(43, 157, 157)', textAlignVertical: 'center', textAlign: 'center'}}>{hours < 10 ? '0' + hours + ':' : hours + ':'}</TextFont>
        <TextFont semiBold style={{color: 'rgb(43, 157, 157)', textAlignVertical: 'center', textAlign: 'center'}}>{minutes < 10 ? '0' + minutes : minutes}</TextFont>
       </View>
      </View>
    </View>
  </View>
);

const LiveAnswer = ({ firstName, lastName, profileImg, date, minutes, hours}) => (
  <View style={{flexDirection: 'column', borderBottomWidth: 0.5, borderBottomColor: 'gray'}}>
    <View style={{flexDirection: 'row', width: '100%', justifyContent: 'flex-start', height: responsiveHeight(13)}}>
      <View style={{width: "15%", margin: "2.5%", marginTop: 0, marginBottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 50 / 2,
          }}
          source={{uri: profileImg}}
        />
      </View>
      <View style={{width: "40%", margin: '2.5%', marginBottom: 0, marginTop: 0, flexDirection: 'row', justifyContent: "flex-start", alignItems: 'center'}}>
        <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
          <TextFont 
            semiBold 
            style={{
              textAlignVertical: 'center',
              color: 'rgb(102, 102, 102)',
            }}
          ><TextFont semiBold style={{color: 'rgb(43, 157, 157)'}}>{firstName} {lastName}</TextFont> je odgovorio na Vaše Live pitanje
          </TextFont>
        </View>
      </View>
      <View style={{width: "30%", margin: '2.5%', marginBottom: 0, marginTop: 0, flexDirection: 'column', justifyContent: "center", alignItems: 'center'}}>
       <TextFont semiBold style={{color: 'rgb(43, 157, 157)', textAlignVertical: 'center', textAlign: 'center'}}>{date}</TextFont>
       <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
        <TextFont semiBold style={{color: 'rgb(43, 157, 157)', textAlignVertical: 'center', textAlign: 'center'}}>{hours < 10 ? '0' + hours + ':' : hours + ':'}</TextFont>
        <TextFont semiBold style={{color: 'rgb(43, 157, 157)', textAlignVertical: 'center', textAlign: 'center'}}>{minutes < 10 ? '0' + minutes : minutes}</TextFont>
       </View>
      </View>
    </View>
  </View>
);

const FriendShipPublic = ({ firstName, lastName, profileImg, date, minutes, hours, firstName2, lastName2}) => (
  <View style={{flexDirection: 'column', borderBottomWidth: 0.5, borderBottomColor: 'gray'}}>
    <View style={{flexDirection: 'row', width: '100%', justifyContent: 'flex-start', height: responsiveHeight(13)}}>
      <View style={{width: "15%", margin: "2.5%", marginTop: 0, marginBottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 50 / 2,
          }}
          source={{uri: profileImg}}
        />
      </View>
      <View style={{width: "40%", margin: '2.5%', marginBottom: 0, marginTop: 0, flexDirection: 'row', justifyContent: "flex-start", alignItems: 'center'}}>
        <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
          <TextFont 
            semiBold 
            style={{
              textAlignVertical: 'center',
              color: 'rgb(102, 102, 102)',
            }}
          ><TextFont semiBold style={{color: 'rgb(43, 157, 157)'}}>{firstName} {lastName}</TextFont> i <TextFont semiBold style={{color: 'rgb(43, 157, 157)'}}>{firstName2} {lastName2}</TextFont> su postali prijatelji
          </TextFont>
        </View>
      </View>
      <View style={{width: "30%", margin: '2.5%', marginBottom: 0, marginTop: 0, flexDirection: 'column', justifyContent: "center", alignItems: 'center'}}>
       <TextFont semiBold style={{color: 'rgb(43, 157, 157)', textAlignVertical: 'center', textAlign: 'center'}}>{date}</TextFont>
       <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
        <TextFont semiBold style={{color: 'rgb(43, 157, 157)', textAlignVertical: 'center', textAlign: 'center'}}>{hours < 10 ? '0' + hours + ':' : hours + ':'}</TextFont>
        <TextFont semiBold style={{color: 'rgb(43, 157, 157)', textAlignVertical: 'center', textAlign: 'center'}}>{minutes < 10 ? '0' + minutes : minutes}</TextFont>
       </View>
      </View>
    </View>
  </View>
);