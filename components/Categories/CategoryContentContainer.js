import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { List } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import CategorySubheader from '../CommonDumb/CategorySubheader';
import CategoryListItem from '../CommonDumb/ListItem';
import ListHeader from '../CommonDumb/ListHeader';
import ListHeaderSearch from '../CommonDumb/ListHeaderSearch'
import FadeInComponent from '../CommonDumb/FadeInComponent';
import SortDropdown from '../Dropdown/SortDropdown';
import SearchItemPeople from '../Search/SearchItemPeople';
import TextFont from '../../TextFont';
import _ from 'lodash';

type State = {
  width: number,
  height: number,
}
@connect((state) => {return {
  sortObjectBy: state.sortObjectBy,
  activeButton: state.activeButtonContainer,
  }}, mapDispatchToProps)
class CategoryContentContainer extends React.Component<State> {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      filtered: 'isWorking',
      kako: 'desc',
    }
  }
  viewDropdown = () => {
    this.setState(prevState => ({
      editing: !prevState.editing,
    }));
  }
  componentWillReceiveProps(nextProps) { 
    this.setState({
      filtered: nextProps.sortObjectBy.by,
      kako: nextProps.sortObjectBy.kako,
    })
  }
  render() {
    let objectCl = [];
    let peopleByName = [];
    peopleByName = this.props.data.peopleByName || [];
    if(this.props.search) {
      objectCl = this.props.data.objectsByName || [];
    } else {
      if(this.props.activeButton.nearMe) {
        if(this.props.activeButton.workingNow) {
         let blacko = this.props.data.nearestObjects
         objectCl = blacko.filter((item) => ( item.isWorking === 'true' )); 
        } else {
          objectCl = this.props.data.nearestObjects || [];
        }
      } else {
        if(this.props.activeButton.workingNow) {
          let blacko = this.props.data.nearestObjects
          objectCl = blacko.filter((item) => ( item.isWorking === 'true' )); 
         } else {
           objectCl = this.props.data.nearestObjects || [];
         }
      }
    }
    return (
      <View style={{flex:1,backgroundColor: 'white', width: responsiveWidth(100)}}>
        <CategorySubheader />
        <View style={{flex:1, flexDirection: 'column', width: responsiveWidth(100), justifyContent: 'flex-start'}}>
          <ListHeaderSearch textHeader={`Potvrđeno (${!peopleByName.length?objectCl.length:peopleByName.length + objectCl.length})`} viewDropdown={this.viewDropdown} objectCl={objectCl}/>
          <ScrollView>
            <List containerStyle={{marginBottom: 20, marginTop: 0,borderTopColor: 'rgb(108, 108, 108);'}}>
              {
                objectCl.length
                ? 
                _.orderBy(objectCl, [this.state.filtered],[this.state.kako]).map((object, i) => (
                  <CategoryListItem
                    addIdsAction={this.props.addIdsActions}
                    objectId={object.id}
                    key={i}
                    objectImg={object.images.profileImage.fileUrl}
                    keyId={i + 1}
                    avgRating={object.avgRating}
                    objectName={object.name}
                    reviewNumber={object.ratingCount}
                    categoryName={object.objectCategory.name}
                    isWorking={object.workingTimeInfo.isWorking}
                    locations={object.objectLocations}
                  />
                ))
               :
               null
              }
              {
                peopleByName.length ?
                peopleByName.map((item,k) => (
                      <SearchItemPeople
                        key={k}
                        data={item}
                        firstName={item.firstName}
                        lastName={item.lastName}
                        profileImg={item.profileInfo.profileImageUrl}
                      />
                ))
                : null
              }
            </List>
          </ScrollView>
          { 
            this.state.editing?
            <SortDropdown 
              {...this.props}
            />
            :
            null
          }
        </View>
        <View
          style={{
            width: '100%',
            padding: 13,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity>
            <Image 
              source={require('../../imgs/lista.png')}
              style={{width: 60, height: 30,}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.goToMap()}
          >
            <Image 
              source={require('../../imgs/mapa.png')} 
              style={{width: 60, height: 30,}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default CategoryContentContainer;
