import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import TextFont from 'TextFont';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

const style = StyleSheet.create({
  container: {
    width: responsiveWidth(100),
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  optionsContainer: {
    width: responsiveWidth(25),
    backgroundColor: '#fff',
    alignContent: 'center',
    borderColor: '#f5f5f5',
    borderLeftWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionsHeader: {
    height: 50,
    justifyContent: 'center',
  },
  optionsImage: {
    alignContent: 'center',
    alignItems: 'center',
  },
});

const ProfileOptions = ({ friends, pictures, omiljena, cekirana, showFriends, showChecked, showFavorites }) => (
  <View style={style.container}>
    <TouchableOpacity style={style.optionsContainer} onPress={() => showFriends()}>
      <View>
        <View style={style.optionsHeader}>
          <TextFont style={{ paddingTop: 5, paddingBottom: 5, fontSize: 13, textAlign: 'center', textAlignVertical: 'center', color: '#429d9e' }} >Prijatelji</TextFont>
        </View>
        <View style={style.optionsImage}>
          <Image source={require('../../imgs/kolikoprijatelja.png')} style={{ width: 50, height: 50 }} />                  
        </View>
        <View style={{ padding: 3 }} >
          <TextFont style={{ fontSize: 20, textAlign: 'center' }}>{friends}</TextFont>                  
        </View>
      </View>
    </TouchableOpacity>
    <TouchableOpacity style={style.optionsContainer} >
      <View>
        <View style={{ height: 50, justifyContent: 'center' }}>
          <View style={{ height: 50, justifyContent: 'center' }}>
            <TextFont style={{ paddingTop: 5, paddingBottom: 5, fontSize: 13, textAlign: 'center', textAlignVertical: 'center', color: '#429d9e' }} >Fotografije</TextFont>
          </View>
          <View style={style.optionsImage}>
            <Image source={require('../../imgs/kolikoslika.png')} style={{ width: 50, height: 50 }} />
          </View>
          <View style={{ padding: 3 }} >
            <TextFont style={{ fontSize: 20, textAlign: 'center' }}>{pictures}</TextFont>
          </View>
        </View>
      </View>
    </TouchableOpacity>
    <TouchableOpacity style={style.optionsContainer} onPress={() => showChecked()}>
      <View>
        <View style={{ height: 50 , justifyContent: 'center' }}>
          <TextFont style={{ paddingTop: 5, paddingBottom: 5, fontSize: 13, textAlign: 'center', textAlignVertical: 'center', color: '#429d9e' }} >Čekirana mesta</TextFont>
        </View>
        <View style={style.optionsImage}>
          <Image source={require('../../imgs/gdesecekirao.png')} style={{ width: 50, height: 50 }} />
        </View>
        <View style={{ padding: 3 }} >
          <TextFont style={{ fontSize: 20, textAlign: 'center' }}>{cekirana}</TextFont>
        </View>
      </View>
    </TouchableOpacity>
    <TouchableOpacity style={style.optionsContainer} onPress={() => showFavorites()}>
      <View>
        <View style={{ height: 50, justifyContent: 'center' }}>
          <View style={{ height: 50, justifyContent: 'center' }}>
            <TextFont style={{ paddingTop: 5, paddingBottom: 5, fontSize: 13, textAlign: 'center', textAlignVertical: 'center', color: '#429d9e' }} >Omiljena mesta</TextFont>
          </View>
          <View style={style.optionsImage}>
            <Image source={require('../../imgs/kolikoomiljenihmesta.png') } style={{ width: 50, height: 50 }} />
          </View>
          <View style={{ padding: 3 }} >
            <TextFont style={{ fontSize: 20, textAlign: 'center' }}>{omiljena}</TextFont>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  </View>
);


export default ProfileOptions;