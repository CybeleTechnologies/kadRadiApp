import React from 'react';
import {
  View,
} from 'react-native';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../actions';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { SearchBar } from 'react-native-elements'

@withRouter
@connect((state) => {return {
  userProfile: state.userProfile,
  }}, mapDispatchToProps)
class SearchComponent extends React.Component<State> {
  render() {
    return (
      <View style={{width: responsiveWidth(85), alignSelf: 'center'}}>
        <SearchBar
          containerStyle={[{backgroundColor: 'rgba(0,0,0,0)',borderTopWidth: 0, borderTopColor: 'rgba(0,0,0,0)', borderBottomWidth: 0, borderBottomColor: 'rgba(0,0,0,0)'}, this.props.containerStyle]}
          inputStyle={{
            backgroundColor: 'white',
            borderWidth: 1,
            borderRadius: 10,
            borderColor: '#ddd',
            borderBottomWidth: 0,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
          }}
          icon={{color: '#ff0000'}}
          returnKeyType='search'
          onSubmitEditing={() => {
            if (this.props.home) {
              this.props.history.push('/search')
            }
          }}
          placeholderStyle={{fontFamily: 'OpenSans-Regular',}}
          placeholder='Traži Apoteke, Banke, Restorane i slično...' 
          onChangeText={(value) => {
            this.props.setSearchString(value);
          }}
          />
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default SearchComponent;
