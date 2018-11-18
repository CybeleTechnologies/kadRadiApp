import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize, } from 'react-native-responsive-dimensions';
import TextFont from 'TextFont';
const ListItemTitle = ({titleIcon, keyId, objectName}) => {
  return (
    <View style={styles.titleContainer}>
      <Image style={styles.titleIco} source={require('../../../imgs/krug.png')} >
        <TextFont semibold style={styles.titleNo}>
          {keyId}
        </TextFont>
      </Image>
      <Text style={styles.title}>
        {objectName}
      </Text>
    </View>
  )
}
let styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    height: responsiveHeight(6),
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleIco: {
    width: responsiveHeight(6),
    height: responsiveHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  titleNo: {
    color: '#fff',
    textAlignVertical: 'center',
    fontSize: responsiveFontSize(3.3),
  },
  title: {
    color: '#000',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    paddingLeft: 5,
    marginRight: 10,
    fontSize: 15,
    fontFamily: 'OpenSans-Regular',
  },
});

export default ListItemTitle;
