import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import TextFont from 'TextFont';
import TextAndIcon from '../ObjectComponents/ObjectButtonGroupContainer/MostImportantDumb/MostImportantReviews/TextAndIcon';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

@connect((state) => {return {
  userProfile: state.userProfile,
  liveActive: state.liveActive,
  }}, mapDispatchToProps)


@graphql(
  gql`mutation addAnswerLike($token: String!, $answerId: Int!, $likeType: Int!) {
    addAnswerLike(token: $token, answerId: $answerId, likeType: $likeType) {
      success
      error
    }
  }`, 
  {
    name: 'addLike',
  }
)
@graphql(
  gql`mutation removeAnswerLike($token: String!, $answerId: Int!) {
    removeAnswerLike(token: $token, answerId: $answerId) {
      success
      error
    }
  }`, 
  {
    name: 'removeLike',
  }
)


class LiveQuestionDetailAnswers extends Component{
  constructor(props){
    super(props);
    this.state = ({
      isLiked: false,
      super: false,
      hvala: false,
      beskorisno: false, 
      checkAnswerID: '',
      likeImgHval: '',
      likeImgSuper: '',
      likeImgBesk: '',
    });
  }
  componentWillReceiveProps(nexProps){
    
  }
  componentWillMount(){
    this.checkLike(this.props.isMyLike)
  }
  checkLike = (isLike) => {
      switch(isLike){
        case 0: 
          this.setState({
            isLiked: false,
          })
          break;
        case 1:
          this.setState({
            isLiked: true,
            super: true,
            hvala: false,
            beskorisno: false,
          })
          break;
        case 2: 
          this.setState({
            isLiked: true,
            super: false,
            hvala: true,
            beskorisno: false,
          })
          break;
        case 3: 
        this.setState({
          isLiked: true,
          super: false,
          hvala: false,
          beskorisno: true,
        })
        break;
      }
  }
  
  addLikeMutate = async (ansId, likeTypeId) => {
    this.setState({
      isLiked: true,
    })
    let mutation = await this.props.addLike(
      {
        variables:{
          token: this.props.userProfile.token,
          answerId: ansId,
          likeType: likeTypeId,
        }
      }
  )
  if(mutation){
    ToastAndroid.show("Hvala vam na lajku", ToastAndroid.LONG);
  }else{
    console.log("ERROR");
  }
  }
  removeLikeMutate = async (ansId) => {
    this.setState({
      isLiked: false,
    })
    let mutation = await this.props.removeLike(
      {
        variables:{
          token: this.props.userProfile.token,
          answerId: ansId,
        }
      }
    )
    if(mutation){
      ToastAndroid.show("Uradili ste dislike", ToastAndroid.LONG);
    }else{
      console.log();
    }
  }

  letsMutate = async (id) => {
    this.setState({
      isChecked: true,
    });

  }

  notAnswerMuta = async (id) => {
    this.setState({
      isChecked: false,
    });
    
  }

