import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import Carousel from 'react-native-snap-carousel';
import { 
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Loader from '../CommonDumb/Loader';
import TextFont from 'TextFont';
type State = {
  entries: any,
}
const entitys = [
    {id: 1, name: 'Banke', linkImg: require('../../imgs/category-icons/Banke.png')},
    {id: 2, name: 'Apoteke', linkImg: require('../../imgs/category-icons/Apoteke@2x.png')},
    {id: 3, name: 'Brza hrana', linkImg: require('../../imgs/category-icons/Brza-Hrana.png')},
    {id: 4, name: 'Hoteli', linkImg: require('../../imgs/category-icons/Hoteli.png')},
    {id: 5, name: 'Klinike', linkImg: require('../../imgs/category-icons/Klinike.png')},
    {id: 6, name: 'Kafići', linkImg: require('../../imgs/category-icons/Kafici.png')},
]

@withRouter
@connect(state => {return {
  liveActive: state.liveActive,
}}, mapDispatchToProps)
class LiveCarousel extends React.Component<State> {
  _renderItem = ({item, index}) =>  {
    const active = this.props.liveActive.activeId === item.id;
    return (
      <TouchableOpacity
        onPress={() => this.props.addInLiveActiveId(item.id)}
      >
        <View
          style={{
            width: responsiveWidth(17),
            height: responsiveWidth(17),
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: active ? '#f03434' : '#fff',
              borderRadius: 5,
              width: responsiveWidth(15),
              height: responsiveWidth(15),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              style={{
                width: responsiveWidth(8),
                height: responsiveWidth(8),
                marginBottom: responsiveWidth(1),
              }}
              source={item.linkImg}
            />
            <TextFont
              style={{
                color: active ? '#fff' : '#000',
                fontSize: responsiveFontSize(1.3),
              }}
            >{item.name}</TextFont>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    console.log("JA SAM PROPS ", this.props.liveActive.activeId);
    return (
      <View
        style={{
          height: responsiveWidth(17),
        }}
      >
        <ScrollView style={{flex: 1,width: responsiveWidth(100), height: responsiveWidth(17)}}>
          <Carousel
            data={entitys}
            onSnapToItem={(ind) => {}}
            renderItem={this._renderItem}
            sliderWidth={responsiveWidth(100)}
            activeSlideAlignment="start"
            activeSlideOffset={0}
            itemWidth={responsiveWidth(20)} 
          />
        </ScrollView>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default LiveCarousel;
