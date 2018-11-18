import React, { Component } from 'react';
import {
  View,
  Text,
  List,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import TextFont from 'TextFont';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import BigButton from '../CommonDumb/BigButton';
import Reviews from '../ObjectComponents/ObjectButtonGroupContainer/InformationDumb/Reviews';
import LiveQuestionDetailAnswers from './LiveQuestionDetailAnswers';
import Row, { Button } from 'react-native-elements';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import moment from 'moment';
import Loader from '../CommonDumb/Loader';

@withRouter
@connect((state) => {return {
  userProfile: state.userProfile,
  liveActive: state.liveActive,
  }}, mapDispatchToProps)
@graphql(
  gql` query liveQuestions($id: Int, $token: String) {
    liveQuestions(id: $id, token: $token){
      id
      title
      text
      date
      answered
      answers{
        id
        text
        isAnswer
        likes{
          super
          hvala
          beskorisno
          myLike
        }
        person{
          firstName
          lastName 
          profileInfo{
            profileImageUrl
            followers
            stars
            photos
          }
        }
      }
      person{
        firstName
        lastName
        id
        profileInfo{
          profileImageUrl
        }
      }
    }
  }`,
  {
    options: ( props ) => ({
      variables: {
        id: props.match.params.subjectQuestion,
        token: props.userProfile.token
      }
    }),
    fetchPolicy: 'network-only'
  }
)
@graphql(
  gql`mutation markAsAnswer($token: String!, $liveAnswerId: Int!) {
    markAsAnswer(token: $token, liveAnswerId: $liveAnswerId) {
      success
      error
    }
  }`, 
  {
    name: 'markAsAnswer',
  }
)
@graphql(
  gql`mutation isNotAnswer($token: String!, $liveAnswerId: Int!) {
    isNotAnswer(token: $token, liveAnswerId: $liveAnswerId) {
      success
      error
    }
  }`, 
  {
    name: 'isNotAnswer',
  }
)
@graphql(
  gql`mutation updateQuestion($token: String!, $questionId: Int!, $title: String! $text: String!) {
    updateQuestion(token: $token, questionId: $questionId, title: $title, text: $text) {
      success,
      error
    }
  }`, 
  {
    name: 'editQuestion',
  }
)


class LiveQuestionDetail extends Component {
  constructor(props) {
    super(props);
    proba = this.props.match.params;
    this.state = {
      isEditableOn: false,
      isAnswered: false,
      editQuestionTitle: '',
      oldQuestionTitle: '',
      editQuestionText: '',
      oldQuestionText: '',
      id: 0,
      questionTitleFlag: false,
      questionTextFlag: false,
      
    }
  }
  showEdit = () => {
    this.setState({
      isEditableOn: true,
    });
  }
  hideEdit = () => {
    this.setState({
      isEditableOn: false,
    });
  }
  editQuestionTitle = (newValue) => {
    let newQuestionTitle = newValue;
    if(newQuestionTitle === this.state.oldQuestionTitle || newQuestionTitle === ""){
      this.setState({
        questionTitleFlag: false,
      })
    }else{
      this.setState({
        editQuestionTitle: newQuestionTitle,
        questionTitleFlag: true,
      })
    }
  }
  editQuestionText = (newText) => {
    let newQuestionText = newText;
    if(newQuestionText === this.state.oldQuestionText || newQuestionText === ""){
      this.setState({
        questionTextFlag: false,
      })
    }else{
      this.setState({
        editQuestionText: newQuestionText,
        questionTextFlag: true,
      })
    }
  }
  letsMutate = async (id) => {
    console.log("OVO JE TAJ ID: ", this.state.id);
    let mutation = await this.props.editQuestion(
      {
        variables: {
          token: this.props.userProfile.token,
          questionId: id,
          title: this.state.editQuestionTitle,
          text: this.state.editQuestionText,
        }
      }
    )
    if(mutation) {
      await this.props.data.refetch();
      ToastAndroid.show("Uspešno ste promenili pitanje.", ToastAndroid.LONG);
      this.hideEdit();    
    } else {
      //Handle if not review sent
      console.log('Nije prolsa mutacija konju nauci da programiras');
    }
  }
  componentWillMount(){
    console.log("DA PRObamo ", this.props.data);
  }

  componentWillReceiveProps(nextProps) {

    console.log("OvO JE DRUGA PRObA: ", this.props.data);

    let [current] = this.props.data.liveQuestions || [{ id: "" }];
    let [nextVal] = nextProps.data.liveQuestions || [{ id: "" }];

    if (current.id != nextVal.id) {
      console.log(nextVal.title);
      this.setState({
        editQuestionText: nextVal.text,
        oldQuestionText: nextVal.text,
        editQuestionTitle: nextVal.title,
        editQuestionTitle: nextVal.title,
        isAnswered: nextVal.answered,
        id: nextVal.id,
      });
    }
  }
  drugaMutacije = async (id) => {
    this.setState({
      isAnswered: false,
    })
    let mutation = await this.props.isNotAnswer(
      {
        variables: {
          token: this.props.userProfile.token,
          liveAnswerId: id,
        }
      }
    )
    if(mutation) {
      console.log(mutation);
      ToastAndroid.show("Ovo ipak nije odgovor", ToastAndroid.LONG);
      await this.props.data.refetch({
        id: this.props.match.params.subjectQuestion
      });
    } else {
      //Handle if not review sent
      console.log();
    }
  }
  prvaMutacija = async (id) => {
    console.log("CEKIRAN ID", id);
    this.setState({
      isAnswered: true,
    })
    let mutation = await this.props.markAsAnswer(
      {
        variables: {
          token: this.props.userProfile.token,
          liveAnswerId: id,
        }
      }
    )
    if(mutation) {
      console.log(mutation);
      ToastAndroid.show("Oznacili ste ovo kao odgovor", ToastAndroid.LONG);
      this.props.data.refetch();
    } else {
      //Handle if not review sent
      console.log("ERRRORRRR");
    } 
  }
  render() { 
    let {data} = this.props || [];
    let {liveQuestions} = data || [];
    console.log("LIVE QUESTIONS: ", liveQuestions);
    
    let isMyQuestion = questionId => {
      myId = this.props.userProfile.id;
      if(myId === questionId){
        return true;
      }else{
        return false;
      }
    }

    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
       { this.props.data.loading ? (
          <View>
            <Loader />
          </View>
        ) : (
        <View>
          {
            liveQuestions.map((questionDetail, key) => (
        <View key={key}>
        <Image
          source={require('../../imgs/pozadinablur.jpg')}
          style={{
            display: 'flex',
            width: responsiveWidth(100),
            height: responsiveHeight(40),
            justifyContent: 'flex-start',
            flexDirection: 'column',
            alignItems: 'center',
            alignContent: 'center',
          }}
        > 
            <View>
            {
            !this.state.isEditableOn ? 
            <View>
            <View style={{ padding: 15, justifyContent: 'center', flexDirection: 'column', alignItems: 'center', alignContent: 'center' }}>
            <Image
              source={{uri: questionDetail.person.profileInfo.profileImageUrl}}
              style={{
                width: 80,
                height: 80,
                borderRadius: 75,
              }}
            />
            <TextFont style={{ color: '#fff' }}>{questionDetail.person.firstName} {questionDetail.person.lastName}</TextFont>
            <TextFont style={{ color: '#fff' }}>Beograd</TextFont>
          </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
              <View style={{ flexDirection: "row", width: 275}}>
                <TextFont style={{ marginLeft: 10, paddingTop: 5, color: '#019F9F', textAlign: 'center', fontSize: 14, width: 250 }}>{questionDetail.title}</TextFont>
                {
                  isMyQuestion(questionDetail.person.id) ?
                <TouchableOpacity 
                  style={{backgroundColor: "#019F9F", borderRadius: 75, width: 25, height: 25, alignContent: 'center', alignItems: 'center', justifyContent: 'center'}} 
                  onPress={() => {
                    this.showEdit();
                  }}
                >
                  <Image 
                    source={require('../../imgs/edit.png')}
                    style={{width: 10, height: 10}}
                  />
                </TouchableOpacity>
                  :
                  null
                }
              </View>
              <TextFont style={{padding: 5, width: 250, color: '#fff', textAlign: 'center',}}>{questionDetail.text}</TextFont>
              <TextFont style={{ padding: 5, color: '#fff', textAlign: 'center' }}>{moment(questionDetail.date).format("L")}</TextFont>
            </View>
            </View>   
             :  
             <View style={{flexDirection: 'row'}}>
             <View style={{justifyContent: 'center', flexDirection: 'column', alignItems: 'center', alignContent: 'center', width: 70 }}>
             <Image
               source={{uri: questionDetail.person.profileInfo.profileImageUrl}}
               style={{
                 width: 30,
                 height: 30,
                 borderRadius: 75,
               }}
             />
             <TextFont style={{ color: '#fff' }}>{questionDetail.person.firstName} {questionDetail.person.lastName}</TextFont>
             <TextFont style={{ color: '#fff' }}>Beograd</TextFont>
           </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', marginTop: 40 }}>
              <TextInput 
                style={{ 
                  color: 'blue', textAlign: 'center', fontSize: 14, borderWidth: 1, borderColor: "#fff", width: 250, height: 40, borderRadius: 5 
                }} 
                value={this.state.editQuestionTitle}
                onChangeText={textFromInput => this.editQuestionTitle(textFromInput)}
              /> 
              <TextInput 
                style={{ marginTop: 5, color: '#fff', textAlign: 'center', fontSize: 14, borderWidth: 1, borderColor: "#fff", width: 250, height: 110, borderRadius: 5 }} 
                multiline={true}
                value={this.state.editQuestionText}
                onChangeText={text => this.editQuestionText(text)}
              />               
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={{margin: 5, backgroundColor: "green", borderRadius: 75, width: 40, height: 40, alignContent: 'center', alignItems: 'center', justifyContent: 'center'}} 
                  onPress={()=>{
                    if(this.state.questionTextFlag || this.state.questionTitleFlag){
                      this.letsMutate(this.state.id);
                    }else{
                      ToastAndroid.show("Nema izmena!!", ToastAndroid.LONG);
                    }
                  }}                  
                >
                  <Image 
                    source={require('../../imgs/checked.png')}
                    style={{width: 40, height: 40}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{margin: 5, backgroundColor: "red", borderRadius: 75, width: 40, height: 40, alignContent: 'center', alignItems: 'center', justifyContent: 'center'}} 
                  onPress={()=>{
                    console.log('Pitanje nije editovano');
                    this.hideEdit();
                  }}                  
                >
                  <Image 
                    source={require('../../imgs/edit.png')}
                    style={{width: 20, height: 20}}
                  />
                </TouchableOpacity>
              </View>
            </View>  
            </View> 
          }                                   
          </View>
          
          
        </Image>
        <View style={{flexDirection: 'row', padding: 10 }}>
          <Image
            source={
              this.state.isAnswered ?
                require('../../imgs/LiveIsAnswered.png')
              :
                require('../../imgs/LiveNotAnswered.png')
              }
            style={{
              width: 30,
              height: 30,
            }}
          />
          {
            this.state.isAnswered ?
              <TextFont style={{marginTop: 8, marginLeft: 5, color: "#46CB59" }}>Odgovor je dobijen</TextFont>
            :
              <TextFont style={{marginTop: 8, marginLeft: 5, color: "#FEA832" }}>Ceka se odgovor</TextFont>
          }
          
        </View>
        <View style={{height: 40, flexDirection: 'column', alignContent: 'center', backgroundColor: '#f5f5f5', justifyContent: 'center'}}>
          <TextFont style={{fontSize: 14, paddingLeft: 15 }}>Odgovori</TextFont>
        </View>
        <View style={{height: 170}}>
          <ScrollView containerStyle={{flex: 1}}>
            <View>
            { 
              questionDetail.answers.map((questionAnswers, key) => (
                <View style={{flex: 1}} key={key}>
                  <LiveQuestionDetailAnswers 
                    elvise = {questionAnswers}
                    prva = {()=> this.prvaMutacija(questionAnswers.id)} // cekiraj
                    druga = {()=> this.drugaMutacije(questionAnswers.id)} // unchekiraj 
                    personName = {questionAnswers.person.firstName}
                    personLastName = {questionAnswers.person.lastName}
                    text = {questionAnswers.text}
                    imgUrl = {questionAnswers.person.profileInfo.profileImageUrl}
                    personPhotoCount = {questionAnswers.person.profileInfo.photos}
                    personFriendCount = {questionAnswers.person.profileInfo.followers}
                    personStarCount = {questionAnswers.person.profileInfo.stars}
                    isCheck = {questionDetail.answered} // da li je bilo koj odgovor cekiran
                    isThisAnswer = {questionAnswers.isAnswer} // da li je taj odgovor cekiran
                    answerId = {questionAnswers.id}
                    getIsMyQuestion = {isMyQuestion(questionDetail.person.id)} // da li je moje pitanje
                    questionId = {this.props.match.params.subjectQuestion}
                    isMyLike = {questionAnswers.likes.myLike}
                    super = {questionAnswers.likes.super}
                    beskorisno = {questionAnswers.likes.beskorisno}
                    hvala = {questionAnswers.likes.hvala}
                  />  
                </View>
              ))}
            </View>
          </ScrollView>
          </View>
          {
          isMyQuestion(questionDetail.person.id) ? null
          :
           <TouchableOpacity 
            style={{position: 'absolute', bottom: 3, right: 8}}
            onPress={()=>{
              this.props.history.push(`/send-answers/${this.props.match.params.subjectQuestion}`);     
            }}
           >
            <Image source={require('../../imgs/Chatdugme.png')} style={{width: 50, height: 50}}/>
          </TouchableOpacity>
          }
        </View>
            ))}
      </View>
    )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    borderBottomColor: '#a9a9a9',
    borderBottomWidth: 1,
    borderTopColor: '#a9a9a9',
    borderTopWidth: 1,
  },
});


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default LiveQuestionDetail;