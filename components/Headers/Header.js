import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import ImageChat from '../Chat/ImageChat';
class Header extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      trta: 'IDEMOO CEKIII!'
    }
  }
    render() {
        return(
          this.props.userProfile.id ?
          <View style={{ height: 48, backgroundColor: '#f03434',zIndex: -1, flexDirection: 'row', width: '100%', justifyContent: 'flex-start'}}>
            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', width: '20%', alignItems: 'center' }}>
              <TouchableOpacity
                style={{ marginLeft: -10, marginTop: 7, height: 35, width: 72, alignItems: 'center', alignContent: 'center'}}
                disabled={this.props.location.pathname.includes('/chat') ? true : false}
                onPress={() => {
                  this.props.menuVisibile();
                }}
              >
              { this.props.location.pathname.includes('/chat') ?
                <ImageChat
                  styles={{ width: 72, height: 35 }}
                  src={this.props.chatProfile.profileInfo.profileImageUrl}
                />
                :
                <Image
                  resizeMode={'contain'}
                  style={{ width: 72, height: 35 }}
                  source={this.props.menuVisible ? null : require('../../imgs/menu.png') }/>
              }
              </TouchableOpacity>
            </View>
            {
             this.props.location.pathname === '/myProfile'?
             <View style={{flexDirection: 'column', alignItems:'center', alignSelf: 'center', width: '60%', justifyContent: 'center'}}>
                <Text style={{textAlignVertical: 'center',fontSize: 18,fontWeight: '900',color: 'white', textAlign: 'center'}}>Moj profil</Text>
             </View>:
             null
            }
            {
            this.props.location.pathname.includes('/addToYourObject')?
            <View style={{flexDirection: 'column', alignItems:'center', alignSelf: 'center', width: '60%', justifyContent: 'center'}}>
                <Text style={{textAlignVertical: 'center',fontSize: 18,fontWeight: '900',color: 'white', textAlign: 'center'}}>Dodaj kao svoj objekat</Text>
            </View>:
            null
            }
            {
            this.props.location.pathname == '/friendsProf'?
            <View style={{flexDirection: 'column', alignItems:'center', alignSelf: 'center', width: '60%', justifyContent: 'center'}}>
                <Text style={{textAlignVertical: 'center',fontSize: 18,fontWeight: '900',color: 'white', textAlign: 'center'}}>{this.props.lookAt.firstName} {this.props.lookAt.lastName}</Text>
            </View>:
            null
            }
            {
              this.props.location.pathname.includes('/chat') ?
              <View style={{flexDirection: 'column', width: '60%', justifyContent: 'center'}}>
              <Text style={{textAlignVertical: 'center',fontSize: 18,fontWeight: '900',color: 'white', textAlign: 'left'}}>{this.props.chatProfile.firstName} {this.props.chatProfile.lastName}</Text>
          </View>:
          null
            }
          <View style={{flexDirection: 'column', width: "20%"}}>
          </View>
          </View>
          :
          <View>
            {
              this.props.history.location.pathname == '/registration'?
              <View style={{height: 54, backgroundColor: '#e2303d'}}>
                <View style={{flexDirection: 'column', alignItems:'center'}}>
                  <Text style={{justifyContent: 'center',fontSize: 18,fontWeight: '900',color: 'white', marginTop: responsiveHeight(2)}}>Napravi nalog</Text>
                </View>
              </View>
              :null
            }
          </View>
        );
    }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default withRouter(connect((state) => {return {
  menuVisible: state.menuVisible,
  userProfile: state.userProfile,
  lookAt: state.viewThisProfile,
  chatProfile: state.chatProfile,
  }}, mapDispatchToProps)(Header));
