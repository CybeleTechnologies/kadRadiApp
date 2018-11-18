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
  }
});
@graphql(
  gql` query objectCl($id: Int) {
    objectCl(id: $id){
      workingTimeInfo{
        alwaysOpen
        monday{
          opening
          closing
        }
        tuesday{
          opening
          closing
        }
        wednesday{
          opening
          closing
        }
        thursday{
          opening
          closing
        }
        friday{
          opening
          closing
        }
        saturday{
          opening
          closing
        }
        sunday{
          opening
          closing
        }
      }
    }
  }`,
  {
    options: ( props ) => ({
      variables: {
        id: props.match.params.myObjectTimeId,
      },
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true,
    })
  }
)
@graphql(
  gql`mutation workTimeUpdate($workTime: String!, $token: String!) {
    workTimeUpdate(workTime: $workTime, token: $token) {
      success
      error
    }
  }`, 
  {
    name: 'updateTimeMutation',
  }
)
@connect((state) => {return {
  userProfile: state.userProfile,
  }}, mapDispatchToProps)

class myObjectWorkTimeEdit extends Component {
  constructor(props){
    super(props);
    this.state = {
      menuChange: true,
      isChecked: false,
      isOpening24h: false,
      isDateTimePickerVisible: false,
      workingTimeMutation: [],
      myArr: [],
      id: []
    };
  }
  componentDidMount() {
    this.setState({
      id: this.props.match.params.myObjectTimeId,
    })
  }
  componentWillReceiveProps(nextProps) {
    if(!nextProps.data.loading && nextProps.data.objectCl.length) {
      let [first] = nextProps.data.objectCl;
      let niz = this.dayInObject(first.workingTimeInfo);
      this.setState({
        myArr: niz,
      });
      this.setState({
        isOpening24h: first.workingTimeInfo.alwaysOpen,
      })
    }
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
    obj['objectClId'] = this.state.id
    obj['alwaysOpen'] = this.state.isOpening24h;
    let stringify = JSON.stringify(obj);
    let muta = await this.props.updateTimeMutation({
      variables: {
        workTime: stringify,
        token,
      }
    });
    if(muta.data.workTimeUpdate.success) {
      ToastAndroid.show("Upesno sačuvane izmene!", ToastAndroid.SHORT)
    } else {
      ToastAndroid.show("Promene nisu sačuvane!", ToastAndroid.SHORT)
    }
  }
  render() {
    return (
      <View style={{ display: 'flex', flex: 1, backgroundColor: 'rgb(43, 157, 157)' }}>
        <View>
          <View>
            <View style={{ flexDirection: 'row', padding: 10}}>
              <TextFont style={style.dateTime}>Dan:</TextFont>
              <TextFont style={style.dateTime}>Pocetak:</TextFont>
              <TextFont style={style.dateTime}>Kraj:</TextFont>
              <TextFont style={style.dateTime}>Radni dan?</TextFont>
            </View>
              {
                !this.state.myArr.length ? null :
                this.state.myArr.map((item, key) => {
                  return ( 
                    <MyObjectDateTIme 
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
            <View style={{ flexDirection: 'row', width: responsiveWidth(50), justifyContent: 'space-between', alignItems: 'center', marginTop: 15, alignContent: 'center' }}>
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
            </View>
            <View style={{marginTop: 20, width: responsiveWidth(100)}}>
              <BigButton
                title="Smini"
                onAction={() => {
                  this.letsGoo()
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

export default myObjectWorkTimeEdit;
