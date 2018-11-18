import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import { withRouter } from 'react-router-dom';
import Pusher from 'pusher-js/react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import { ActionCreators } from '../../actions';
import ChatItem from './ChatItem';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import moment from 'moment';
@graphql(
  gql` query initiateChat($token: String!, $personId: Int!) {
    initiateChat(token: $token, personId: $personId){
     channel
    }
  }`,
  {
    options: ( props ) => ({
      variables: {
        token: props.userProfile.token,
        personId: parseInt(props.match.params.id),
      },
      fetchPolicy: 'network-only'
    })
  }
)
@graphql(
  gql`mutation sendMessage($token: String!, $channel: String!, $message: String!, $time: String!) {
    sendMessage(token: $token, channel: $channel, message: $message, time: $time) {
      success
      error
    }
  }`, 
  {
    name: 'posaljiPoruku',
  }
)
@graphql(
  gql`mutation getMessages($token: String!, $channel: String!) {
    getMessages(token: $token, channel: $channel) {
      id
      name
      message
      time
    }
  }`, 
  {
    name: 'dajPoruke',
  }
)
@graphql(
  gql`mutation deactivateChannel($token: String!, $channel: String!) {
    deactivateChannel(token: $token, channel: $channel) {
      success
      error
    }
  }`, 
  {
    name: 'ugasiChannel',
  }
)

class ChatContainer extends React.Component {
  state = {
    message: '',
    name: '',
    messages: [],
    channel: '',
  }
  constructor(props) {
    super(props);
    this.available_drivers_channel = null;
    this.ride_channel = null;
    this.pusher = null;
  }

  createChanel = (channeling) => {
    this.pusher = new Pusher('dcfcc7d284785d280313', {
      cluster: 'eu',
      encrypted: true,
    });
    var channel = this.pusher.subscribe(channeling);
    console.ignoredYellowBox = [
      'Setting a timer'
    ];
    channel.bind('sendMessage', (data) => {
      if(data.id !== this.props.userProfile.id) {
        this.setState({
          messages: [...this.state.messages, {
            message: data.message,
            name: data.name,
            id: data.id,
            time: data.time,
          }]
        });
      }
    });
  }
 async componentWillReceiveProps(nextProps) {
    if (!nextProps.data.loading) {
      const { initiateChat } = nextProps.data;
      this.createChanel(initiateChat.channel);
      let ree = await this.props.dajPoruke({
        variables: {
          token: this.props.userProfile.token,
          channel: initiateChat.channel,
        }
      });
      this.setState({
        messages: ree.data.getMessages,
        channel: initiateChat.channel,
      });
    }
  }  
  createTriger = async () => {
    if( this.state.message !== '') {
      let message = this.state.message;
      this.setState({
        message: '',
      })
      const { firstName, lastName, id } = this.props.userProfile;
      const name = firstName + ' ' + lastName;
      const { token } = this.props.userProfile;
      const now = moment(new Date()).format('HH:mm');
      this.setState({
        messages: [...this.state.messages, {
          message: message,
          name: name,
          id: id,
          time: now,
        }]
      })
      let muta = await this.props.posaljiPoruku({
        variables: {
          token: token,
          channel: this.state.channel,
          message: message,
          time: now,
        }
      });
    }
  }
  async componentWillUnmount() {
    const { token } = this.props.userProfile;
    const unchannel = this.pusher.unsubscribe(this.state.channel);
    const idemo = await this.props.ugasiChannel({
      variables: {
        token: token,
        channel: this.state.channel,
      }
    });
  }
  render() {
    let { messages } = this.state || [];
    return (
      <KeyboardAvoidingView style={{flex: 1}} keyboardVerticalOffset={100}>
        <ScrollView 
          style={{
            width: '100%',
            height: responsiveHeight(90),
            backgroundColor: '#f2f2f2'
            }}
          ref="scrollView"
          onContentSizeChange={(width,height) => this.refs.scrollView.scrollToEnd({animated: true})}
        >
            {
              messages.length ? messages.map((item, key) => {
              if(item.id === this.props.userProfile.id) {
                return (
                  <View style={{ flex: 1, flexDirection: 'row', marginBottom: 13 }} key={key}>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', flex: item.message.length > 15 ? 3.5 : 6.5}}>
                    <Text style={{ textAlignVertical: 'center', textAlign: 'right'}}>{item.time}</Text>
                    </View>
                    <View style={{ flexDirection: 'column', flex: item.message.length > 15 ? 6.5 : 3.5}}>
                      <ChatItem chatName={item.name} chatMessage={item.message} me/>
                    </View>
                  </View>
                );
              } else {
                return (
                  <View style={{flex: 1, flexDirection: 'row', marginBottom: 13}} key={key}>
                    <View style={{ flexDirection: 'column', flex: item.message.length > 15 ? 6.5 : 3.5}}>
                      <ChatItem chatName={item.name} chatMessage={item.message} />
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', flex: item.message.length > 15 ? 3.5 : 6.5}}>
                    <Text style={{ textAlignVertical: 'center', textAlign: 'left'}}>{item.time}</Text>
                    </View>
                  </View>
                );
              }
              }) : null
            }
        </ScrollView>
        <View style={{ width: '100%', height: responsiveHeight(10), backgroundColor: '#019f9f', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <TextInput
              placeholder="Piši ovde..."
              value={this.state.message}
              style={{
                borderWidth: 1,
                borderRadius: 20,
                borderColor: '#019f9f',
                backgroundColor: 'white',
                width: '85%',
                height: 40,
              }}
              underlineColorAndroid={'transparent'}
              multiline={true}
              onChangeText={(val) => {
                this.setState({
                  message: val,
                })
              }}
            />
            <TouchableOpacity
              style={{ width: '15%',justifyContent: 'center', alignItems: 'stretch'}}
              onPress={() => {
                this.createTriger();
              }}>
                <Image 
                  source={require('../../imgs/posalji.png')}
                  resizeMode={'contain'}
                  style={{width: '100%', height: 50}}
                  />
            </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default withRouter(connect((state) => { return {
  userProfile: state.userProfile
}}, mapDispatchToProps)(ChatContainer));
