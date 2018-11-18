import React from 'react';
import { Text } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
/**
 * Props
 * bold
 * italic
 * light
 * semiBold
 */
class TextFont extends React.Component {
  constructor(props) {
    super(props);
    fontObj = 'OpenSans-Regular';
  }
  componentWillMount() {
    if(this.props.bold) {
      this.fontObj = 'OpenSans-Bold';
    } else if(this.props.semiBold) {
      this.fontObj = 'OpenSans-SemiBold';
    } else if(this.props.italic) {
      this.fontObj = 'OpenSans-Italic';
    } else if(this.props.extraBold) {
      this.fontObj = 'OpenSans-ExtraBold';
    } else if(this.props.light) {
      this.fontObj = 'OpenSans-Light';
    }
  }
  render() {
    return (
      <Text
        style={[{
          fontFamily: this.fontObj,
          fontSize: responsiveFontSize(1.5),
        },
        this.props.style]}
      >
        {this.props.children}
      </Text>
    );
  }
}
export default TextFont;