  render(){
    return(
    <View style={styles.container} >
    <View style={styles.subContainer}>
      <View style={styles.infoContainer}>
        <View style={{ flexDirection: 'row', width: responsiveWidth(100) }}>
          <View>
            <Image
              style={styles.avatarImage}
              source={{ uri: this.props.imgUrl }}
            />
          </View>
          <View style={styles.profileName}>
            <TextFont
              semiBold
              style={{
                fontSize: 16,
              }}
            >
            {this.props.personName} {this.props.personLastName}
            </TextFont>
            <View style={styles.profileIconsContainer}>
              <TextAndIcon
                imageUrl={require('../../imgs/friendsIco.png')}
                numbersStyle={{ textAlignVertical: 'center', paddingLeft: 2 }}
                numbers={this.props.personFriendCount}
              />
              <TextAndIcon
                numbersStyle={{ textAlignVertical: 'center', paddingLeft: 2 }}
                numbers={this.props.personStarCount}
                containerStyle={{ paddingLeft: 4 }}
                imageUrl={require('../../imgs/redStarIco.png')}
              />
              <TextAndIcon
                numbersStyle={{ textAlignVertical: 'center', paddingLeft: 3 }}
                numbers={this.props.personPhotoCount}
                containerStyle={{ paddingLeft: 4 }}
                imageUrl={require('../../imgs/cameraIco.png')}
              />
            </View>
          </View>
            {
              this.props.getIsMyQuestion ?
                <View>
                  {
                    this.props.isCheck ? 
                    <TouchableOpacity 
                      style={{ 
                        width: 50, 
                        justifyContent: 'flex-end',
                      }} 
                      onPress={() =>{
                        if(this.props.isThisAnswer){
                          this.props.druga(); // uncheck 
                        }else{
                          console.log("Ovo nije odgovor");
                        }
                      }}
                    >
                    <Image 
                      source={this.props.isThisAnswer ? require('../../imgs/LiveIsAnswered.png') : require('../../imgs/LiveNotAnswered.png')}
                      style={{width: 40, height: 40}}  
                    />
                  </TouchableOpacity>
                  :
                  <View>
                    <TouchableOpacity 
                      style={{ 
                        width: 50, 
                        justifyContent: 'flex-end',
                      }} 
                      onPress={() =>{
                        this.props.prva(); // check 
                      }}
                    >
                    <Image 
                      source={this.props.prob ? require('../../imgs/LiveNotAnswered.png') : require('../../imgs/LiveNotAnswered.png')}
                      style={{width: 40, height: 40}}  
                    />
                  </TouchableOpacity>
                  </View>
                  }
                </View>
              :
                <View
                  style={{ 
                    width: 50, 
                    justifyContent: 'flex-end',
                  }} 
                >
                  <Image 
                    source={this.props.isThisAnswer ? require('../../imgs/LiveIsAnswered.png') : require('../../imgs/LiveNotAnswered.png')}
                    style={{width: 40, height: 40}}  
                  />
                </View>
            } 
        </View>
      </View>
    </View>
    <View style={{ padding: 10 }}>
      <TextFont style={{ fontSize: 12 }}>
        {this.props.text}
      </TextFont>
    </View>
    <View style={styles.buttonContainer}>
      <View style={styles.buttonSubContanier}>
        {
          <View style={{flexDirection: 'row'}}>
          <View>
          <TouchableOpacity
          onPress={()=> {
            if(this.state.isLiked){
              if(this.state.super === true){
                this.removeLikeMutate(this.props.answerId);
                this.setState({
                  super: false,
                })
              }
            }else{
              if(this.state.beskorisno === false && this.state.hvala === false)
              this.addLikeMutate(this.props.answerId, 1);
              this.setState({
                super: true,
              })
            }
          }}
        >
        <View>
          <Image
            source={this.state.super ? require('../../imgs/superActive.png') : require('../../imgs/super.png')}
            style={styles.rewButton}
          />
        </View>
        </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity
        onPress={()=> {
          if(this.state.isLiked){
            if(this.state.hvala === true){
              this.removeLikeMutate(this.props.answerId);
              this.setState({
                hvala: false,
              })
            }
          }else{
            if(this.state.beskorisno === false && this.state.super === false)
            this.addLikeMutate(this.props.answerId, 2);
            this.setState({
              hvala: true,
            })
          }
        }}
      >
      <View>
        <Image
          source={this.state.hvala ? require('../../imgs/thanksActive.png') : require('../../imgs/thanks.png')}
          style={styles.rewButton}
        />
      </View>
      </TouchableOpacity>
      </View>
      <View>
      <TouchableOpacity
      onPress={()=> {
        if(this.state.isLiked){
          if(this.state.beskorisno === true){
            this.removeLikeMutate(this.props.answerId);
            this.setState({
              beskorisno: false,
            })
          }
        }else{
          if(this.state.hvala === false && this.state.super === false)
          this.addLikeMutate(this.props.answerId, 3);
          this.setState({
            beskorisno: true,
          })
        }
      }}
    >
    <View>
      <Image
        source={this.state.beskorisno ? require('../../imgs/uselessActive.png') : require('../../imgs/useless.png')}
        style={styles.rewButton}
      />
    </View>
    </TouchableOpacity>
    </View>
    </View>
        }                
      </View>
    </View>
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
    borderTopWidth: 0,
  },
  subContainer: {
    flexDirection: 'column',
    width: '100%',
    alignSelf: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    paddingBottom: 0,
  },
  avatarImage: {
    width: responsiveHeight(7.5),
    height: responsiveHeight(7.5),
    borderRadius: responsiveHeight(7.5) / 2,
  },
  profileName: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingLeft: 10,
    width: responsiveWidth(70),
  },
  profileIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(8),
    borderTopColor: '#a9a9a9',
    borderTopWidth: 0,
  },
  buttonSubContanier: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rewButton: {
    width: 105,
    height: 35,
  },
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default LiveQuestionDetailAnswers;
