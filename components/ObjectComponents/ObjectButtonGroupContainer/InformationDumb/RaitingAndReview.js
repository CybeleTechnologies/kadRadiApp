import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  ToastAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../actions';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';
import Loader from '../../../CommonDumb/Loader';
import { Rating } from 'react-native-ratings';
import RewItem from '../MostImportantDumb/MostImportantReviews/RewItem';
import BigButton from '../../../CommonDumb/BigButton';
import _ from 'lodash';
import Reviews from './Reviews';
import StarRating from 'react-native-star-rating';
@withRouter
class ReatingAndReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          reviews: [],
          page: 1,
        }
    }
    render() {
        return (
            <View>
                <View style={{flexDirection: 'row', width: responsiveWidth(100)}}>
                    <View style={{ flexDirection: 'column', width: responsiveWidth(40), justifyContent: 'center', alignItems: 'flex-end', paddingRight: 5}}>
                    <StarRating 
                      disabled={true}
                      emptyStar={require('../../../../imgs/ratingEmpty.png')}
                      fullStar={require('../../../../imgs/ratingFull.png')}
                      halfStar={require('../../../../imgs/ratingHalf.png')}
                      iconSet={'Ionicons'}
                      maxStars={5}
                      starSize={20}
                      rating={parseFloat(this.props.avg)}
                    />
                        <View style={{ flexDirection: 'row', width: '100%', borderBottomColor: '#a9a9a9', borderBottomWidth: 1,paddingTop: 5}} /> 
                    </View>
                    <View style={{ flexDirection: 'column', width: responsiveWidth(20)}}>
                    <Image 
                        style={{width: responsiveWidth(20),height: responsiveHeight(15),resizeMode: 'center', justifyContent: 'center', alignContent:'center',alignItems: 'center'}}        
                        source={require('../../../../imgs/ikonica-ocena.png')}>
                        <Text style={{fontSize: 30, fontWeight: 'bold', color: 'white'}}>{this.props.avg}</Text>
                    </Image>
                    </View>
                    <View style={{ flexDirection: 'column', width: responsiveWidth(40), justifyContent: 'center', alignItems: 'flex-start'}}>
                      <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fda14c'}}>  {this.props.count} utisaka</Text>
                      <View style={{ flexDirection: 'row', width: '97%', borderBottomColor: '#a9a9a9', borderBottomWidth: 1,marginLeft: '3%', paddingTop: 3}} />
                    </View>  
                </View>
               <Reviews objectId={this.props.match.params.objectId} userProfile={this.props.userProfile}/>
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(({ userProfile }) => ({
    userProfile,
  }), mapDispatchToProps)(ReatingAndReview);