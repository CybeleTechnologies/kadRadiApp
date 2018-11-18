/* @flow */
import React from 'react';
import { View, AsyncStorage } from 'react-native';
import { withRouter } from 'react-router-dom';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import Orientation from 'react-native-orientation';
import MenuComponents from './MenuComponents';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { userProfile } from '../../reducers/incrementers';
import SideMenu from './SideMenu';

let asyncStorageCheck = "";
type Props = {
  menuVisible: boolean,
  menuVisibileNo: any,
  changeMenu: any,
  userProfile: ?Object,
  children: ?Object,
  history: any,
}

class MenuShell extends React.Component<Props>{
   async componentWillMount() {
       asyncStorageCheck = await AsyncStorage.getItem("userId");
  }
  render() {
    const MenuComponent = (
      <View style={{flex: 1, backgroundColor: "#fff", justifyContent: 'center'}}>
        <MenuComponents {...this.props}/>
      </View>
    );
    return (
      <SideMenu
      isOpen={this.props.menuVisible}
      openMenuOffset={responsiveWidth(80)}
      menuPosition="left"
      menu={MenuComponent}
      hiddenMenuOffset={0}
      autoClosing={true}
      disableGestures={this.props.userProfile.id ? false : true}
      onChange={(bla)=>{
        this.props.changeMenu(bla);
      }}>
        {this.props.children}
      </SideMenu>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default withRouter(connect((state) => {return {
  menuVisible: state.menuVisible,
  userProfile: state.userProfile,
}}, mapDispatchToProps)(MenuShell));
