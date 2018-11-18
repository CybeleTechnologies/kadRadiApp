import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import TextFont from 'TextFont';

const styles = StyleSheet.create({
  notifMain: {
    borderTopColor: '#e6e6e6',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: responsiveHeight(9),
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifContainer: {
    flexDirection: 'row',
    height: responsiveHeight(9),
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
  notifContainerLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  notifContainerLeftImage: {
    width: responsiveHeight(5),
    height: responsiveHeight(5),
  },
});

const NotificationContainer = ({
  leftIcon,
  leftTitle,
  rightIcon,
  notifMainProps,
  leftIconStyle,
  rightContainer,
  leftTitleContainer,
  leftTitleStyle,
  rightIconStyle,
  onPressNotification,
}) => (
  <TouchableOpacity
    onPress={() =>
      onPressNotification ? onPressNotification() : console.log("MONGOOSE")
    }
    style={[styles.notifMain, notifMainProps]}
  >
    <View style={styles.notifContainer}>
      <View style={styles.notifContainerLeft}>
        <Image
          style={[styles.notifContainerLeftImage, leftIconStyle]}
          source={leftIcon}
        />
        <View
          style={[
            { paddingLeft: responsiveWidth(2), width: '75%' },
            leftTitleContainer,
          ]}
        >
          <TextFont style={[{ color: '#019f9f' }, leftTitleStyle]}>
            {leftTitle}
          </TextFont>
        </View>
      </View>
      <View
        style={[
          { justifyContent: 'center', alignItems: 'flex-end' },
          rightContainer,
        ]}
      >
        <Image
          source={rightIcon}
          style={[
            {
              width: responsiveHeight(3.2),
              height: responsiveHeight(3.2),
            },
            rightIconStyle,
          ]}
        />
      </View>
    </View>
  </TouchableOpacity>
);

export default NotificationContainer;
