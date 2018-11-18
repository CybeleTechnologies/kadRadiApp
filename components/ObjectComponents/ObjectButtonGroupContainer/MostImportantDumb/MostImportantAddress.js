import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import TextFont from 'TextFont';
import { withRouter } from 'react-router-dom';

const style = StyleSheet.create({
  addressContainer:{
    width: responsiveWidth(90),
    height: responsiveHeight(10),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  borderr: {
    width: responsiveWidth(100),
    height: responsiveHeight(10),
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addSubCont: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  iconCont: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50,
  },
});
@withRouter
class MostImportantAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      idemo: 'mapa'
    }
  }
  render() {
    return(
      <View style={style.addressContainer}>
          <View style={style.addSubCont}>
            <TextFont
              style={{ fontSize: responsiveFontSize(1.3) }}
            >
              {`Ulica: ${this.props.objectLocations.address}`}
            </TextFont>
            <TextFont
              style={{ fontSize: responsiveFontSize(1.3) }}
            >
              {`${this.props.objectLocations.city} ${this.props.objectLocations.zipCode}`}
            </TextFont>
          </View>
          <View style={style.iconCont}>
            <TouchableOpacity
              onPress={() => {
                this.props.history.push(`/find-me/${this.props.objectLocations.lat}/${this.props.objectLocations.lng}/${this.props.name}/${this.props.address}`);
              }}
            >
              <Image
                style={{width: 70, height: 70}} 
                source={require('../../../../imgs/goThere.png')} />
              <TextFont style={{color: '#e2303d', textAlign: 'center'}}>PRONAĐI</TextFont>
            </TouchableOpacity>
          </View>
        </View>
      )
  } 
}
export default MostImportantAddress;
