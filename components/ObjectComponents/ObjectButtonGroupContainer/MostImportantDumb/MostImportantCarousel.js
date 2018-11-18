
import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
} from 'react-native';
import { withRouter } from 'react-router-dom';
import Carousel from 'react-native-snap-carousel';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
const style = StyleSheet.create({
  itemCont: {
    width: responsiveWidth(38),
    height: responsiveWidth(38),
    borderWidth: 1,
    borderColor: '#d3d3d3',
    margin: responsiveWidth(0.5),
  },
  imageCarousel: {
    width: responsiveWidth(38),
    height: responsiveWidth(38),
  }
});

@withRouter
class CarouselComponent extends React.Component<State> {
  _renderItem = ({item, index}) =>  {
    return (
        <View style={style.itemCont}>
        <Image
          style={style.imageCarousel}
          source={{ uri: item.fileUrl }} 
        />
      </View>
    );
  }
  render() {
    return (
      <ScrollView style={{flex: 1,width: responsiveWidth(100)}}>
      <Carousel
        data={this.props.entries}
        renderItem={this._renderItem}
        sliderWidth={responsiveWidth(100)}
        activeSlideAlignment="start"
        activeSlideOffset={0}
        itemWidth={responsiveWidth(38)} />
        </ScrollView>
    );
  }
}

export default CarouselComponent;