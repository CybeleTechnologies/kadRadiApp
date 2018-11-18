import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import TextFont from 'TextFont';
import WorkOrNotClock from '../CommonDumb/ListItem/WorkOrNotClock';
import ListItemReview from '../CommonDumb/ListItem/ListItemReview';
import ListItemSub from '../CommonDumb/ListItem/ListItemSub';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const ObjectList = ({ imgUrl, name, isWorking, reviewNumber, avgRating, categoryName, locations }) => (
  <View style={styles.container}>
    <Image 
      source={{ uri: imgUrl }}
      style={{ width: 80, height: 80 }}
    />
    <View style={styles.contentContainer}>
      <View style={styles.contentSub}>
        <TextFont>{ name }</TextFont>
        <ListItemReview
          reviewNumber={reviewNumber}
          avg={avgRating}
        />
      </View>
      <View style={styles.subTitleContainer}>      
        <ListItemSub
          categoryName={categoryName}
          locations={locations}
        />
        <WorkOrNotClock 
          isWorking={isWorking}
          containerStyle={{alignSelf: 'flex-end', alignItems: 'flex-end', justifyContent: 'flex-end'}}
          imgStyle={{ width: responsiveHeight(5.4), height: responsiveHeight(5.4), alignSelf: 'flex-end', alignItems: 'flex-end', justifyContent: 'flex-end' }}
        />
      </View>
    </View>
  </View>
);
let styles = StyleSheet.create({
  container: {
    width: responsiveWidth(100),
    height: 100,
    borderBottomColor: 'rgb(108, 108, 108);',
    borderTopColor: 'rgb(108, 108, 108);',
    borderBottomWidth: 0.5,
    borderTopWidth: 1,
    flexDirection: 'row',
  },
  // imgContainer: {
  //   width: responsiveWidth(41),
  //   height: responsiveHeight(21),
  //   justifyContent: 'center',
  //   alignItems: 'flex-start',
  // },
  // objImage: {
  //   width: responsiveWidth(40),
  //   height: responsiveHeight(20),
  // },
  contentContainer: {
    width: responsiveWidth(85),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentSub: {
    width: responsiveWidth(50),
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  subTitleContainer: {
    width: responsiveWidth(55),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ObjectList;
