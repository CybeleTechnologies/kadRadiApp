import React from 'react';
import {
  Animated,
} from 'react-native';

class FadeInView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
      height: new Animated.Value(0),
    };
  }

  componentWillReceiveProps(props) {
    let { specifiedHeight } = this.props;
    if (!props.editing) {
      Animated.timing(
        this.state.fadeAnim,
        {
          toValue: this.props.liveSection ? this.props.liveSection : 50,
          duration: 50,
        }
      ).start();
      Animated.timing(
        this.state.height,
        {
          toValue: this.props.liveSection ? this.props.liveSection : 50,
          duration: 500,
        },
      ).start();
    } else {
      Animated.timing(
        this.state.fadeAnim,
        {
          toValue: 0,
          duration: 600,
        },
      ).start();
      Animated.timing(
        this.state.height,
        {
          toValue: specifiedHeight || 0,
          duration: 700,
        },
      ).start();
    }
  }
  render() {
    let { fadeAnim, height } = this.state;
    let { backgroundProp } = this.props;

    return (
      <Animated.View
        style={[{
          width: '100%',
          height,
          backgroundColor: 'white',
          opacity: fadeAnim,
        },backgroundProp]}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
export default FadeInView;