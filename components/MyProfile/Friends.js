import React, { Component } from 'react';
import { View, Text, Image, ScrollView   } from 'react-native';
import TextFont from 'TextFont';

const Friends = ({firstName, lastName, profileImageSrc}) => (
  <ScrollView>
    <View style={{backgroundColor: 'white', height: 80, flexDirection: 'row',  paddingTop: 10, paddingLeft: 10, borderTopWidth: 1, borderBottomWidth: 0.5, borderBottomColor: 'rgb(108, 108, 108)', borderTopColor: 'rgb(108, 108, 108)' }}>
      <Image source={{uri: profileImageSrc}} style={{ width: 60, height: 60, padding: 5, borderRadius: 60/2}} />
      <TextFont style={{fontSize: 14, paddingTop: 15, paddingLeft: 5}} bold>{firstName} {lastName}</TextFont>
    </View>
   

  </ScrollView>
);

export default Friends;
