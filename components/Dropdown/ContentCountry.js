import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import Flag from 'react-native-flags';

const ContentCountry = ({ data, onSelect }) => {
  return(
    <View>
    {
      data.map((item,key) => (
        <TouchableHighlight 
          key={key}
          onPress={() => {
            onSelect(item.title, item.code)
          }}
        >
        <View style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignContent: 'center',
          width: '100%',
          height: 32,
        }}
        >
          <Text style={{
            textAlignVertical: 'center',
            textAlign: 'center',
            fontSize: 16
            }}
          >{item.title}
          </Text>
          <Flag
            code={item.code}
            size={32}
            style={{
              alignSelf: 'center'
            }}
          />
        </View>
        </TouchableHighlight>
      ))
    }
    </View>
  );
}
export default ContentCountry;