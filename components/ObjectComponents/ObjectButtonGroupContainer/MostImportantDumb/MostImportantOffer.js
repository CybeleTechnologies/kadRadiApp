import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import TextFont from 'TextFont';

const style = StyleSheet.create({
  container: {
    width: responsiveWidth(100),
    height: responsiveHeight(15),
    backgroundColor: '#019f9f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    width: '95%',
    height: responsiveHeight(15),
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topContainer: {
    height: responsiveHeight(15),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTop: {
    textAlignVertical: 'center',
    fontSize: 19,
    color: '#fff',
    paddingLeft: 5,
  },
  textBottom: {
    textAlignVertical: 'center',
    fontSize: 12,
    color: '#fff',
    paddingLeft: 5,
  },
});
const MostImportantOffer = ({ objectCl }) => (
  <View style={style.container}>
    <View style={style.subContainer}>
      <View style={style.topContainer}>
        <Image
          style={{
            width: responsiveHeight(8),
            height: responsiveHeight(8),
          }}
          source={require('../../../../imgs/akcija.png')} 
        />
        <View>
          <TextFont bold style={style.textTop}>
            Gratis pivo toceno
          </TextFont>
          <TextFont style={style.textBottom}>
            1 gratis pivo toceno
          </TextFont>
        </View>
      </View>
      <View>
        <Image
          style={{
            width: 40,
            height: 40,
          }}
          source={require('../../../../imgs/strelica.png')} />
      </View>
    </View>
  </View>
);

export default MostImportantOffer;