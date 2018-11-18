import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableHighlight,
  ToastAndroid,
} from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import BigButton from '../CommonDumb/BigButton';
import FadeInComponent from '../CommonDumb/FadeInComponent';
import ContentCountry from '../Dropdown/ContentCountry';
import Flag from 'react-native-flags';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
const data = [
  { title: 'Engleska', code: 'GB' },
  { title: 'Nemacka', code: 'DE' },
  { title: 'Spanija', code: 'ES' },
  { title: 'Francuska', code: 'FR' },
  { title: 'Rusija', code: 'RU' },
  { title: 'Hrvatska', code: 'HR' },
  { title: 'BiH', code: 'BA' },
  { title: 'Srbija', code: 'RS' },
  { title: 'Crna Gora', code: 'ME' },
];
@graphql(
  gql`mutation registerUser($email: String, $password: String, $firstName: String, $lastName: String) {
    registerUser(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
      emailHash
    }
  }`, 
  {
    name: 'registerAcc',
  }
)
class UserMakeAcc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      city: '',
      country: '',
      editing: true,
      selectedText: 'Izaberite drzavu',
      scrollEnabled: true,
      code: '',
    };
  }
  onSelect = (title,code) => {
    this.setState({
      selectedText: title,
      code: code,
      editing: true,
    })
  }
  registerMe = async () => {
    let { data } = await this.props.registerAcc(
      {
        variables: {
          email: this.state.email,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName
        }
      }
    )
    console.log('evo ti odg', data);
    if (data.registerUser.emailHash) {
      ToastAndroid.show(`Proverite email ${this.state.email}`, ToastAndroid.LONG);
    } else {
      ToastAndroid.show(`Greška!`, ToastAndroid.LONG);
    }
  }
  render() {
    return (
      <View style={{flex:1}}>
        <View style={{flex: 3.9}}>
          <Image 
            source={require('../../imgs/pozadinablur.jpg')}
            resizeMode={'cover'}
          >
            <View style={{flexDirection: 'row', width: responsiveWidth(100),height: responsiveHeight(8), backgroundColor: 'rgb(43, 157, 157)', marginTop: responsiveHeight(3), justifyContent: 'center'}}>
              <Text style={{textAlign: 'center', textAlignVertical: 'center', fontSize: 18, color: 'white'}}>Dešava Vam se da poljubite vrata?</Text>
            </View>
            <View style={{flexDirection: 'row', width: responsiveWidth(100), justifyContent: 'center', marginTop: responsiveHeight(3), marginBottom: responsiveHeight(2)}}>
              <Text style={{textAlign: 'center', textAlignVertical: 'center', fontSize: 16, color: 'white'}}>Pridružite se Open door zajednici!</Text>
            </View>
            <View style={{flexDirection: 'row', width: responsiveWidth(100), justifyContent: 'center' }}>
              <Text style={{
                textAlign: 'center',
                textAlignVertical: 'center',
                fontSize: 16,
                color: 'white'
              }}>
                U dva klika dodjite do radnog vremena i lokacije objekta,
                Preko 50 kategorija i 10 000 objekata na vašem dlanu.
              </Text>
            </View>
          </Image>
        </View>
        <View style={{ flex: 6.1, backgroundColor: 'rgb(43, 157, 157)'}}>
        <ScrollView 
          scrollEnabled={this.state.scrollEnabled}
        >
            <View style={{width: responsiveWidth(90), margin: '5%', justifyContent:'center', marginTop: '5%'}}>
              <View style={{flexDirection: 'column', justifyContent: 'flex-start',marginTop: responsiveHeight(2)}}>
                <Text style={{color: 'white', fontSize: 14,}}>Email</Text>
                <TextInput
                  underlineColorAndroid='transparent'
                  style={{
                    borderColor: 'transparent',
                    borderRadius: 10,
                    backgroundColor: 'white'
                  }}
                  keyboardType = 'email-address'
                  placeholderTextColor={'black'}
                  placeholder={'primer@primer.com'}
                  disableFullscreenUI={true}
                  onChangeText={(value) => this.setState({
                    email: value,
                  })} 
                />
                <Text style={{color: 'white', fontSize: 14,marginTop: responsiveHeight(2)}}>Šifra</Text>
                <TextInput
                  underlineColorAndroid='transparent'
                  style={{
                    borderColor: 'transparent',
                    borderRadius: 10,
                    backgroundColor: 'white'
                  }}
                  placeholderTextColor={'black'}
                  disableFullscreenUI={true}
                  placeholder={'******'}
                  secureTextEntry={true}
                  onChangeText={(value) => this.setState({
                    password: value,
                   })} 
                />
                <Text style={{color: 'white', fontSize: 14, marginTop: responsiveHeight(1), textAlign: 'center',}}>Najmanje 5 slova i jedan broj</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{flexDirection: 'column', width: responsiveWidth(44)}}>
                    <Text style={{color: 'white', fontSize: 14,marginTop: responsiveHeight(2),textAlign: 'center'}}>Ime</Text>
                    <TextInput
                      style={{
                        borderColor: 'transparent',
                        borderRadius: 10,
                        backgroundColor: 'white'
                      }}
                      disableFullscreenUI={true}
                      onChangeText={(value) => this.setState({
                        firstName: value,
                      })} 
                    />
                  </View>
                  <View style={{flexDirection: 'column', width: responsiveWidth(44)}}>
                    <Text style={{color: 'white', fontSize: 14,marginTop: responsiveHeight(2), textAlign: 'center'}}>Prezime</Text>
                    <TextInput
                      style={{
                        borderColor: 'transparent',
                        borderRadius: 10,
                        backgroundColor: 'white'
                      }}
                      disableFullscreenUI={true}
                      onChangeText={(value) => this.setState({
                        lastName: value,
                      })} 
                    />
                  </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{flexDirection: 'column', width: responsiveWidth(44)}}>
                    <Text style={{color: 'white', fontSize: 14,marginTop: responsiveHeight(2),textAlign: 'center'}}>Grad</Text>
                    <TextInput
                      style={{
                        borderColor: 'transparent',
                        borderRadius: 10,
                        backgroundColor: 'white'
                      }}
                      disableFullscreenUI={true}
                      onChangeText={(value) => this.setState({
                        city: value,
                      })} 
                    />
                  </View>
                  <View style={{flexDirection: 'column', width: responsiveWidth(44)}}>
                    <Text style={{color: 'white', fontSize: 14,marginTop: responsiveHeight(2), textAlign: 'center'}}>Drzava</Text>
                    <TouchableHighlight 
                      onPress={()=>{
                        this.setState(previusState => ({
                          editing: !previusState.editing,
                        }));
                      }}
                      style={{
                        backgroundColor: 'white',
                        flex: 1,
                        justifyContent: 'center',
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10
                      }}
                    >
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: responsiveHeight(8)}}>
                        <Text style={{textAlignVertical: 'center'}}>{this.state.selectedText}</Text>
                        {
                          this.state.code != ''?
                          <Flag
                            code={this.state.code}
                            size={32}
                            style={{
                              alignSelf: 'center'
                            }}
                          />:
                          <Image source={require('../../imgs/akcija.png')} style={{ height: 30, width: 30, alignSelf: 'center'}} />
                        }
                      </View>
                    </TouchableHighlight>
                    <FadeInComponent
                      editing={this.state.editing}
                      backgroundProp={{
                        width: '100%',
                        backgroundColor: 'white',
                      }}
                    >
                      <ScrollView
                        onTouchStart={(ev) => {
                          this.setState({
                            scrollEnabled: false,
                          });
                        }}
                        onMomentumScrollEnd={(e) => {
                          this.setState({ scrollEnabled: true });
                        }}
                        onScrollEndDrag={(e) => {
                          this.setState({ scrollEnabled: true });
                        }}
                      >
                        <ContentCountry
                          data={data}
                          onSelect={this.onSelect}
                        />
                      </ScrollView>
                    </FadeInComponent>
                  </View>
                </View>
                <BigButton 
                  title={'Dalje'}
                  containerStyle={{
                    marginTop: responsiveHeight(2)
                  }}  
                  onAction={() => {
                    this.registerMe(); 
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
export default UserMakeAcc;