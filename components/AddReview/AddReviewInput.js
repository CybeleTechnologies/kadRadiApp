import React from 'react';
import {
  View,
  TextInput,
} from 'react-native';

const AddReviewInput = ({ updateText, texting }) => (
  <View>
    <TextInput
      style={{textAlignVertical: 'top'}}
      multiline
      numberOfLines={10}
      onChangeText={text => updateText(text)}
      value={texting}
      editable
    />
  </View>
);

export default AddReviewInput;