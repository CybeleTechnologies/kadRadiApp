import React from 'react';
import { View, Text, Image, TouchableOpacity} from 'react-native'
import {styles} from '../../../Styles/Styles';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
export default class GoogleLoginButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lol: 'yes',
    }
  }
  componentDidMount() {
    this._setupGoogleSignin();
  }
  _setupGoogleSignin = async () => {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        scopes: [
          'https://www.googleapis.com/auth/plus.profile.emails.read', 'https://www.googleapis.com/auth/plus.login'
        ],
        webClientId: '5801340474-84nvmmsh191aadlm84pnpl81v4s71ajt.apps.googleusercontent.com',
        offlineAccess: false,
      });
      const user = await GoogleSignin.currentUserAsync();
    }
    catch(err) {
      console.log("Play services error", err.code, err.message);
    }
  }

  _signIn = async () => {
    try {
      const user = await GoogleSignin.signIn();
      this.props.getGoog(user);
    }
    catch(err) {
      console.log("Ovo je error:", err.code, err.message)
    }
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => 
        this._signIn()}>
        <View style={styles.googleLoginButton}>
          <Image style={styles.googleLogo} source={require('../../../imgs/googleLogin.png')} />
          <Text style={{color: 'white',fontWeight: '600',fontFamily: 'Helvetica neue',fontSize: 14.2,}}>Log in with Google +</Text>
        </View>
      </TouchableOpacity>
    )
  }
}
