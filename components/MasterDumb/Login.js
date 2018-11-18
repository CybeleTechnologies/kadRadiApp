import React from 'react';
import {
  View,
  Dimensions,
  Image,
  Text,
  TextInput,
  TouchableHighlight,
  Button,
  AsyncStorage,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {styles} from '../../Styles/Styles';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Hideo } from 'react-native-textinput-effects';
import FacebookButton from '../DumbComponents/LoginDumb/FacebookButton';
import GoogleLoginButton from '../DumbComponents/LoginDumb/GoogleLoginButton';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Modal from 'react-native-modal';
import BigButton from '../CommonDumb/BigButton';

@withRouter
@connect((state) => {return {
  menuVisible: state.menuVisible,
  }}, mapDispatchToProps)
@graphql(gql`
  mutation userLogin($email: String, $password: String, $fbToken: String, $gToken: String) {
    userLogin(email: $email, password: $password, fbToken: $fbToken, gToken: $gToken) {
      id,
      firstName,
      lastName,
      token,
      profileInfo {
        profileImageUrl
        photos
        checkedPlaces
        favorites
      }
      email
      friends {
        id,
        firstName,
        lastName,
        profileInfo {
          profileImageUrl,
        }
        email
      }
    }
  }`,
  {
    name: 'userLogin',
  }
)
@graphql(gql`
  mutation createProfile($id: Int, $imageUrl: String ) {
    createProfile(id: $id, imageUrl: $imageUrl) {
      profileImageUrl
    }
  }`,
  {
    name: 'createProfile',
  }
)
@graphql(gql`
  mutation passwordResetRequest($email: String!) {
    passwordResetRequest(email: $email) {
      success
      error
    }
  }`,
  {
    name: 'resetPasswd',
  }
)
class Login extends React.Component {
  constructor(props) {
    super(props);
    const {width, height} = Dimensions.get('window');
    this.state = {
      width,
      height,
      email : '',
      password: '',
      dateFb: {},
      user: null,
      visibleModal: false,
    }
  }
  getFb = async (dateFb:any):void => {
    if(dateFb && dateFb.profile) {
      let { token } = dateFb.credentials;
      if (token) {
        let { data } = await this.props.userLogin({
          variables: {
            fbToken: token
          }
        });
        if (data.userLogin) {
          let { id, firstName, lastName, token, email, friends } = data.userLogin;
          let { profileImageUrl, photos, checkedPlaces, favorites} = data.userLogin.profileInfo;
          let stringy = id.toString();
          AsyncStorage.setItem('userId', stringy);
          AsyncStorage.setItem('userToken', token);
          this.props.userId(id, firstName, lastName, profileImageUrl, token, email, friends, photos, checkedPlaces, favorites);
        }
      }
    }
  }
  getGoog = async (googData: any): void => {
    let { accessToken } = googData;
    let { data } = await this.props.userLogin({
      variables: {
        gToken: accessToken,
      }
    });
    if(data.userLogin) {
      let { userLogin } = data;
      let { id, firstName, lastName, token, email, friends} = userLogin;
      let { profileImageUrl, photos, checkedPlaces, favorites} = data.userLogin.profileInfo;
      let stringy = id.toString();
      AsyncStorage.setItem('userId', stringy);
      AsyncStorage.setItem('userToken', token);
      this.props.userId(id, firstName, lastName, profileImageUrl, token, email, friends, photos, checkedPlaces, favorites);
    }
  }
  logMe = async () => {
    let { email, password } = this.state;
    const loginMuta = await this.props.userLogin({
      variables: {
        email,
        password
      }
    });
    if(loginMuta.data.userLogin) {
      let { userLogin } = loginMuta.data;
      let { id, firstName, lastName, token, email, friends } = userLogin;
      let { profileImageUrl, photos, checkedPlaces, favorites } = userLogin.profileInfo;
      let stringy = userLogin.id.toString();
      AsyncStorage.setItem('userId', stringy);
      AsyncStorage.setItem('userToken', token);
      this.props.userId(id, firstName, lastName, profileImageUrl, token, email, friends, photos, checkedPlaces, favorites);
    }
  }
  resetMe = async () => {
    let { email } = this.state;
    let { data } = await this.props.resetPasswd(
      {
        variables: {
          email
        }
      }
    )
    if (data.passwordResetRequest.success) {
      ToastAndroid.show(`Proverite email ${this.state.email}`, ToastAndroid.LONG);
      this.setState({
        visibleModal: false,
      })
    } else {
      ToastAndroid.show(`Greška!`, ToastAndroid.LONG);
    }
  }
  render() {
    return(
      <Image source={require('../../imgs/image.jpg')}  style={styles.slika}>
        <KeyboardAwareScrollView>
          {
          this.state.visibleModal? 
          <Modal
            isVisible={this.state.visibleModal}
            animationIn="slideInLeft"
            animationOut="slideOutRight"
            >
              <TouchableHighlight 
                onPress={() => {
                  this.setState({
                    visibleModal: false,
                  })
                }}
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  zIndex: 99,
                }}>
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}> X </Text>
              </TouchableHighlight>
              <Text style={{color: 'white', fontSize: 14,}}>Email</Text>
              <TextInput
                underlineColorAndroid='transparent'
                style={{
                  borderColor: 'transparent',
                  borderRadius: 10,
                  backgroundColor: 'white'
                }}
                keyboardType = 'email-address'
                placeholderTextColor={'black'}
                placeholder={'primer@primer.com'}
                disableFullscreenUI={true}
                onChangeText={(value) => this.setState({
                  email: value,
                })} 
              />
              <BigButton
                containerStyle={{
                  width: '100%',
                  marginTop: 15,
                }}
                onAction={() => {
                  this.resetMe()
                }}
                title="Promeni lozinku" 
              />
            </Modal>:
            null
          }
          <View style={{flexDirection: 'column',justifyContent:'center', alignItems: 'center',}}>
            <Image source={require('../../imgs/logo.png')} style={{width: 150, height: 150, marginTop: "5%"}}/>
            <Text style={{color: 'white'}}>Email</Text>
            <View style={{marginLeft: '20%',marginRight: '20%',marginBottom: 0,alignSelf: 'stretch',marginBottom: "5%"}}>
              <Hideo
                iconClass={FontAwesomeIcon}
                iconName={'user'}
                iconColor={'white'}
                onChangeText={(email) => { this.setState({email}) }}
                iconBackgroundColor={'#f2a59d'}
                inputStyle={{ color: '#464949' }}
                keyboardType = 'email-address'
              />
            </View>
            <Text style={{color: 'white'}}>Lozinka</Text>
            <View style={{marginLeft: '20%',marginRight: '20%',marginBottom: 0,alignSelf: 'stretch',marginBottom: "5%"}}>
              <Hideo
                iconClass={FontAwesomeIcon}
                iconName={'unlock-alt'}
                iconColor={'white'}
                onChangeText={(password) => { this.setState({password}) }}
                iconBackgroundColor={'#f2a59d'}
                inputStyle={{ color: '#464949' }}
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity
              onPress={()=> {
                this.setState({
                  visibleModal: true,
                })
            }}>
              <Text style={{color: 'white',textDecorationLine:'underline',marginBottom: "2.5%"}}>Zaboravili ste lozinku?</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', justifyContent:'center', alignItems: 'center', marginBottom: '2.5%'}}>
              <TouchableOpacity
                style={styles.createAccButton}
                onPress={()=>{
                  this.logMe();
                }}>
                <Text style={{color: 'white',fontWeight: '600',fontFamily: 'Helvetica neue',fontSize: 15.2,}}>Uloguj se</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row',justifyContent:'center', alignItems: 'center',marginBottom: "2.5%"}}>
              <FacebookButton getFb={this.getFb} />
            </View>
            <View style={{flexDirection: 'row',justifyContent:'center', alignItems: 'center',marginBottom: "2.5%"}}>
              <GoogleLoginButton getGoog={this.getGoog}/>
            </View>
            <View style={{flexDirection: 'row', justifyContent:'center', alignItems: 'center'}}>
              <TouchableOpacity
                style={styles.createAccButton}
                onPress={()=>{
                  this.props.history.push('/registration');
                }}>
                <Text style={{color: 'white',fontWeight: '600',fontFamily: 'Helvetica neue',fontSize: 15.2,}}>Napravi nalog</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Image>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default Login;
