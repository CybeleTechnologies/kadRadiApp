import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import TextFont from 'TextFont';

const styles = StyleSheet.create({
  container: {
    paddingLeft: responsiveWidth(2),
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    backgroundColor: '#f2f2f2',
    height: responsiveHeight(8.3),
  },
  title: {
    fontSize: responsiveFontSize(2.2),
    textAlignVertical: 'center',
  },
});

const MostImportantTitle = ({title, titleStyle, viewStyle}) => (
  <View style={[styles.container, viewStyle]}>
    <TextFont semiBold style={[styles.title, titleStyle]}>
      {title}
    </TextFont>
  </View>
);

export default MostImportantTitle;