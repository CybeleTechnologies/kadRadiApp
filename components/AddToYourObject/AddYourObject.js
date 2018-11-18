import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import BigButton from '../CommonDumb/BigButton';

class AddYourObject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      telefon: '',
    }
  }
  render() {
    return (
      <View style={{ flex:1 }}>
        <View style={{ flex: 3.9 }}>
          <Image 
            source={require('../../imgs/pozadinablur.jpg')}
            resizeMode="cover"
          >
            <View style={{flexDirection: 'row', width: responsiveWidth(100),height: responsiveHeight(8), backgroundColor: 'rgb(43, 157, 157)', marginTop: responsiveHeight(3), justifyContent: 'center'}}>
              <Text style={{textAlign: 'center', textAlignVertical: 'center', fontSize: 18, color: 'white'}}>Ovo je vaš posao?</Text>
            </View>
            <View style={{flexDirection: 'row', width: responsiveWidth(100), justifyContent: 'center', marginTop: responsiveHeight(3), marginBottom: responsiveHeight(2)}}>
              <Text style={{textAlign: 'center', textAlignVertical: 'center', fontSize: 16, color: 'white'}}>Pridružite se Open door zajednici!</Text>
            </View>
            <View style={{flexDirection: 'row', width: responsiveWidth(100), justifyContent: 'center',}}>
              <Text style={{
                textAlign: 'center',
                textAlignVertical: 'center',
                fontSize: 16,
                color: 'white'
              }}>
                Otključajte fukncije ocena i utisaka, bio sam ovde ponuda
                i radnog vremena tokom praznika i još mnogo toga!
              </Text>
            </View>
          </Image>
        </View>
        <View style={{ flex: 6.1, backgroundColor: 'rgb(43, 157, 157)'}}>
          <ScrollView>
            <View style={{width: responsiveWidth(80), margin: '10%', justifyContent:'center', marginTop: '5%'}}>
              <Text style={{color: 'white', fontSize: 14.5, textAlign: 'center'}}>
               Ostavite nam e-mail i kontakt telefon i
               kontaktiraćemo Vas u najkraćem mogućem roku.
              </Text>
              <View style={{flexDirection: 'column', justifyContent: 'flex-start',marginTop: responsiveHeight(2)}}>
                <Text style={{color: 'white', fontSize: 14 }}>Email</Text>
                <TextInput
                  underlineColorAndroid="transparent"
                  style={{
                    borderColor: 'transparent',
                    borderRadius: 10,
                    backgroundColor: 'white',
                  }}
                  keyboardType="email-address"
                  placeholderTextColor="black"
                  disableFullscreenUI
                  onChangeText={value => this.setState({
                    email: value,
                  })}
                />
                <Text style={{color: 'white', fontSize: 14,marginTop: responsiveHeight(2)}}>Kontakt telefon</Text>
                <TextInput
                  underlineColorAndroid="transparent"
                  style={{
                    borderColor: 'transparent',
                    borderRadius: 10,
                    backgroundColor: 'white',
                  }}
                  keyboardType="numeric"
                  placeholderTextColor="black"
                  disableFullscreenUI
                  onChangeText={value => this.setState({
                    telefon: value,
                   })}
                />
                <BigButton 
                  title={'Pošalji'}
                  containerStyle={{
                    borderRadius: 25,
                    marginTop: responsiveHeight(2)
                  }}  
                  onAction={() => {
                    // ovde ide 
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default AddYourObject;