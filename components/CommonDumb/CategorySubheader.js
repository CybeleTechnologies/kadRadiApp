import React from 'react';
import {
  View,
} from 'react-native';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import CategoryButton from '../CommonDumb/CategoryButton';
type State = {
  width: number,
  height: number,
}

@withRouter
@connect((state) => {return {
  menuVisible: state.menuVisible,
  userProfile: state.userProfile,
  activeButton: state.activeButtonContainer,
  }}, mapDispatchToProps)
class CategorySubheader extends React.Component<State> {
  render() {
    return (
      this.props.history.location.pathname == '/search' ?
      <View style={{ flexDirection: 'row', backgroundColor: 'rgb(243, 243, 242);', width: responsiveWidth(100), height: responsiveHeight(16), justifyContent: 'flex-start', alignItems: 'flex-start',paddingTop: responsiveHeight(7),}}>
        <View style={{flexDirection: 'row', padding: 7, borderTopWidth: 1, borderTopColor: 'rgb(217, 217, 217);', width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', paddingTop: responsiveHeight(1)}}>
          <View style={{marginRight: 5,}}>
            <CategoryButton 
              buttonText="Radi sada" 
              isActive={this.props.activeButton.workingNow? true: false}
              workingNow={true}
              nearMe={false}
            />
          </View>
          <View>
            <CategoryButton 
              buttonText="Blizu mene"
              isActive={this.props.activeButton.nearMe? true: false}
              workingNow={false}
              nearMe={true}
            />
          </View>
        </View>
      </View>
      :
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#e0e0e0',
          padding: 7,
          width: responsiveWidth(100),
          justifyContent: 'flex-start',
          alignItems: 'flex-start' 
        }}
      >
        <View style={{marginRight: 5,}}>
          <CategoryButton 
            buttonText="Radi sada" 
            isActive={this.props.activeButton.workingNow? true: false}
            workingNow={true}
            nearMe={false}
          />
        </View>
        <View>
          <CategoryButton 
            buttonText="Blizu mene"
            isActive={this.props.activeButton.nearMe? true: false}
            workingNow={false}
            nearMe={true}
          />
        </View>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default CategorySubheader;
