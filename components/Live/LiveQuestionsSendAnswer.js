import React, { Component } from 'react';
import { 
  View,
  Text,
  TextInput,
  ToastAndroid,
} from 'react-native';
import TextFont from 'TextFont';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import BigButton from '../CommonDumb/BigButton';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

@connect((state) => {return {
  userProfile: state.userProfile,
  }}, mapDispatchToProps)

@graphql(
  gql`mutation createLiveAnswer($token: String!, $text: String!, $liveQuestionId: Int!) {
    createLiveAnswer(token: $token, text: $text, liveQuestionId: $liveQuestionId) {
      id
    }
  }`, 
  {
    name: 'createAnswers',
  }
)
class LiveQuestionsSendAnswer extends Component {
  constructor(props){
    super(props);
    this.state = {
      questionText : ""
    }
  }
  letsMutates = async () => {
    let mutations = await this.props.createAnswers(
      {
        variables: {
          token: this.props.userProfile.token,
          text: this.state.questionText,
          liveQuestionId: this.props.match.params.sendAnswersId,
        }
      }
    )
    if(mutations) {
      ToastAndroid.show('Uspešno ste postavili odgovor. ', ToastAndroid.LONG);
      this.props.history.goBack();
    } else {
      //Handle if not review sent
    } 
  }

  render() {
    return (
      <View style={{backgroundColor: 'white', flex: 1}}>
        <View style={{
          width: responsiveWidth(90),
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <TextFont
            style={{
              color: 'white',
              fontSize: responsiveFontSize(2.4),
              marginBottom: 5,
              marginTop: 15,
            }}
          >
            Pitanje
          </TextFont>
          <TextInput
            style={{
              width: responsiveWidth(90),
              height: responsiveHeight(35),
              borderRadius: 10,
              textAlignVertical: 'top',
              backgroundColor: '#fff',
            }}
            multiline
            placeholder="Piši ovde..."
            numberOfLines={13}
            value={this.state.questionText}
            onChangeText={textFromInput => this.setState({
              questionText: textFromInput
            })}
            value={this.state.questionText}
            editable
          />
        </View>
        <BigButton
          title="Posalji odgovor"
          onAction={() => {
            this.letsMutates();
          }}
        />
      </View>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default LiveQuestionsSendAnswer;
