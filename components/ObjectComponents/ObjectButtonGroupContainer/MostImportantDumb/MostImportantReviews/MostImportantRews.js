import React from "react";
import { View, Text, Image, StyleSheet, ToastAndroid } from "react-native";
import Loader from '../../../../CommonDumb/Loader';
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { withRouter } from "react-router-dom";
import RewItem from './RewItem';
import MostImportantTitle from '../MostImportantTitle';
import NotificationContainer from '../../../../CommonDumb/NotificationContainer';
import BigButton from '../../../../CommonDumb/BigButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../../actions';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

@withRouter
@graphql(
  gql`
  query ObjectReview($objectClId: Int!, $page: Int, $token: String) {
    ObjectReview(objectClId: $objectClId, page: $page, token: $token) {
        id
        textReview
        rating
        image
        person {
          lastName
          firstName
          profileInfo {
            profileImageUrl
            stars
            photos
            followers
          }
        }
        likes {
          super
          hvala,
          beskorisno
          myLike
        }
      }
    }
  `,
  {
    options: (props) => {
      let {objectId} = props.match.params;
      return ({
      variables: {
        objectClId: parseInt(objectId),
        page: 1,
        token: props.userProfile.token
      },
      fetchPolicy: 'network-only',
    })}
  }
)
@graphql(
  gql`mutation addLike($token: String!, $objectReviewId: Int!, $likeType: Int!) {
    addLike(token: $token, objectReviewId: $objectReviewId, likeType: $likeType) {
      success,
      error
    }
  }`, 
  {
    name: 'addLike',
  }
)
@graphql(
  gql`mutation removeLike($token: String!, $objectReviewId: Int!) {
    removeLike(token: $token, objectReviewId: $objectReviewId) {
      success,
      error
    }
  }`, 
  {
    name: 'removeLike',
  }
)
class MostImportantRews extends React.Component {
  constructor(props) {
    super(props);
  }
  likeMeMost = async (id, like) => {
      let { userProfile } = this.props;
      let go = await this.props.addLike({
        variables: {
          token:  userProfile.token,
          objectReviewId: id,
          likeType: like,
        }
      });
      if(go.data.addLike.success) {
        ToastAndroid.show('Hvala na oceni', ToastAndroid.SHORT);
        let reee = this.props.data.refetch({
          objectClId: parseInt(this.props.match.params.objectId),
          page: 1,
          token: userProfile.token,
        });
      }
  }
  disLikeMost = async ( id ) => {
    let { userProfile } = this.props;
    let go = await this.props.removeLike({
      variables: {
        token:  userProfile.token,
        objectReviewId: id,
      }
    });
    if(go.data.removeLike.success) {
      ToastAndroid.show('Uspešno obrisana ocena', ToastAndroid.SHORT);
      let reee = this.props.data.refetch({
        objectClId: parseInt(this.props.match.params.objectId),
        page: 1,
        token: userProfile.token,
      });
    }
}
  render() {
    let [objectReview] = this.props.data.ObjectReview || []; 
    return (
      <View>
        <MostImportantTitle title="Ocene i utisci" />
        <NotificationContainer
            leftTitle={
              `Zapamtite restorani ne mogu lažirati ocenu ili je platiti.`
            }
            leftIcon={require("../../../../../imgs/upitnik.png")} 
            rightIcon={require("../../../../../imgs/iks.png")} />
        {
          this.props.data.loading ? <Loader /> : <RewItem objectReview={objectReview} likeMeMost={this.likeMeMost} info={false} disLikeMost={this.disLikeMost}/> 
        }
        
        <NotificationContainer 
           leftTitle={`VIDI VISE OCENA`}
           leftIconStyle={{width: responsiveHeight(4), height: responsiveHeight(4)}}
           notifMainProps={{borderTopWidth: 0, borderTopColor: '#fff'}}
           leftTitleStyle={{fontSize: 12, color: '#a9a9a9'}}
           leftIcon={require('../../../../../imgs/starIco.png')}
           rightIcon={require('../../../../../imgs/strelica.png')} />
        <MostImportantTitle 
          title="Ovo je vaš posao?"  
          viewStyle={styles.mostImportantTitle} />
        <View style={{paddingTop: 10, paddingBottom: 5,}}>
          <View style={{flexDirection: 'column', alignSelf:'center', justifyContent: 'flex-start', alignItems: 'center',  width: '95%'}}>
            <View style={{width: '60%', justifyContent: 'center', alignItems: 'flex-start', alignSelf: 'flex-start', paddingBottom: 7}}>
              <Text>Postanite deo Vime zajednice i unapredite svoj posao!</Text>
            </View>
            <BigButton 
              title="Dodajte kao svoj objekat"
              onAction={() => {
                this.props.history.push(`/addToYourObject/${this.props.match.params.objectId}`)
              }} 
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mostImportantTitle : {
    height: responsiveHeight(7.5), 
    borderBottomWidth: 1, 
    borderBottomColor: '#e0e0e0',
  }
})
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(({ userProfile }) => ({
    userProfile,
  }), mapDispatchToProps)(MostImportantRews);