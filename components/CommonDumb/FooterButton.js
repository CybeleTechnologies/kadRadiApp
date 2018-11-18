import React from 'react';
import {
  View,
  Image,
} from 'react-native';
import { withRouter } from 'react-router-dom';

const FooterButton = props => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Image
      source={props.imageUrl}
      style={{
        width: 22,
        height: 22,
      }}
    />
  </View>
);

export default withRouter(FooterButton);
