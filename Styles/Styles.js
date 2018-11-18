import {
    StyleSheet
} from 'react-native';

export const styles = StyleSheet.create({
  vidiJosButtonProfil: {
      flexDirection: 'row',
      backgroundColor:'rgb(181, 181, 180)',
      marginLeft: '3%',
      marginRight:'3%',
      borderWidth: 2,
      borderColor: 'rgb(181, 181, 180)',
      justifyContent:'center',
    },
    aktivnostiProfil: {
      flexDirection: 'row',
      height: 100,
      borderTopWidth: 2,
      borderTopColor: 'rgb(236, 236, 236);',
      backgroundColor: 'white',
      justifyContent:'center',
      alignItems:'center'
    },
    slika : {
      flex: 1,
      alignSelf: 'stretch',
      width: null,
      justifyContent: 'center',
    },
    fbLoginButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 48,
      width: 250,
      paddingLeft: 2,
      backgroundColor: 'rgb(66,93,174)',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: 'rgb(66,93,174)',
      shadowColor: "#000000",
      shadowOpacity: 0.8,
      shadowRadius: 2,
      shadowOffset: {
        height: 1,
        width: 0
      },
    },
    FBLogo: {
      position: 'absolute',
      height: 25,
      width: 25,
      left: 10,
      top: 10,
  },
  googleLoginButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    width: 250,
    paddingLeft: 2,
    backgroundColor: 'rgb(43, 157, 157);',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgb(43, 157, 157);',
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
  },
  googleLogo: {
    position: 'absolute',
    height: 25,
    width: 25,
    left: 10,
    top: 10,
  },
  createAccButton: {
    height: 48,
    width: 250,
    paddingLeft: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
  },

})