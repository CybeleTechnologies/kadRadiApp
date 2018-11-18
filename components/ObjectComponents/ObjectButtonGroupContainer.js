import React from 'react';
import {
  View
} from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import Buttons from './ObjectComponentDumb/ObjectComponentHelper';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import ObjectContentContainer from './ObjectContentContainer';
import ObjectIconContainer from './IconContainer/ObjectIconContainer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import { withRouter } from 'react-router-dom';
class ObjectButtonGroupContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    }
  }
  updateIndex = (selectedIndex) => {
    this.setState({
      selectedIndex,
    })
  }
  render() {
    let {selectedIndex} = this.state;
    const buttonsArr = Buttons(this.props.changeButton, this.props.selectedIndexView.selectedIndex);
    return (
      <View>
        <ButtonGroup
          onPress={this.props.changeButton}
          selectedIndex={this.props.selectedIndexView.selectedIndex}
          buttons={buttonsArr}
          innerBorderStyle={{width: 0.35}}
          selectedButtonStyle={{color: '#ff0000'}}
          buttonStyle={{backgroundColor: '#fff'}}
          containerStyle={{borderRadius: 0, height: responsiveHeight(6.5), borderColor: '#e6e6e6', borderTopWidth: 0.55, borderBottomWidth: 0.55, borderLeftWidth: 0, borderRightWidth: 0, marginBottom: 0, paddingBottom: 0,}}
          containerBorderRadius={0} />
        <ObjectIconContainer />
        <ObjectContentContainer selectedIndex={this.props.selectedIndexView.selectedIndex} {...this.props}/>
      </View>
    )
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default withRouter(connect((state) => {return {
  selectedIndexView: state.selectedIndexView,
}}, mapDispatchToProps)(ObjectButtonGroupContainer));
