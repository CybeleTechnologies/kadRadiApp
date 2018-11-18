import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native';
var {width} = Dimensions.get('window');
import { Link } from 'react-router-native';
import { List, ListItem } from 'react-native-elements';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../actions';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { MediaQuery } from "react-native-responsive";

type State = {
  borderWidth: number,
  iconPlaceholder: string,
}
type Props = {
  id: number,
  iconPlaceholder: string,
  to: string,
}
@withRouter
@connect((state) => {return {
  menuVisible: state.menuVisible,
  userProfile: state.userProfile,
  }}, mapDispatchToProps)

class CategoryBox extends React.Component<State> {
  constructor(props) {
    super(props);
    this.state = {
      borderWidth: 1,
      iconPlaceholder: 'http://www.myiconfinder.com/uploads/iconsets/256-256-d24fd0303074bded268334939fdc34bf.png',
      to: '/',
    }
  }
  componentWillMount() {
    let {id} = this.props;
    if(id % 3 == 0) {
      this.setState({
        borderWidth: 0,
      })
    }
    if(typeof this.props.iconPlaceholder != 'undefined') {
      let {iconPlaceholder} = this.props;
      this.setState({
        iconPlaceholder,
      })
    }
    if(typeof this.props.to != 'undefined') {
      let {to} = this.props;
      this.setState({
        to,
      })
    }
  }

  render() {
    let {borderWidth, iconPlaceholder, to} = this.state;
    let {catName} = this.props;
    return (
      <Link to={to}>
      <TouchableOpacity
        style={{
          flexDirection: 'column',
          backgroundColor: 'white',
          width: responsiveWidth(33.3),
          height: "100%",
          alignItems: 'center',
          justifyContent: 'center',
          borderRightColor: '#f6f6f6',
          borderBottomColor: '#f6f6f6',
          borderBottomWidth: 1,
          borderRightWidth: 1,

        }}
        onPress={() => this.props.history.push(to)}>
        <View style={{width: responsiveWidth(10), height: responsiveWidth(8), alignItems: 'center', justifyContent: 'center',}}>
          <MediaQuery maxDeviceWidth={500} maxDeviceHeight={740}>
            <Image
              style={{width: 45, height: 45, marginTop: responsiveHeight(2.5)}}
              source={iconPlaceholder} />
          </MediaQuery>
          <MediaQuery minDeviceWidth={501} minDeviceHeight={741}>
            <Image
              style={{width: 70, height: 70, marginTop: responsiveHeight(3.5)}}
              source={iconPlaceholder} />
          </MediaQuery>
        </View>
        <View style={{width: responsiveWidth(33.3), justifyContent: 'center', alignItems: 'center', marginTop: 20,}}>
          <Text 
            style={{
              fontSize: responsiveFontSize(1.4), 
              textAlignVertical: 'center',
              fontFamily: 'OpenSans-SemiBold',
              color: "#4d4d4d",
            }}
          >
            {catName}
          </Text>
        </View>
      </TouchableOpacity>
      </Link>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default CategoryBox;
