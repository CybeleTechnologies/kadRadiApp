import React from 'react';
import {
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../actions';
import TextFont from 'TextFont';
import ImagePicker from 'react-native-image-picker';
import { RNS3 } from 'react-native-aws3';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
const options = {
  title: 'Izaberite fotografiju',
  quality: 1,
  maxWidth: 800,
  maxHeight: 500,
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

@graphql(
  gql`mutation changeProfileImage($token: String!, $profileImageUrl: String!) {
    changeProfileImage(token: $token, profileImageUrl: $profileImageUrl) {
      success
      error
    }
  }`, 
  {
    name: 'promeniProfilnu',
  }
)

class ProfileHero extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      uri: ''
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
        name: `photo/${this.props.userProfile.firstName}-${this.props.userProfile.id}-${new Date().toISOString()}.jpg`,
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
        let { data } = await this.props.promeniProfilnu(
          {
            variables: {
              token,
              profileImageUrl: res.body.postResponse.location,
            }
          }
        )
        if (data.changeProfileImage.success) {
          this.props.changeProfImg(res.body.postResponse.location)
          ToastAndroid.show('Uspešno ste promenili profilnu fotografiju', ToastAndroid.SHORT);
        } else {
          ToastAndroid.show('Greška!', ToastAndroid.SHORT);
        }
      }
    }
    render() {
      return (
      <TouchableOpacity
        onPress={() => {
          this.props.menuVisibileNo();
          this.props.history.push('/myProfile');
        }}
      >
        <Image
          source={require('../../../imgs/pozadinablur.jpg')} 
          style={{
            width: '100%',
            height: responsiveHeight(21),
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                !this.props.friends 
                ?
                this.showPicker(options)
                : 
                null
              }}
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                width: 80,
                height: 80,
              }}
            >
              <Image
                source={{ uri: this.props.profileImg }}
                style={{
                  width: 65,
                  height: 65.1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignContent: 'center'
                }}
                borderRadius={65/2}
                >
                {
                  !this.props.friends ?
                  <Image
                  source={require('../../../imgs/scope.png')} 
                  style={{
                    width: 80,
                    height: 80,
                    alignSelf: 'center'
                  }}
                  resizeMode={'contain'}
                  />
                  :
                  null
                }
              </Image>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'center',
              }}
            >
              <TextFont
                style={{
                  fontWeight: 'bold',
                  color: 'white',
                  textAlignVertical: 'center',
                  textAlign: 'center'
                }}
              >
                {this.props.firstName} {this.props.lastName}
              </TextFont>
              <TextFont
                light
                style={{
                  color: 'white',
                  textAlignVertical: 'center',
                }}
              >
                Beograd
              </TextFont>
            </View>
          </View>
        </Image>
      </TouchableOpacity>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default withRouter(connect(state => { return {
  menuVisible: state.menuVisible,
  userProfile: state.userProfile,
  userLocation: state.userLocation,
}}, mapDispatchToProps)(ProfileHero));
