import React from 'react';
import {View, Text, Image} from 'react-native'
import { styles } from '../../../Styles/Styles.js'
const { FBLogin, FBLoginManager, } = require('react-native-facebook-login');
export default class FbLoginButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lol: 'yes',
    }
  }
  render() {
    const button = (
      <View style={styles.fbLoginButton}>
        <Image style={styles.FBLogo} source={require('../../../imgs/fbLogo.png')} />
        <Text style={{color: 'white',fontWeight: '600',fontFamily: 'Helvetica neue',fontSize: 14.2,}}>Log in Facebook</Text>
      </View>
    )
    return (
      <FBLogin style={{ flex: 1 }}
        ref={(fbLogin) => { this.fbLogin = fbLogin }}
        buttonView={button}
        permissions={["email","user_friends"]}
        loginBehavior={FBLoginManager.LoginBehaviors.Web}
        onLogin={(data) => {
          this.props.getFb(data);
        }}
        onLogout={() => {
          this.setState({ dateFb : null });
        }}
        onLoginFound={(data) => {
          this.setState({ dateFb : data });
        }}
        onLoginNotFound={() => {
          this.setState({ dateFb : null });
        }}
        onError={(data) =>{
          console.log(data);
        }}
        onCancel={() =>{
          console.log("User cancelled.");
        }}
        onPermissionsMissing={(data) =>{
          console.log("Check permissions!");
          console.log(data);
        }}/>
    )
  }
}
