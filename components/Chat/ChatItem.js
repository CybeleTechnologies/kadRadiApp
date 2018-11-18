import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import TextFont from 'TextFont';
const ChatItem = ({ chatName, chatMessage, me }) => (
  <View 
    style={{
      width: '95%',
      backgroundColor: me ? '#c7efee' : 'white',
      borderTopLeftRadius: me ? 8 : 0,
      borderTopRightRadius: me ? 0 : 8,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      margin: '2.5%',
      padding: '2.5%',
    }}
  >
    <TextFont style={{ textAlign: me ? 'right' : 'left', textAlignVertical: 'center', fontSize: 14}} light>{chatMessage}</TextFont>
  </View>
)
export default ChatItem;