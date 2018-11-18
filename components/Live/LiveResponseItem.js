import React from 'react';
import {
  View,
  Image,
} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import TextFont from 'TextFont';

const LiveResponseItem = ({ 
imgUrl, itemTitle = '', itemText = '', imageRespons, commentsCount = 0, dateFound = '', responsed, answered
 }) => (
  <View>
    <View
      style={{
        borderBottomColor: '#b5b5b4',
        borderBottomWidth: 1,
        width: responsiveWidth(100),
        flexDirection: 'row',
        height: responsiveHeight(18),
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: responsiveWidth(16),
          height: responsiveHeight(15),
          alignItems: 'center',
        }}
      >
        <Image
          source={{ uri: imgUrl }}
          style={{
            width: responsiveWidth(12),
            height: responsiveWidth(12),
            borderRadius: 75,
            justifyContent: 'flex-start',
          }}
        />
      </View>
      <View
        style={{
          width: responsiveWidth(49),
          height: responsiveHeight(15),
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <View>
          <TextFont
            style={{
              color: 'rgb(43, 157, 157)',
              fontSize: responsiveFontSize(1.7),
            }}
          >
            {itemTitle}
          </TextFont>
          <TextFont
            style={{
              fontSize: responsiveFontSize(1.5),
              color: '#666',
            }}
          >
            {itemText}
          </TextFont>
        </View>
        <View
          style={{
            width: responsiveWidth(49),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <TextFont
            style={{
              fontSize: responsiveFontSize(1.3),
            }}
          >
            {`Komentara: ${commentsCount}`}
          </TextFont>
          <TextFont
            style={{
              fontSize: responsiveFontSize(1.3),
            }}
          >
            {`Datum: ${dateFound}`}
          </TextFont>
        </View>
      </View>
      <View
        style={{
          width: responsiveWidth(35),
          height: responsiveHeight(15),
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          paddingLeft: 10,
        }}
      >
        <View
          style={{
            width: responsiveWidth(35),
            height: responsiveHeight(11),
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Image
            source={
              responsed ?
                require('../../imgs/LiveIsAnswered.png')
                :
                require('../../imgs/LiveNotAnswered.png')
              }
            style={{
              width: responsiveWidth(12),
              height: responsiveWidth(12),
            }}
          />
          {
            responsed ?
              <TextFont style={{ color: '#46CB59' }}>odgovor je dobijen.</TextFont>
            :
              <TextFont style={{ color: '#FEA832' }}>
              Ceka se odgovor.
              </TextFont>
          }

        </View>
      </View>
    </View>
  </View>
);

export default LiveResponseItem;
