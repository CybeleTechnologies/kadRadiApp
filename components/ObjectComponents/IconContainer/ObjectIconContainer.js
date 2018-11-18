import React from 'react';
import {
  View,
  Text,
  Image,
  ToastAndroid,
  Linking,
} from 'react-native';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import IconItem from './IconItem';
import call from 'react-native-phone-call';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../actions';
import { withRouter } from 'react-router-dom';
import WithLoader from '../../AddReview/WithLoader';
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

@withRouter
@connect((state) => {return {
  userProfile: state.userProfile,
  }}, mapDispatchToProps)
@graphql(
  gql`query objectCl($id: Int) {
    objectCl(id: $id){
      objectInfo {
        phone {
          number
        }
        websiteUrl
      }
    }
  }`,
  {
    options: (props) => {
      return ({
        variables: {
          id: props.match.params.objectId,
        }
      })
    }
  }
)
@graphql(
  gql`mutation addPhotoToObject($objectClId: Int!, $token: String!, $objectFileCategoryId: Int!, $fileUrl: String!) {
    addPhotoToObject(objectClId: $objectClId, token: $token, objectFileCategoryId: $objectFileCategoryId, fileUrl: $fileUrl) {
      success
      error
    }
  }`, 
  {
    name: 'addImage',
  }
)

@graphql(
  gql`mutation addFavorite($objectClId: Int!, $token: String!) {
    addFavorite(objectClId: $objectClId, token: $token) {
      success
    }
  }`, 
  {
    name: 'addToBookmark',
  }
)
@graphql(
  gql`mutation checkIn($objectClId: Int!, $token: String!) {
    checkIn(objectClId: $objectClId, token: $token) {
      success
      error
    }
  }`, 
  {
    name: 'iWasHere',
  }
)
@WithLoader
class ObjectIconContainer extends React.Component {

  checkInMutation = async () => {
    let {token} = this.props.userProfile;
    let {objectId} = this.props.match.params;
    let mutation = await this.props.iWasHere(
      {
        variables: {
          objectClId: objectId,
          token: token
        }
      }
    )
    if(mutation.data.checkIn.success) {
      ToastAndroid.show("Uspešno ste se cekirali!", ToastAndroid.SHORT);
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
        console.log('User tapped custom button:a ', response.customButton);
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
        name: `photo/${this.props.match.params.objectId}-${this.props.userProfile.id}-${new Date().toISOString()}.jpg`,
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
        let { token } = this.props.userProfile;
        let { data } = await this.props.addImage({
          variables: {
            objectClId: parseInt(this.props.match.params.objectId),
            token,
            objectFileCategoryId: 5,
            fileUrl: res.body.postResponse.location
          }
        })
        if (data.addPhotoToObject.success) {
          ToastAndroid.show('Uspešno ste dodali fotografiju', ToastAndroid.SHORT);
        } else {
          ToastAndroid.show('Greška prilikom dodavanja fotografije!', ToastAndroid.SHORT);
        }
      }
    }

  render() {
    let [objectCl] = this.props.data.objectCl || [];
    return(
      <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: 'center', paddingTop: responsiveHeight(2), paddingBottom: responsiveHeight(2)}}>
        <View style={{width: responsiveWidth(90), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <IconItem
            iconText="Dodaj fotografiju"
            clickProp={() => this.showPicker(options)}
            imageUrl={require('../../../imgs/cameraBlue.png')} />
          <IconItem
            clickProp={() => {
              this.checkInMutation();
            }}
            iconText="Čekiraj se"
            imageUrl={require('../../../imgs/iWasHereBlue.png')} />
          <IconItem
            clickProp={async () => {
              let miksi = await this.props.addToBookmark({
                variables: {
                  objectClId: this.props.match.params.objectId,
                  token: this.props.userProfile.token,
                }
              });
              if(miksi.data.addFavorite.success) {
                ToastAndroid.show("Uspešno ste dodali u omiljeno!", ToastAndroid.SHORT);
              } else {
                //neuspesna mutacija
              }
            }}
            iconText="Dodaj u omiljeno"
            imageUrl={require('../../../imgs/blueStar.png')} />
        </View>
        {/* <View style={{width: responsiveWidth(90), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <IconItem
            clickProp={() => {
              if(objectCl.objectInfo.phone.length) {
                const args = {
                  number: objectCl.objectInfo.phone[0].number, // String value with the number to call
                  prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
                }
                call(args).catch(console.error);
              } else {
                ToastAndroid.show('Nemamo broj telefona', ToastAndroid.SHORT);
              }
            }}
            iconText="Pozovi"
            imageUrl={require('../../../imgs/most-important/phone.png')} />
          <IconItem
            clickProp={() => {
              let {websiteUrl} = objectCl.objectInfo;
              if(websiteUrl) {
                Linking.openURL(websiteUrl);
              } else {
                Linking.openURL('https://google.com');
              }
              console.log(objectCl.objectInfo.websiteUrl, "JA SAM");
            }}
            iconText="Poseti web sajt"
            imageUrl={require('../../../imgs/most-important/web.png')} />
          <IconItem
            iconText="Pogledaj meni"
            imageUrl={require('../../../imgs/most-important/meni.png')} />
        </View> */}
      </View>
    )
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default ObjectIconContainer;
