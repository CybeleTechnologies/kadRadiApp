import React from 'react';
import {
  ScrollView,
  View,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { withRouter } from 'react-router-dom';
import BigButton from '../CommonDumb/BigButton';
import TextFont from 'TextFont';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

@withRouter
@connect((state) => {return {
  userProfile: state.userProfile,
  liveActive: state.liveActive,
  locationId: state.locationId,
  }}, mapDispatchToProps)
  @graphql(
    gql`mutation createLiveQuestion($token: String!, $title: String!, $text: String!, $locationId: Int!, $objectCategoryId: Int!) {
      createLiveQuestion(token: $token, title: $title, text: $text, locationId: $locationId, objectCategoryId: $objectCategoryId) {
        id
      }
    }`, 
    {
      name: 'createQuestion',
    }
  )

class LiveQuestion extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      questionTitle : '',
      questionText : '',
    };
  }
  letsMutatesAddQuestion = async () => {
    let mutations = await this.props.createQuestion(
      {
        variables: {
          token: this.props.userProfile.token,
          title: this.state.questionTitle,
          text: this.state.questionText,
          locationId: this.props.locationId.id,
          objectCategoryId: this.props.liveActive.activeId,
        }
      }
    )
    if(mutations) {
      ToastAndroid.show('Uspešno ste postavili pitanje. ', ToastAndroid.LONG);
      this.props.history.goBack();
    } else {
      //Handle if not review sent
    } 
  
  }
  render(){     
    return(
      <View style={{ flex: 6.1, backgroundColor: '#019F9F'}}>
        <ScrollView>
          <View
            style={{
              width: responsiveWidth(100),
              justifyContent: 'center',              
            }}
          >
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}
            >
              <View 
                style={{
                  width: responsiveWidth(80),
                  paddingTop: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <TextFont
                  style={{
                    color: 'white',
                    fontSize: responsiveFontSize(2.4),
                    marginBottom: 5,
                  }}
                >
                  Naslov
                </TextFont>
                <TextInput
                  underlineColorAndroid="transparent"
                  style={{
                    borderColor: 'transparent',
                    borderRadius: 6,
                    paddingTop: 2,
                    paddingBottom: 2,
                    height: responsiveHeight(5),
                    width: responsiveWidth(75),
                    backgroundColor: 'white',
                  }}
                  placeholder="Naslov pitanja: "
                  disableFullscreenUI
                  value={this.state.questionTitle}
                  onChangeText={value => this.setState({
                    questionTitle: value,
                  })}
                />
                </View>
                <View
                  style={{
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
                    placeholder="Napisite pitanje: "
                    numberOfLines={13}
                    onChangeText={textFromInput => this.setState({
                      questionText : textFromInput,
                    })}
                    value={this.state.questionText}
                    editable
                  />
                </View>
                <BigButton
                  title="Postavi pitanje"
                  containerStyle={{
                    borderRadius: 25,
                    width: responsiveWidth(73),
                    marginTop: responsiveHeight(4),
                  }}
                  onAction={() => {
                    ToastAndroid.show('Loading...', ToastAndroid.LONG);
                    if(this.state.questionTitle == "" || this/this.state.questionText === ""){
                      ToastAndroid.show("Sva polja moraju biti popunjena!", ToastAndroid.LONG);
                    }else{
                      this.letsMutatesAddQuestion();
                    }
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </View>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default withRouter(LiveQuestion);
