import React from 'react'; 
import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import TextFont from 'TextFont';

const SortDropdown = ( props ) => (
  <View style={{ 
    width: 150,
    height: 160,
    backgroundColor: 'rgb(243, 243, 242);',
    position: 'absolute',
    right: '1%',
    top: responsiveHeight(5),
    opacity: 0.97,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    }}
  >
    <View style={{ flexDirection: 'column', width: '100%'}}>
      <TouchableOpacity
        onPress={() => {
          props.sortBy(true, 'ratingCount','desc')
        }}
      >
        <View style={{ flexDirection: 'row', borderColor: 'rgb(183, 183, 183);', borderBottomWidth: 1, width: '100%', justifyContent: 'space-between', height: 30}}>
          <View style={{ justifyContent: 'center', width: '25%'}}>
            <Image 
              source={require('../../imgs/zvezdica.png')}
              resizeMode={'contain'}
              style={{width: '100%', height: 20}}
            />
          </View>
          <View style={{ justifyContent: 'center', width: '75%' }}>
            <TextFont style={{ color: 'rgb(43, 157, 157)', textAlign: 'center', fontSize: 13, }}>Najbolje ocenjeno</TextFont>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.sortBy(true, 'name','asc')
        }}
      >
        <View style={{ flexDirection: 'row', borderColor: 'rgb(183, 183, 183);', borderBottomWidth: 1, width: '100%', justifyContent: 'space-between', height: 30}}>
          <View style={{ justifyContent: 'center', width: '25%'}}>
            <Image 
              source={require('../../imgs/Slovo.png')}
              resizeMode={'contain'}
              style={{width: '100%', height: 20}}
            />
          </View>
          <View style={{ justifyContent: 'center', width: '75%' }}>
            <TextFont style={{ color: 'rgb(43, 157, 157)', textAlign: 'center', fontSize: 13, }}>ABC</TextFont>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.sortBy(true, 'avgPrice', 'desc')
        }}
      >
        <View style={{ flexDirection: 'row', borderColor: 'rgb(183, 183, 183);', borderBottomWidth: 1, width: '100%', justifyContent: 'space-between', height: 30}}>
          <View style={{ justifyContent: 'center', width: '25%'}}>
            <Image 
              source={require('../../imgs/cenaDisable.png')}
              resizeMode={'contain'}
              style={{width: '100%', height: 20}}
            />
          </View>
          <View style={{ justifyContent: 'center', width: '75%' }}>
            <TextFont style={{ color: 'rgb(43, 157, 157)', textAlign: 'center', fontSize: 13, }}>Cena uzlazno</TextFont>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.sortBy(true, 'avgPrice', 'asc')
        }}
      >
        <View style={{ flexDirection: 'row', borderColor: 'rgb(183, 183, 183);', borderBottomWidth: 1, width: '100%', justifyContent: 'space-between', height: 30}}>
          <View style={{ justifyContent: 'center', width: '25%'}}>
            <Image 
              source={require('../../imgs/cenaEnable.png')}
              resizeMode={'contain'}
              style={{width: '100%', height: 20}}
            />
          </View>
          <View style={{ justifyContent: 'center', width: '75%' }}>
            <TextFont style={{ color: 'rgb(43, 157, 157)', textAlign: 'center', fontSize: 13, }}>Cena silazno</TextFont>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.sortBy(true, 'checkedInCount','desc')
        }}
      >
        <View style={{ flexDirection: 'row', borderColor: 'rgb(183, 183, 183);', borderBottomWidth: 1, width: '100%', justifyContent: 'space-between', height: 40}}>
          <View style={{ justifyContent: 'center', width: '25%'}}>
            <Image 
              source={require('../../imgs/bioSamOvdeSort.png')}
              resizeMode={'contain'}
              style={{width: '100%', height: 20}} 
            />
          </View>
          <View style={{ justifyContent: 'center', width: '75%' }}>
            <TextFont style={{ color: 'rgb(43, 157, 157)', textAlign: 'center', fontSize: 13, }}>Bio sam ovde ponuda</TextFont>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  </View>
);
export default SortDropdown