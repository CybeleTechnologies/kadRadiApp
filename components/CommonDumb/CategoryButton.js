import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import TextFont from 'TextFont';
type State = {
  width: number,
  height: number,
}
@connect((state) => {return {
  menuVisible: state.menuVisible,
  userProfile: state.userProfile,
  activeButton: state.activeButtonContainer,
  }}, mapDispatchToProps)
class CategoryButton extends React.Component<State> {
  render() {
    let {isActive, buttonText} = this.props;
    return (
      <View 
        style={{
          alignItems: 'center', 
          alignSelf: 'center', 
          backgroundColor: isActive ? '#f03434'  : '#fff', 
          borderWidth: 1, 
          borderColor: isActive ? '#f03434' : '#000', 
          height: 40,
          borderRadius: 5, 
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: 'row', 
            alignSelf: 'center', 
            alignItems: 'center',
            justifyContent: 'center', 
            height: 40,
            padding: 5,
            marginTop: -1,
          }}
          onPress={() => {
            if(this.props.workingNow) {
              this.props.selectButtonWorkingNow(!this.props.activeButton.workingNow)
            } 
            if(this.props.nearMe) {
              this.props.selectButtonNearMe(!this.props.activeButton.nearMe)
            }
          }}>
          <Image
            source={this.props.workingNow? require('../../imgs/radisada.png'): require('../../imgs/blizumene.png')}
            style={{width: 30, height: 30}}
          />
          <TextFont 
            style={{
              paddingLeft: 3,
              fontSize: responsiveFontSize(1.9),
              textAlignVertical: 'center',
              color: isActive ? '#fff' : '#adadad',
            }}
          >
            {buttonText}
          </TextFont>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default CategoryButton;
