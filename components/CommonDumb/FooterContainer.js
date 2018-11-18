import React from 'react';
import {
  View,
  Text,
  Dimensions,
} from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import buttons from './FooterHelper';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import FadeInComponent from './FadeInComponent';
import LiveContainer from '../Live/LiveContainer';
type State = {
  width: number,
  height: number,
}

class FooterContainer extends React.Component<State> {
  constructor(props) {
    super(props);
    const {width, height} = Dimensions.get('window');
    this.state = {
      height,
      width,
      selectedIndex: 0,
      myText: 'I\'m ready to get swiped!',
      gestureName: 'none',
      backgroundColor: '#fff',
      editing: true,
    }
  }

  updateIndex = (selectedIndex) => {
    this.setState({
      selectedIndex,
      editing: true
    })
    this.props.liveVisible(false);
    if (selectedIndex == 0) {
      this.props.history.push('/')
    }
    if (selectedIndex == 1) {
      this.props.history.push('/search');
    }
    if ( selectedIndex == 2) {
      this.props.history.push('/notifications');
    }
    if ( selectedIndex == 3) {
      this.props.history.push('/myProfile');
    }
  }

  onSwipeUp(gestureState) {
    this.setState({editing: false});
    this.props.liveVisible(true);
  }
 
  onSwipeDown(gestureState) {
    this.setState({myText: 'You swiped down!'});
    this.props.liveVisible(false);
  }
 
  onSwipe(gestureName, gestureState) {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    this.setState({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_UP:
        this.setState({editing: false,});
        this.props.liveVisible(true);
        break;
      case SWIPE_DOWN:
        this.setState({editing: true,});
        this.props.liveVisible(false);
        break;
    }
  }

  render() {
    const { selectedIndex } = this.state;
    const buttonsArr = buttons(this.updateIndex);
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
    return (
        this.props.userProfile.id?
        !this.props.history.location.pathname.includes('/camera-container')?
      <GestureRecognizer
        onSwipe={(direction, state) => this.onSwipe(direction, state)}
        onSwipeUp={(state) => this.onSwipeUp(state)}
        onSwipeDown={(state) => this.onSwipeDown(state)}
        config={config}
        style={{
          backgroundColor: this.state.backgroundColor
        }}
      >
        <View>
          <ButtonGroup
            buttonStyle={{borderLeftWidth: 0, borderRightColor: 0,}}
            innerBorderStyle={{width: 0, color: '#f9f9f9'}}
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttonsArr}
            containerStyle={{height: 50, width: responsiveWidth(100), paddingTop:0, marginTop: 0, paddingLeft: 0, marginLeft: 0, marginBottom: 0, paddingBottom: 0,}} 
          />
        </View>
        <FadeInComponent 
          editing={!this.props.visibleLive.open}
          liveSection={this.state.height}
        >
            <LiveContainer />
          
        </FadeInComponent>
      </GestureRecognizer>
      :
        null
      :null
    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default withRouter(connect((state) => {return {
  userProfile: state.userProfile,
  visibleLive: state.liveIsVisible,
  }}, mapDispatchToProps)(FooterContainer));
