import React from 'react';
import {
  View,
  Text,
  Linking,
} from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import DollarSing from './DollarSing';

const Item = ({ web, url, content, title, price, popular, phone, styleProps, priceNumber, paymentMethod }) => {
  if (web) {
    return (
      <View
        style={{
          flexDirection: 'column',
          width: responsiveWidth(48),
          margin: responsiveWidth(1),
        }}
      >
        <Text style={{ fontSize: 15, color: 'rgb(156, 155, 156)' }}>{title}</Text>
        <Text
          style={{ color: 'rgb(35, 188, 211)', fontWeight: 'bold' }}
          onPress={() => {
            if (url) {
              Linking.openURL(url);
            } else {
              // nemamo sajt
            }
          }}
        >{content}
        </Text>
      </View>
    );
  }
  if (price) {
    return (
      <View
        style={{
          flexDirection: 'column',
          width: responsiveWidth(45),
          margin: responsiveWidth(1),
          borderBottomColor: 'rgb(215, 215, 215)',
          borderBottomWidth: 1,
        }}
      >
        <DollarSing price={priceNumber} title={title} />
      </View>
    );
  }
  if (popular || paymentMethod) {
    return (
      <View
        style={{
          flexDirection: 'column',
          width: responsiveWidth(50),
          margin: responsiveWidth(1),
      }}
      >
        <Text
          style={{
            fontSize: 15,
            color: 'rgb(156, 155, 156)',
            }}
        >{title}
        </Text>
        <Text
          style={[{
            fontWeight: 'bold',
            width: responsiveWidth(40),
          },
            styleProps,
          ]}
        >
          {content}
        </Text>
        <Text
          style={{
            borderBottomColor: 'rgb(215, 215, 215)',
            borderBottomWidth: 1,
            width: responsiveWidth(45),
          }}
        />
      </View>
    );
  }
  if (phone && !content.length) {
    const noPhone = 'Nemamo telefon';
    return (
      <View
        style={{
          flexDirection: 'column',
          width: responsiveWidth(50),
          margin: responsiveWidth(1),
          }}
      >
        <Text style={{ fontSize: 15, color: 'rgb(156, 155, 156)' }}>{title}</Text>
        <Text style={[{ fontWeight: 'bold', width: responsiveWidth(40) }, styleProps]}>{noPhone}</Text>
        <Text style={{ borderBottomColor: 'rgb(215, 215, 215)', borderBottomWidth: 1, width: responsiveWidth(45) }} />
      </View>
    );
  }
  return (
    <View
      style={{
        flexDirection: 'column',
        width: responsiveWidth(50),
        margin: responsiveWidth(1),
        }}
    >
      <Text style={{ fontSize: 15, color: 'rgb(156, 155, 156)' }}>{title}</Text>
      {
        content.map((item, k) => (
          <Text key={k} style={[{ fontWeight: 'bold' }, styleProps]}>{item.number}</Text>
      ))
      }
      <Text style={{ borderBottomColor: 'rgb(215, 215, 215)', borderBottomWidth: 1, width: responsiveWidth(45) }} />
    </View>
  );
};

export default Item;
