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
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ActionCreators } from '../../../actions';
import Carousel from 'react-native-snap-carousel';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Loader from '../../CommonDumb/Loader';
@withRouter
@connect(state => { return {
  recentlySeen: state.recentlySeen,
}}, mapDispatchToProps)
@graphql(
  gql` query objectArray($ids: [Int]) {
    objectArray(ids: $ids){
      id
      name
      avgRating
      ratingCount
      objectCategory {
        name
      }
      images {
        profileImage {
          fileUrl
          desc
        }
      }
      workingTimeInfo {
        isWorking
      }
    }
  }`,
  {
    options: (props) => ({
      variables: {
        ids: props.recentlySeen.ids,
      }
    })
  }
)
class CarouselComponent extends React.Component<State> {
  _renderItem = ({item, index}) =>  {
    return (
      <TouchableOpacity
        onPress={() => this.props.history.push(`/object-page/${item.id}`)}
      >
        <View style={{flex:1, margin: 5, width: responsiveWidth(70), height: 230, backgroundColor: '#fff', borderColor: '#efefef', borderWidth: 1,borderTopLeftRadius: 5, borderTopRightRadius: 5}}>
          <Image source={{uri: item.images.profileImage.fileUrl}} style={{width: responsiveWidth(68), height: 140, borderTopLeftRadius: 5, borderTopRightRadius: 5}}/>
          <View style={{flex: 1, flexDirection: 'row', paddingLeft: 5,}}>
            <View style={{flex: 1.5, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
              <Text 
                style={{
                  fontSize: 13,
                  fontFamily: 'OpenSans-Bold',
                }}
              >
                { item.name }
              </Text>
              <Text 
                style={{
                  fontSize: 11,
                  fontFamily: 'OpenSans-Regular',
                }}
              >
                {`${item.ratingCount} Reviews`}
              </Text>
              <Text 
                style={{
                  fontSize: 10,
                  fontFamily: 'OpenSans-Regular',
                }}
              >
                {item.desc}
              </Text>
            </View>
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', paddingRight: 5,}}>
              <Image
                style={{width: 70, height: 70}}
                source={item.workingTimeInfo.isWorking ? require('../../../imgs/sat-radi.png') : require('../../../imgs/sat-neradi.png')} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    let niz = [];
    niz = this.props.data.objectArray || [];
    return (
      <ScrollView style={{flex: 1,width: responsiveWidth(100)}}>
        {
          this.props.data.loading ? 
            <Loader /> :
            <Carousel
              data={niz}
              renderItem={this._renderItem}
              sliderWidth={responsiveWidth(100)}
              activeSlideAlignment="start"
              activeSlideOffset={0}
              itemWidth={responsiveWidth(70)} 
            />
        }
      </ScrollView>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default CarouselComponent;
