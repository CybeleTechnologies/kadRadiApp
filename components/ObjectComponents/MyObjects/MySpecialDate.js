import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import TextFont from '../../../TextFont';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { CheckBox } from 'react-native-elements';
import Loader from '../../CommonDumb/Loader';
import { withRouter } from 'react-router-dom';
import BigButton from '../../CommonDumb/BigButton';
import moment from 'moment';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../actions';

@connect((state) => {return {
  userProfile: state.userProfile,
  }}, mapDispatchToProps)

@withRouter
@graphql(
  gql` query objectCl($id: Int) {
    objectCl(id: $id){
      workingTimeInfo {
        specialTime {
          id
          date
          opening
          closing
          icon
        }
      }
    }
  }`,
  {
    options: (props) => ({
      variables: {
        id: props.match.params.myObjectId,
      },
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true,
    })
  }
)
@graphql(
  gql`mutation createSpecialTime($objectClId: Int!, $token: String!, $date: String!, $opening: String!, $closing: String!, $icon: String!, $name: String!) {
    createSpecialTime(objectClId: $objectClId, token: $token, date: $date, opening: $opening, closing: $closing, icon: $icon, name: $name) {
      success
      error
    }
  }`, 
  {
    name: 'makeNewSpecific',
  }
)
@graphql(
  gql`mutation deleteSpecialTime($objectClId: Int!, $token: String!, $specialTimeId: Int!) {
    deleteSpecialTime(objectClId: $objectClId, token: $token, specialTimeId: $specialTimeId) {
      success
      error
    }
  }`, 
  {
    name: 'deleteSpecific',
  }
)
class MySpecialDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      date: '',
      isVisibleTime: false,
      od: '',
      do: '',
      odVisible: false,
      doVisible: false,
      imageUrl: '',
      selected: '',
      name: '',
    }
  }
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    this._hideDateTimePicker();
  };

  selectImage = (url, selected) => {
    this.setState({
      imageUrl: url,
      selected: selected,
    })
  }
  cuttingString = str1 => {
    let hour = str1.slice(0,2);
    let minutes = str1.slice(2,4);
    let result = hour + ' : ' + minutes;
    return result;
  }
  saveSpecial = async () => {
    let { token } = this.props.userProfile;
    let { myObjectId } = this.props.match.params;
    let tmp = this.state.date.split('/');
    let date = tmp[1] + '.' + tmp[0] + '.' + tmp[2];
    let { data } = await this.props.makeNewSpecific(
      {
        variables: {
          objectClId: myObjectId,
          token,
          date,
          opening: this.state.od,
          closing: this.state.do,
          icon: this.state.imageUrl,
          name: this.state.name
        }
      }
    )
    if (data.createSpecialTime.success) {
      ToastAndroid.show("Upesno dodat specijalni datum!", ToastAndroid.SHORT)
      await this.props.data.refetch({
        id: myObjectId
      })
    } else {
      ToastAndroid.show("Greska pri dodavanju specijalnih datuma!", ToastAndroid.SHORT)
    }
  }
  
  deleteSpecial = async (specialTimeId) => {
    let { token } = this.props.userProfile;
    let { myObjectId } = this.props.match.params;
    let { data } = await this.props.deleteSpecific(
      {
        variables: {
          objectClId: myObjectId,
          token,
          specialTimeId, 
        }
      }
    )
    if (data.deleteSpecialTime.success) {
      ToastAndroid.show("Upesno uklonjen specijalni datum!", ToastAndroid.SHORT)
      await this.props.data.refetch({
        id: myObjectId
      })   
    } else {
      ToastAndroid.show("Greska prilokom brisanja specijalnih datuma!", ToastAndroid.SHORT) 
    }
  }
  render() {
    let od = this.cuttingString(this.state.od);
    let doo = this.cuttingString(this.state.do);
    let [ first ]  = this.props.data.objectCl || [];
    let { workingTimeInfo } = first || {};
    let { specialTime } = workingTimeInfo || [];
    return (
      this.props.data.loading 
        ?
        <Loader />
        :
      <View style={{flex: 1, backgroundColor: 'rgb(43, 157, 157)', alignContent: 'center', alignItems: 'center'}}>
        <View style={{width: '80%'}}>
          <TextInput
            underlineColorAndroid="transparent"
            style={{
              borderColor: 'transparent',
              borderRadius: 10,
              backgroundColor: 'white',
            }}
            placeholderTextColor="black"
            placeholder="Naziv"
            disableFullscreenUI
            onChangeText={name => this.setState({
              name,
            })}
          />
        </View>
        <View style={{width: '100%', height: responsiveHeight(10), flexDirection: 'column'}}>
          <Text style={{ textAlign: 'center', textAlignVertical: 'center'}}>{this.state.date}</Text>
          <TouchableOpacity
            onPress={this._showDateTimePicker}
            style={{justifyContent: 'center', width: '100%', alignItems: 'center', alignContent: 'center'}}
          >
            <Text style={{ textAlign: 'center', textAlignVertical: 'center'}}>Izaberite specificni datum</Text>
            <Image 
              source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7-Qv4zQzQw6x-S7FKQ1WcdKhh6U3FACyaAbaapTOzHsuqs0qv'}}
              style={{width: 30, height: 30}}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        </View>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={(e)=> {
            let date = moment(e).format('L');
            this.setState({
              date
            })
          }}
          onCancel={() => this._hideDateTimePicker()}
          mode="date"
          is24Hour={false}
        />
        <View style={{width: '100%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
          <View style={{width: '50%', height: responsiveHeight(10), justifyContent: 'center'}}>
            <Text style={{ textAlign: 'center', textAlignVertical: 'center'}}>{od}</Text>
            <TouchableOpacity 
              onPress={() => {
                this.setState({
                  odVisible: true,
                  isVisibleTime: true,
                })
              }}
              style={{justifyContent: 'center', width: '100%', alignItems: 'center', alignContent: 'center'}}
            >
              <Text style={{ textAlign: 'center'}}>Izaberi vreme od</Text>
              <Image 
                source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7-Qv4zQzQw6x-S7FKQ1WcdKhh6U3FACyaAbaapTOzHsuqs0qv'}}
                style={{width: 30, height: 30}}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>
          <View style={{width: '50%', height: responsiveHeight(10), justifyContent: 'center'}}>
            <Text style={{ textAlign: 'center', textAlignVertical: 'center'}}>{doo}</Text>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  doVisible: true,
                  isVisibleTime: true,
                })
              }}
              style={{justifyContent: 'center', width: '100%', alignItems: 'center', alignContent: 'center'}}
            >
            <Text style={{ textAlign: 'center'}}>Izaberi vreme do</Text>
            <Image 
              source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7-Qv4zQzQw6x-S7FKQ1WcdKhh6U3FACyaAbaapTOzHsuqs0qv'}}
              style={{width: 30, height: 30}}
              resizeMode={'contain'}
            />
            </TouchableOpacity>
          </View>
        </View>
        <DateTimePicker
            isVisible={this.state.isVisibleTime}
            onConfirm={(e)=> {
              let time = '';
              if (e.getHours() < 10) {
                time = '0' + e.getHours();
                if (e.getMinutes() < 10) {
                  time = time + '0' + e.getMinutes();
                } else {
                  time = time + '' + e.getMinutes();
                }
              } else {
                time = e.getHours();
                if (e.getMinutes() < 10) {
                  time = time + '0' + e.getMinutes();
                } else {
                  time = time + '' + e.getMinutes();
                }
              }
              if(this.state.odVisible){
                this.setState({
                  isVisibleTime: false,
                  od: time,
                  odVisible: false,
                })
              } else {
                this.setState({
                  isVisibleTime: false,
                  do: time,
                  doVisible: false,
                })
              }
            }}
            onCancel={() => this._hideDateTimePicker()}
            mode="time"
            is24Hour={false}
          />
          <View style={{ width: '100%', height: 50, flexDirection: 'row'}}>
            <View style={ this.state.selected === 0 ? { width: '33%', backgroundColor: 'red'} : {width: '33%'}}>
              <TouchableOpacity
                onPress={() => {
                  this.selectImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiPGEOrHQuD4vE04zaJvMDwlyFGgFLJ6RdLb3ex4oo4qchZkoQ', 0);
                }}
              >
              <Image 
                source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiPGEOrHQuD4vE04zaJvMDwlyFGgFLJ6RdLb3ex4oo4qchZkoQ'}}
                resizeMode={'contain'}
                style={{width: '100%', height: 50}}
              />
              </TouchableOpacity>
            </View>
            <View style={ this.state.selected === 1 ? { width: '33%', backgroundColor: 'red'} : {width: '33%'}}>
              <TouchableOpacity
                onPress={() => {
                  this.selectImage('https://cdnservices.group.com/media/5469818/easter-seasonal-events-leaves.png', 1);
                }}
              >
              <Image 
                source={{uri:'https://cdnservices.group.com/media/5469818/easter-seasonal-events-leaves.png'}}
                resizeMode={'contain'}
                style={{width: '100%', height: 50}}
              />
              </TouchableOpacity>
            </View>
            <View style={ this.state.selected === 2 ? { width: '33%', backgroundColor: 'red'} : {width: '33%'}}>
              <TouchableOpacity
                onPress={() => {
                  this.selectImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7-Qv4zQzQw6x-S7FKQ1WcdKhh6U3FACyaAbaapTOzHsuqs0qv', 2);
                }}
              >
              <Image 
                source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7-Qv4zQzQw6x-S7FKQ1WcdKhh6U3FACyaAbaapTOzHsuqs0qv'}}
                resizeMode={'contain'}
                style={{width: '100%', height: 50}}
              />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ width: '100%', height: 50, flexDirection: 'row', marginTop: 10}}>
            <View style={ this.state.selected === 3 ? { width: '33%', backgroundColor: 'red'} : {width: '33%'}}>
              <TouchableOpacity
                onPress={() => {
                  this.selectImage('http://8avenues.com/images/wings/environment.png', 3);
                }}
              >
              <Image 
                source={{uri:'http://8avenues.com/images/wings/environment.png'}}
                resizeMode={'contain'}
                style={{width: '100%', height: 50}}
              />
              </TouchableOpacity>
            </View>
            <View style={ this.state.selected === 4 ? { width: '33%', backgroundColor: 'red'} : {width: '33%'}}>
              <TouchableOpacity
                onPress={() => {
                  this.selectImage('https://www.shareicon.net/data/128x128/2015/11/06/667985_design_512x512.png', 4);
                }}
              >
              <Image 
                source={{uri:'https://www.shareicon.net/data/128x128/2015/11/06/667985_design_512x512.png'}}
                resizeMode={'contain'}
                style={{width: '100%', height: 50}}
              />
              </TouchableOpacity>
            </View>
            <View style={ this.state.selected === 5 ? { width: '33%', backgroundColor: 'red'} : {width: '33%'}}>
              <TouchableOpacity
                onPress={() => {
                  this.selectImage('http://mintleafdental.ca/wp-content/uploads/2015/10/white-logo-leaves-only.png', 5);
                }}
              >
              <Image 
                source={{uri:'http://mintleafdental.ca/wp-content/uploads/2015/10/white-logo-leaves-only.png'}}
                resizeMode={'contain'}
                style={{width: '100%', height: 50}}
              />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView style={{width: '70%', alignContent: 'center', borderWidth: 0.5, borderColor: 'black', marginTop: 5}}>
            {
              !this.props.data.loading && specialTime.length 
              ? 
              specialTime.map((item,key) => (
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', height: 60, borderColor: 'black', borderBottomWidth: 0.5}} key={key}>
                  <View style={{width: '75%'}}>
                    <TextFont style={{ fontSize: 15}}>Datum: {item.date}</TextFont>
                    <TextFont style={{ fontSize: 15}}>Od: {this.cuttingString(item.opening || 'xxxx')}</TextFont>
                    <TextFont style={{ fontSize: 15}}>Do: {this.cuttingString(item.closing || 'xxxx')}</TextFont>
                  </View>
                  <TouchableOpacity
                    style={{width: '25%', alignItems: 'center', justifyContent: 'center'}}
                    onPress={() => {
                      this.deleteSpecial(item.id);
                    }}
                  >
                    <Image 
                      source={require('../../../imgs/falseWorkingTime.png')}
                      style={{width: '100%', height: 35}}
                      resizeMode={'center'}
                    />
                  </TouchableOpacity>
                </View>
              ))
              :
              <View style={{ flexDirection: 'column', width: '100%'}}>
                <TextFont style={{ textAlign: 'center'}}>Trenutno nemamo specijalne datume za ovaj objekat</TextFont>
              </View>
            }
          </ScrollView>
          <View style={{marginTop: 5, width: responsiveWidth(100)}}>
            <BigButton
              title="Smini"
              onAction={() => {
                this.saveSpecial();
              }}
            />
          </View>
      </View>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default MySpecialDate;
