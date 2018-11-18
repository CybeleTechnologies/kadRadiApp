import React from 'react';
import { View } from 'react-native';
import StarRating from 'react-native-star-rating';
import { responsiveWidth } from 'react-native-responsive-dimensions';

export default class AddReviewRating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            default: 0,
        }
    }
    onStarRatingPress = (prop) => {
        this.setState({
          default: prop,
        })
    }
    render() {
      return (
        <View style={[{width: responsiveWidth(100), flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }, this.props.containerStyle]}>
          <StarRating
            disabled={this.props.disabled || false}
            emptyStar={this.props.ratingEmpty || require('../../imgs/ratingEmpty.png')}
            fullStar={this.props.ratingFull || require('../../imgs/ratingFull.png')}
            halfStar={this.props.halfRating || require('../../imgs/ratingHalf.png')}
            iconSet={'Ionicons'}
            maxStars={5}
            buttonStyle={{paddingLeft: 2, paddingRight: 2,}}
            selectedStar={(rating) => this.props.onStarRatingPress(rating)}
            starSize={this.props.starSize || 40}
            rating={this.props.starsDefault}
          />
        </View>
      )
  }   
}

