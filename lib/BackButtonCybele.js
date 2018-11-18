import React from 'react'
import PropTypes from 'prop-types'
import { BackHandler } from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import {withRouter} from 'react-router-dom';

class BackButtonCybele extends React.Component {

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBack)
  }

  handleBack = () => {
    const { history } = this.props;
    
    if (!this.props.userProfile.logedIn && history.location.pathname != '/registration') {
      return false;
    }
    if (history.index === 0) {
      if (!this.props.menuVisible && !this.props.visibleLive.open){
        return false;
      }
      this.props.menuVisibileNo();
      this.props.liveVisible(false);
      return true // home screen
    } else {
        if (!this.props.menuVisible && !this.props.visibleLive.open){
          history.goBack()
        }
        if (this.props.visibleLive.open) {
          this.props.liveVisible(false);
        }
        if (this.props.menuVisible) {
          this.props.menuVisibileNo();
        }
      return true
    }
  }

  render() {
    return this.props.children || null
  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default withRouter(connect((state) => { return {
    menuVisible: state.menuVisible,
    visibleLive: state.liveIsVisible,
    userProfile: state.userProfile,
  }}, mapDispatchToProps)(BackButtonCybele));
