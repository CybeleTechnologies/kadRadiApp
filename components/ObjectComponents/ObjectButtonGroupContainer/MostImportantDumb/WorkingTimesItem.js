import React from 'react';
import {
  View,
} from 'react-native';
import TextFont from 'TextFont';

const WorkingTimesItem = ({ additionalInfo, period }) => {
  return (
    <View
      style={{
        width: '100%',
        borderBottomColor: 'rgb(190, 190, 190)',
        borderBottomWidth: 0.5,
      }}
    >
      {
        additionalInfo && additionalInfo.opening !== '' && additionalInfo.closing !== ''
        ?
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TextFont
              bold
              style={{
                fontSize: 15,
                color: 'rgb(59, 77, 85);',
                paddingLeft: 10,
                textAlign: 'center',
              }}
            >
              {`${period}`}
            </TextFont>
            <TextFont
              style={{
                fontSize: 15,
                color: 'rgb(154, 154, 154)',
                paddingRight: 10,
                textAlign: 'center',
              }}
            >
              {`${additionalInfo.opening.substring(0, 2)}.${additionalInfo.opening.substring(2, 4)} - ${additionalInfo.closing.substring(0, 2)}.${additionalInfo.closing.substring(2, 4)}`}
            </TextFont>
          </View>
        :
          <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextFont
              bold
              style={{
                fontSize: 15,
                color: 'rgb(59, 77, 85);',
                paddingLeft: 10,
                textAlign: 'center',
              }}
            >
              {`${period}`}
            </TextFont>
            <TextFont
              style={{
                fontSize: 15,
                color: 'rgb(154, 154, 154)',
                paddingRight: 10,
                textAlign: 'center',
              }}
            >
              Zatvoreno
            </TextFont>
          </View>
        }
    </View>
  );
};
export default WorkingTimesItem;
