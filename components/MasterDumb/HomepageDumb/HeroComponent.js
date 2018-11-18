import React from 'react';
import {
  View,
  Image,
  Text,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../actions';
import Hero from 'react-native-hero';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { MediaQuery } from "react-native-responsive";
type State = {
  heroBackground: string,
  clockImg: string,
}
type Props = {
  menuVisible: any,
  userProfile: any,
  heroBackground: string,
  clockImg: string,
}
@withRouter
@connect((state) => {return {
  menuVisible: state.menuVisible,
  userProfile: state.userProfile,
  }}, mapDispatchToProps)
class HeroComponent extends React.Component<State> {
  constructor(props) {
    super(props);
    this.state = {
      heroBackground: 'https://t3.ftcdn.net/jpg/00/37/97/20/500_F_37972048_IenABzavmE1acJO2TeL7qLVNGJvPCKML.jpg',
      clockImg: 'https://yahya-gilany.gallerycdn.vsassets.io/extensions/yahya-gilany/vscode-clock/1.0.1/1497509730699/Microsoft.VisualStudio.Services.Icons.Default',
    }
  }
  componentWillMount() {
    if(this.props.heroBackground) {
      let {heroBackground} = this.props;
      this.setState({
        heroBackground,
      })
    }
    if(this.props.clockImg) {
      let {clockImg} = this.props;
      this.setState({
        clockImg,
      })
    }
  }
  render() {
    let {heroBackground, clockImg} = this.state;
    return (
      <Image 
        source={require('../../../imgs/category-icons/pocetnabaner.jpg')}
        style={{ width: '100%', height: responsiveHeight(30)}}
      >
        <View style={{flex:1,height: responsiveHeight(30),width: responsiveWidth(100), flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>
        <MediaQuery maxDeviceWidth={500} maxDeviceHeight={740}>
          <Image
            style={{width: 80, height: 80, marginBottom: 25}}
            source={require('../../../imgs/category-icons/pocetnasat.png')} />
        </MediaQuery>
        <MediaQuery minDeviceWidth={501} minDeviceHeight={741}>
          <Image
            style={{width: 130, height: 130, marginBottom: 25}}
            source={require('../../../imgs/category-icons/pocetnasat.png')} />
        </MediaQuery>
        </View>
      </Image>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default HeroComponent;
