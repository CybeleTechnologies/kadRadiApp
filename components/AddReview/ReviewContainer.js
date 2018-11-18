import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ToastAndroid
} from 'react-native';
import { withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import WithLoader from './WithLoader';
import AddReviewHead from './AddReviewHead';
import ReviewRating from './ReviewRating';
import AddReviewRating from './AddReviewRating';
import AddReviewTitle from './AddReviewTitle';
import AddReviewInput from './AddReviewInput';
import NotificationContainer from '../CommonDumb/NotificationContainer';
import BigButton from '../CommonDumb/BigButton';
import {
  shareOnTwitter,
} from 'react-native-social-share';
import { ShareDialog } from 'react-native-fbsdk';
import ImagePicker from 'react-native-image-picker';
import { RNS3 } from 'react-native-aws3';

const options = {
  title: 'Izaberite fotografiju',
  quality: 0.6,
  maxWidth: 1800,
  maxHeight: 1200,
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

const styled = StyleSheet.create({
  addRevContainer: {
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  notifMainProps: {
    backgroundColor: '#f2f2f2', 
    borderTopWidth: 1,
    borderTopColor: '#d3d3d3',
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3'
  },
  shareCont: {
    flexDirection: 'row',
    width: responsiveWidth(100),
    paddingTop: responsiveHeight(5)
  },
  shareSubCont: { 
    flexDirection: 'column',
    width: responsiveWidth(40),
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  shareHr: { 
    flexDirection: 'row',
    width: '100%',
    borderBottomColor: '#a9a9a9',
    borderBottomWidth: 1,
  },
  labelCont: {
    flexDirection: 'column',
    width: responsiveWidth(20),
  },
  shareLabel: {
    color: '#019f9f',
    fontSize: 16,
    textAlign: 'center',
  },
  imageSpec: {
    width: responsiveWidth(12),
    height: responsiveHeight(12),
  },
  bigButtonCont: {
    width: '100%', 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});

@withRouter
@connect((state) => {return {
  userProfile: state.userProfile,
  reviewsInfo: state.reviewsInfo,
  }}, mapDispatchToProps)
@graphql(
  gql` query objectCl($id: Int) {
    objectCl(id: $id) {
      name
      avgRating
      ratingCount
    }
  }`,
  {
    options: (props)=> {
      return ({
        variables: {
          id: props.match.params.objectId,
        },
      })
    }
  }
)
@graphql(
  gql`mutation createReview($textReview: String, $objectClId: Int, $token: String, $avgPrice: Float, $workTimeTruth: Boolean, $rating: Float, $imageUrl: String) {
    createReview(textReview: $textReview, objectClId: $objectClId, token: $token, avgPrice: $avgPrice, workTimeTruth: $workTimeTruth, rating: $rating, imageUrl: $imageUrl) {
      person {
        email,
      }
    }
  }`, 
  {
    name: 'prvaMutacija',
  }
)
@WithLoader
class ReviewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratingPrice: 0,
      ratingReview: 0,
      workingTimeTruth: false,
      reviewText: '',
      showActiveTrue: false,
      showActiveFalse: false
    }
  }
  componentWillMount() {
    if(this.props.reviewsInfo.idReview === this.props.match.params.objectId) {
      let { idReview, img, ratingPrice, ratingReview, reviewText, workingTimeTruth } = this.props.reviewsInfo; 
      this.setState({
        workingTimeTruth,
        ratingPrice,
        ratingReview,
        reviewText,
        showActiveTrue: workingTimeTruth? true : false,
        showActiveFalse: !workingTimeTruth? true : false, 
      });
    }
  }
  priceRatingChange = (ratingPrice) => {
    this.setState({
      ratingPrice,
    })
    this.props.addReview(this.state.workingTimeTruth, ratingPrice, this.state.ratingReview, this.state.reviewText, '', this.props.match.params.objectId);
  }
  reviewRatingChange = (ratingReview) => {
    this.setState({
      ratingReview,
    })
    this.props.addReview(this.state.workingTimeTruth, this.state.ratingPrice, ratingReview, this.state.reviewText, '', this.props.match.params.objectId);
  }
  workTimeChange = (workingTimeTruth, showActive) => {
    if(showActive == 'first') {
      this.setState(previousState => ({
        workingTimeTruth,
        showActiveTrue: !previousState.showActiveTrue
      }))
    } else {
      this.setState(previousState => ({
        workingTimeTruth,
        showActiveFalse: !previousState.showActiveFalse
      }))
    }
    this.props.addReview(workingTimeTruth, this.state.ratingPrice, this.state.ratingReview, this.state.reviewText, this.props.match.params.objectId);
  }
  updateText = (reviewText) => {
    this.setState({
      reviewText
    })
    this.props.addReview(this.state.workingTimeTruth, this.state.ratingPrice, this.state.ratingReview, reviewText, this.props.match.params.objectId);
  }

  letsMutate = async () => {
    let {token} = this.props.userProfile;
    let {objectId} = this.props.match.params;
    let { img } = this.props.reviewsInfo;
    let mutation = await this.props.prvaMutacija(
      {
        variables: {
          textReview: this.state.reviewText,
          objectClId: objectId,
          token: token,
          avgPrice: this.state.ratingPrice,
          workTimeTruth: this.state.workingTimeTruth,
          rating: this.state.ratingReview,
          imageUrl: img,
        }
      }
    )
    if(mutation) {
      this.props.history.goBack();
      this.props.addReview(false, 0, 0, '', 0)
      this.props.addImageInReview('');
    } else {
      //Handle if not review sent
    }
  }
  tweet = () => {
    shareOnTwitter({
        'text': this.state.reviewText,
        'link':'https://www.rezultati.com',
        'imagelink':'https://cdn.pixabay.com/photo/2013/04/06/11/50/image-editing-101040_960_720.jpg',
      },
      (results) => {
        console.log(results);
      }
    );
  }
  shareLinkWithShareDialog = async () => {
    let tmp = this;
    let sharePhotoContent= {
      contentType: 'link',
      contentUrl: "https://kad-radi.com",
      contentDescription: this.state.reviewText,
      contentTitle: 'Aplikacija Findo',
    }
    let canShow = await ShareDialog.canShow(sharePhotoContent);
    if(canShow) {
      let result = await ShareDialog.show(sharePhotoContent);
      if(result) {
        if (result.isCancelled) {
          console.log('Share cancelled');
        } else {
          console.log('Share success with postId: '
            + result.postId);
        } 
      }
    }
  }
  showPicker = (options) => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
        this.uploadMe(source.uri); 
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data }; 
      }
    });
  }
    uploadMe = async (uri) => {
      const file = {
        uri: uri,
        name: `photo/reviewImg${this.props.match.params.objectId}-${this.props.userProfile.id}-${new Date().toISOString()}.jpg`,
        type: 'image/jpeg',
      };
      const opt = {
        bucket: 'kadradi-slike',
        region: 'eu-central-1',
        accessKey: 'AKIAJWJPWC6HGBPXQ4AQ',
        secretKey: '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',
        successActionStatus: 201,
      }
      let res = await RNS3.put(file, opt);
      if (res.status != 201) {
          throw new Error("BOOOM ", res);
      } else {
          this.props.addImageInReview(res.body.postResponse.location);
          ToastAndroid.show("Uspešno dodavanje fotografije u komentar", ToastAndroid.LONG)
      }
    }
  render() {
    let [objectCl] = this.props.data.objectCl || [];
    return (
      <ScrollView>
        <View>
          <Image
            source={require('../../imgs/pozadinablur.jpg')}
            style={{ width: '100%'}}>
            <AddReviewHead avgRating={objectCl.avgRating} ratingCount={objectCl.ratingCount} />
            <ReviewRating
               priceRatingChange={this.priceRatingChange}
               ratingPrice={this.state.ratingPrice}
               reviewRatingChange={this.reviewRatingChange}
               ratingReview={this.state.ratingReview}
               workingTimeTruth={this.state.workingTimeTruth}
               showActiveTrue={this.state.showActiveTrue}
               showActiveFalse={this.state.showActiveFalse}
               workTimeChange={this.workTimeChange}  
            />
            <View style={styled.addRevContainer}>
              <AddReviewTitle objectCl={objectCl}  />
              <AddReviewInput updateText={this.updateText} texting={this.state.reviewText} />
            </View>
          </Image>
          <View style={{width: '100%', backgroundColor: '#fff'}}>
            <NotificationContainer 
              leftTitle={`Dodaj fotografiju`}
              leftIconStyle={{
                width: responsiveHeight(4),
                height: responsiveHeight(4)
              }}
              notifMainProps={styled.notifMainProps}
              leftIcon={require('../../imgs/cameraInColor.png')}
              onPressNotification={() => this.showPicker(options)}
              rightIcon={require('../../imgs/strelica.png')} 
              
            />
            <View style={styled.shareCont}>
              <View style={styled.shareSubCont}>
                <View style={styled.shareHr} /> 
              </View>
              <View style={styled.labelCont}>
                <Text style={styled.shareLabel}>
                  Podeli na
                </Text>
              </View>
              <View style={styled.shareSubCont}>
                <View style={styled.shareHr} />
              </View>  
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <TouchableOpacity
                style={{
                  paddingRight: responsiveWidth(2),
                }} 
                onPress={() => {
                  this.shareLinkWithShareDialog();
                }}
              >
              <Image 
                source={require('../../imgs/facebookActive.png')}
                resizeMode={'center'}
                style={styled.imageSpec}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.tweet();
              }}
            >
              <Image 
                source={require('../../imgs/twitterActive.png')}
                resizeMode={'center'}
                style={styled.imageSpec}
              />
            </TouchableOpacity>
          </View>
            <View style={styled.bigButtonCont}>
              <BigButton
                containerStyle={{
                  width: '95%',
                }}
                onAction={() => {
                  this.letsMutate()
                }}
                title="Podeli" 
              />
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default ReviewContainer;