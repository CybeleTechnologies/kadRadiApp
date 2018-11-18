import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
import TextFont from 'TextFont';
import BigButton from '../CommonDumb/BigButton';

const style = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#fff',
  },
  textContainer: {
    flex: 1,
    padding: 10,
    paddingTop: 15,
  },
  buttonContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
  },
});

class LiveResponse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      subject: '',
    };
  }
  componentWillMount() {
    const { subject } = this.props.match.params || '';
    this.setState({
      subject,
    });
  }
  render() {
    const { subject, text } = this.state;
    return (
      <View style={style.container}>
        <View style={style.textContainer}>
          <TextFont
            bold
            style={{
              fontSize: 20,
              color: '#019f9f',
            }}
          >
            {subject}
          </TextFont>
        </View>
        <View style={{ flex: 5, paddingLeft: 10 }}>
          <TextInput
            style={{ textAlignVertical: 'top' }}
            multiline
            numberOfLines={13}
            onChangeText={textFromInput => this.setState({ text: textFromInput })}
            value={text}
            editable
          />
        </View>
        <View style={style.buttonContainer}>
          <BigButton
            title="Odgovori"
            containerStyle={{
              width: '98%',
            }}
            onAction={() => {
               // ovde ide
            }}
          />
        </View>
      </View>
    );
  }
}
export default LiveResponse;
