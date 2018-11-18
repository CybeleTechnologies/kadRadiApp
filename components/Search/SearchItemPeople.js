import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import FriendOrNot from './FriendOrNot';
import TextFont from 'TextFont';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(100),
    height: responsiveHeight(21),
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  imgContainer: {
    width: responsiveWidth(41),
    height: responsiveHeight(21),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  profileImage: {
    width: responsiveWidth(40),
    height: responsiveHeight(20),
  },
  contentContainer: {
    width: responsiveWidth(52),
    height: responsiveHeight(21),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentSub: {
    width: responsiveWidth(50),
    height: responsiveHeight(18),
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  subTitleContainer: {
    width: responsiveWidth(55),
    flexDirection: 'row',
    justifyContent: 'flex-end',

  },
  title: {
    color: '#000',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    paddingLeft: 5,
    marginRight: 10,
    fontSize: 15,
    fontFamily: 'OpenSans-Regular',
  },
});
@withRouter
class SearchItemPeople extends React.Component{
  render(){
    return(
        <TouchableOpacity
          onPress={() => {
            this.props.viewProfile(this.props.data);
            this.props.history.push(`/friendsProf`);
          }}
        >
          <View style={styles.container}>
            <View style={styles.imgContainer}>
              <Image
                style={styles.profileImage}
                source={{ uri: this.props.profileImg }}
              />
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.contentSub}>
                <TextFont semibold style={styles.title} >{this.props.firstName} {this.props.lastName}</TextFont>
                <View style={styles.subTitleContainer}>
                  {
                    this.props.data.id != this.props.userProfile.id ?
                    <FriendOrNot
                      isFriend={this.props.data.isFriend}
                      friendRequest={this.props.data.friendRequest}
                      containerStyle={{alignSelf: 'flex-end', alignItems: 'flex-end', justifyContent: 'flex-end'}}
                      imgStyle={{width: responsiveHeight(9.4), height: responsiveHeight(9.4), alignSelf: 'flex-end', alignItems: 'flex-end', justifyContent: 'flex-end'}}/>
                    :
                    null
                  }
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
    )
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default withRouter(connect((state) => {return {
  userProfile: state.userProfile,
  lookAt: state.viewThisProfile,
}}, mapDispatchToProps)(SearchItemPeople));
