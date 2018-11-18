import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import TextFont from '../../../TextFont';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { CheckBox } from 'react-native-elements';
import Loader from '../../CommonDumb/Loader';
import { withRouter } from 'react-router-dom';
import BigButton from '../../CommonDumb/BigButton';

const style = StyleSheet.create({
  dateTime: {
    width: responsiveWidth(33.33),
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
});
@withRouter
class MyObjectDateTIme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked : true,
      isDateTimePickerVisible : false,
      array: {},
      opened: '',
    }
  }
  
  _showDateTimePicker = ( who ) => {
    this.setState({
      isDateTimePickerVisible: true,
      opened: who,
    });
  };

  _hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  _handleDatePicked = (e) => {
    this.setState({ isDateTimePickerVisible: false })
  }

  cuttingString = str1 => {
    let hour = str1.slice(0,2);
    let minutes = str1.slice(2,4);
    let result = hour + ' : ' + minutes;
    return result;
  }

  render() {
    let opening = this.cuttingString(this.props.opening);
    let closing = this.cuttingString(this.props.closing);
    return (
      <View style={this.props.sector ? { backgroundColor: 'transparent'} : {backgroundColor: 'rgb(43, 157, 157)'}}>
        <View style={{ flexDirection: 'row', padding: 10, width: responsiveWidth(100) }}>                  
          <Text style={this.props.sector ? { width: responsiveWidth(25), color: 'white'} : { width: responsiveWidth(25) }}>{this.props.day}</Text>
          <TouchableOpacity
            onPress={() => this._showDateTimePicker('opening')}
            activeOpacity={this.state.isChecked ? 1 : 0.7}
            style={{ width: responsiveWidth(25) }}
          >
            <Text style={this.props.sector ? { color: 'white'} : { color: 'black'}}>{opening}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this._showDateTimePicker('closing')}
            style={{ width: responsiveWidth(25) }}
          >
            <Text style={this.props.sector ? { color: 'white'} : { color: 'black'}}>{closing}</Text>
          </TouchableOpacity>
          <CheckBox
            style={{width: responsiveWidth(25)}}
            checked={this.props.checked}
            onPress={() => {
              this.props.checkFunc(this.props.day, !this.props.checked)
            }}
          />
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
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
              this.props.datePickerFunc(this.props.day, time, this.state.opened === 'opening' ? true : false );
              this.setState({
                isDateTimePickerVisible: false,
              })
            }}
            onCancel={() => this._hideDateTimePicker()}
            mode="time"
            is24Hour={false}
          />       
        </View>
      </View>
    );
  }
}

export default MyObjectDateTIme;


