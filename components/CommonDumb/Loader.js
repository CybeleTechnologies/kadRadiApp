import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import PulseLoader from 'react-native-pulse-loader';


const Loader = () => {
  return (
    <View style={styles.container}>
       <ActivityIndicator size="large" color="#0000ff" size={100} />
    </View>
  )
}
let styles = StyleSheet.create({
  container: {
    width: responsiveWidth(100),
    height: responsiveHeight(90),
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
