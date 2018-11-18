import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Loader from '../CommonDumb/Loader';
import ObjectHeroComponent from './ObjectHeroComponent';
import ObjectButtonGroupContainer from './ObjectButtonGroupContainer';
import ObjectInfoTop from './ObjectInfoTop';
type State = {
  width: number,
  height: number,
}

class ObjectContainer extends React.Component<State> {
  render() {
    let {objectId} = this.props.match.params;
    return (
			  <ScrollView style={{flex: 1,backgroundColor: '#fff'}} removeClippedSubviews={true}>
          <ObjectHeroComponent objecId={objectId} />
					<View style={{marginTop: -30, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
					  <ObjectInfoTop objectId={objectId} />
            <ObjectButtonGroupContainer  objectId={objectId}/>
					 </View> 
				</ScrollView>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default ObjectContainer;
