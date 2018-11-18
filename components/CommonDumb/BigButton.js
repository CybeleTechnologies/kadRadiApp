import React from 'react';
import {
  TouchableOpacity,
} from 'react-native';
import TextFont from 'TextFont';

const BigButton = ({backgroundColor, title, titleStyle, containerStyle, onAction}) => {
  const localBackground = backgroundColor || '#e2303d';
  return (
    <TouchableOpacity 
      style={[{
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#a9a9a9',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: localBackground,
      }, containerStyle]}
      onPress={() => onAction()}
    >
      <TextFont
        bold
        style={[{
          textAlignVertical: 'center',
          fontSize: 19,
          color: '#fff',
        }, titleStyle]}
      >
        {title}
      </TextFont>
    </TouchableOpacity>
  );
};

export default BigButton;
