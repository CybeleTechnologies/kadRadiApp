import React, { Component } from 'react';
import {  
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import TextFont from '../../../TextFont';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import MyObjectDateTIme from './MyObjectDateTIme';
import { CheckBox } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import BigButton from '../../CommonDumb/BigButton';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../actions';

const style = StyleSheet.create({
  menuButtons: {
    width: responsiveWidth(50),
    height: 40,
    backgroundColor: 'white',
    borderRightColor: 'black',
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  menuButtonsActive: {
    width: responsiveWidth(50),
    height: 40,
    backgroundColor: 'green',
    borderRightColor: 'black',
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  menuButtonsBack: {
    width: responsiveWidth(20),
    height: 40,
    backgroundColor: 'white',
    borderRightColor: 'black',
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  dateTime: {
    width: responsiveWidth(25),
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    color: 'white'
  }
});
@graphql(
  gql`mutation updateSectorTime($workTime: String!, $token: String!, $objectClId: Int!, $sectorId: Int!) {
    updateSectorTime(workTime: $workTime, token: $token, objectClId: $objectClId, sectorId: $sectorId) {
      success
      error
    }
  }`, 
  {
    name: 'updateSector',
  }
)
@connect((state) => {return {
  userProfile: state.userProfile,
  }}, mapDispatchToProps)

class MyObjectSectorTime extends Component {
  constructor(props){
    super(props);
    this.state = {
      isChecked: false,
      isOpening24h: false,
      isDateTimePickerVisible: false,
      workingTimeMutation: [],
      myArr: [],
      id: '',
      sectorId: '',
    };
  }
  componentDidMount() {
    let niz = this.dayInObject(this.props.workingTimeSector);
    this.setState({
      myArr: niz,
      id: this.props.ids,
      sectorId: this.props.sectorId,
    });
  }
  dayInObject = niz => {
    let arr = [];
    for(let obj in niz) {
      if(typeof niz[obj].closing != 'undefined') {
        let newObj = {
          opening: niz[obj].opening,
          closing: niz[obj].closing,
          day: obj,
          checked: niz[obj].opening != ''? true : false,
        }
        arr.push(newObj)
      }
    }
    return arr;
  }
  handleDatePicker = (day, time, opening) => {
    if(opening) {
      let finded = this.state.myArr.filter((item) => (
        item.day === day
      ))
      let [first] = finded;
      let newTime = {...first, opening: time};
      this.setState(prevState => ({
        myArr: prevState.myArr.filter((item) => (
          item.day !== day
        )),
      }));
      this.setState(prevState => ({
        myArr: [
          ...prevState.myArr,
          newTime,
        ]
      }));
    } else {
      let finded = this.state.myArr.filter((item) => (
        item.day === day
      ))
      let [first] = finded;
      let newTime = {...first, closing: time};
      this.setState(prevState => ({
        myArr: prevState.myArr.filter((item) => (
          item.day !== day
        )),
      }));
      this.setState(prevState => ({
        myArr: [
          ...prevState.myArr,
          newTime,
        ]
      }));
    }
  }
  handleCheckButton = (day, checked) => {
    let finded = this.state.myArr.filter((item) => (
      item.day === day
    ));
    let [first] = finded;
    let newCheck = {...first, checked};
    this.setState(prevState => ({
      myArr: prevState.myArr.filter((item) => (
        item.day !== day
      )),
    }));
    this.setState(prevState => ({
      myArr: [
        ...prevState.myArr,
        newCheck,
      ]
    }));
  }

  letsGoo = async () => {
    let { token } = this.props.userProfile;
    let obj = {};
    this.state.myArr.forEach(element => {
      if(element.day != undefined) {
        let tmp = 'wt';
        let mali = element.day.slice(0,3);
        let upercase = mali.charAt(0).toUpperCase() + mali.slice(1,3);
        let key = tmp + upercase;
        let filterica = this.state.myArr.filter((item) => {
          if(item.day === element.day) {
            switch(item.day) {
              case 'monday':
                obj[key] = item;
              break;
              case 'tuesday':
                obj[key] = item;
              break;
              case 'wednesday':
                obj[key] = item;
              break;
              case 'thursday':
                obj[key] = item;
              break;
              case 'friday':
                obj[key] = item;
              break;
              case 'saturday':
                obj[key] = item;
              break;
              case 'sunday':
                obj[key] = item;
              break;
            }
          }
        })
      }
    });
    let stringify = JSON.stringify(obj);
    let muta = await this.props.updateSector({
      variables: {
        workTime: stringify,
        token,
        objectClId: this.state.id,
        sectorId: this.state.sectorId,
      }
    });
    if(muta.data.updateSectorTime.success) {
      ToastAndroid.show("Upesno sačuvane izmene!", ToastAndroid.SHORT)
      this.props.reloadMe();
    } else {
      ToastAndroid.show("Promene nisu sačuvane!", ToastAndroid.SHORT)
    }
  }
  render() {
    return (
      <View>
        <View style={{ flexDirection: 'row' }} >
            <Text style={{ textAlign: 'center', color: 'white' }}>Radno vreme</Text>
        </View>
        <View>
          <View>
            <View style={{ flexDirection: 'row', padding: 0}}>
              <TextFont style={style.dateTime}>Dan:</TextFont>
              <TextFont style={style.dateTime}>Pocetak:</TextFont>
              <TextFont style={style.dateTime}>Kraj:</TextFont>
              <TextFont style={style.dateTime}>Radni dan</TextFont>
            </View>
              {
                !this.state.myArr.length ? null :
                this.state.myArr.map((item, key) => {
                  return ( 
                    <MyObjectDateTIme 
                      sector
                      key={key}  
                      day={item.day}
                      opening={item.opening}
                      closing={item.closing}
                      checked={item.checked}
                      datePickerFunc={this.handleDatePicker}
                      checkFunc={this.handleCheckButton}
                    />
                  );
                })
              }
            {/* <View style={{ flexDirection: 'row', width: responsiveWidth(50), justifyContent: 'space-between', alignItems: 'center', marginTop: 15, alignContent: 'center' }}>
              <TextFont style={{ fontSize: 15}}>Radi 24h?</TextFont>
              <CheckBox
                style={{width: responsiveWidth(25)}}
                onPress={() => {
                  this.setState(previousState => ({
                    isOpening24h: !previousState.isOpening24h,
                  }));
                }}
                checked={this.state.isOpening24h}
              />
            </View> */}
            <View style={{marginTop: 20, width: '100%'}}>
              <BigButton
                title="Smini radno vreme"
                onAction={() => {
                  this.letsGoo();
                  this.props.close();
                }}
              />
            </View>
        </View>
      </View>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default MyObjectSectorTime;