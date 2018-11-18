import React from 'react';
import { View } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Hero from 'react-native-hero';

const ObjectHero = ({ profileImage }) => (
  <Hero
    source={{ uri: profileImage.fileUrl }}
    renderOverlay={() => (
      <View
        style={{
          flex: 1,
          height: responsiveHeight(20),
          width: responsiveWidth(100),
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    )}
  />
);
export default ObjectHero;
