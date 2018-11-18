import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize, 
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import MostImportantCarousel from './MostImportantCarousel';
const style = StyleSheet.create({
  subCont: {
    flexDirection: 'row',
  },
  photoCont: {
    flexDirection: 'row',
    marginLeft: responsiveWidth(1),
    height: responsiveHeight(7),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageStyle: {
    height: responsiveWidth(6),
    width: responsiveWidth(8),
  },
  morePhoto: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
    marginLeft: 5,
    color: '#4d4d4d',
    textAlignVertical: 'center',
    fontFamily: 'OpenSans-Regular',
  },
});
const MostImportantImages = ({objectImagesArr, selectIndex}) => (
  <View style={{ width: '100%', borderTopColor: '#efefef', borderTopWidth: 1}}>
    <View style={style.subCont}>
      {
        objectImagesArr.length ?
          <MostImportantCarousel entries={objectImagesArr.slice(0, 6)} /> : null
      }
    </View>
    <View style={style.photoCont}>
      <TouchableOpacity
        onPress={() => {
          selectIndex(2);
        }}
      >
        <View style={{width: '100%', flexDirection: 'row'}}>
          <Image
            source={require('../../../../imgs/cameraIcon.png')}
            style={style.imageStyle}
          />
          <Text style={style.morePhoto}>
            VIDI VIŠE FOTOGRAFIJA
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
);
export default MostImportantImages;
