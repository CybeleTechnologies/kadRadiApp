/* @flow */
import React from 'react';
import {
  View,
  AsyncStorage,
  Image,
  TouchableHighlight,
  ScrollView,
  Text,
  StyleSheet,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import ProfileHero from '../DumbComponents/ProfileDumb/ProfileHero';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import TextFont from 'TextFont';

const style = StyleSheet.create({
  listItemTitle: {
    fontFamily: 'OpenSans-Regular',
    fontSize: responsiveFontSize(2),
    color: '#a6a6a6',
  },
})

type Props = {
  menuVisibileNo: any,
  logout: any,
  userProfile: any,
}

const logoutUser = async (props) => {
  let remove = await AsyncStorage.removeItem('userId');
  let removeToken = await AsyncStorage.removeItem('userToken');
  props.logout();
  props.menuVisibileNo();
  props.isBackgroundTrue = '../../imgs/pozadinablur.jpg';
}

const MenuComponents = (props: Props) => (
    <View style={{flex: 1}}>
      <ProfileHero backgroundImage={'../../imgs/pozadinablur.jpg'} isTrueBg={props.isBackgroundTrue} profileImg={props.userProfile.profileImageUrl} firstName={props.userProfile.firstName} lastName={props.userProfile.lastName}/>
      <View style={{flex: 1,}}>
        <ScrollView>
          {/* <View style={{width: '100%', flexDirection: 'row', height: responsiveHeight(13), justifyContent: 'flex-end'}}>
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
              <View 
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '33%',
                }}
              >
                <TouchableHighlight underlayColor={5}>
                  <Image
                    source={require('../../imgs/blueStar.png')}
                    style={{
                      width: responsiveHeight(7),
                      height: responsiveHeight(7),
                    }}
                  />
                </TouchableHighlight>
                <TextFont
                  style={{
                    textAlignVertical: 'center',
                    color: '#019f9f',
                  }}
                >
                  Dodaj ocenu
                </TextFont>
              </View>
              <View 
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '33%',
                }}
              >
                <TouchableHighlight underlayColor={5}>
                  <Image
                    source={require('../../imgs/cameraBlue.png')}
                    style={{
                      width: responsiveHeight(7),
                      height: responsiveHeight(7),
                    }}
                  />
                </TouchableHighlight>
                <TextFont
                  style={{
                    textAlignVertical: 'center',
                    color: '#019f9f',
                  }}
                >
                  Dodaj fotografiju
                </TextFont>
              </View>
              <View 
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '33%',
                }}
              >
                <TouchableHighlight underlayColor={5}>
                  <Image
                    source={require('../../imgs/iWasHereBlue.png')}
                    style={{
                      width: responsiveHeight(7),
                      height: responsiveHeight(7),
                    }}
                  />
                </TouchableHighlight>
                <TextFont
                  style={{
                    textAlignVertical: 'center',
                    color: '#019f9f',
                  }}
                >
                  Prijavi gde si bio
                </TextFont>
              </View>
            </View>
          </View> */}
          <List containerStyle={{flexDirection: 'column',backgroundColor: "white", borderTopWidth: 0, justifyContent: 'flex-start',marginTop: 0}}>
              <ListItem
                roundAvatar={true}
                avatarOverlayContainerStyle={{
                  borderColor: 'white',
                  borderWidth: 2,
                }}
                avatar={require('../../imgs/slideMenu/Lokacijameni.png')}
                title='Blizu mene'
                chevronColor={'transparent'}
                titleStyle={style.listItemTitle}
                containerStyle={{borderBottomColor: "white", borderTopColor: "rgb(236, 236, 236)", borderTopWidth:2}}
                onPress={() => {
                  props.history.push('/');
                  props.menuVisibileNo();
                }}
              />
              <ListItem
                roundAvatar={true}
                avatarOverlayContainerStyle={{
                  borderColor: 'white',
                  borderWidth: 2,
                }}
                avatar={require('../../imgs/slideMenu/Trazimeni.png')}
                title='Pretraga'
                chevronColor={'transparent'}
                titleStyle={style.listItemTitle}
                containerStyle={{borderBottomColor: "white", borderTopColor: "white", borderWidth:0}}
                onPress={() => {
                  props.history.push('/search');
                  props.menuVisibileNo();
                }}
              />
              <ListItem
                roundAvatar={true}
                avatarOverlayContainerStyle={{
                  borderColor: 'white',
                  borderWidth: 2,
                }}
                avatar={require('../../imgs/slideMenu/Notifikacijameni.png')}
                title='Obaveštenja'
                chevronColor={'transparent'}
                titleStyle={style.listItemTitle}
                containerStyle={{borderBottomColor: "white", borderTopColor: "white", borderWidth:0}}
                onPress={() => {
                  props.history.push('/notifications');
                  props.menuVisibileNo();
                }}
              />
              <ListItem
                roundAvatar={true}
                avatarOverlayContainerStyle={{
                  borderColor: 'white',
                  borderWidth: 2,
                }}
                avatar={require('../../imgs/slideMenu/livemeni.png')}
                title='Ocene i utisci uživo'
                chevronColor={'transparent'}
                titleStyle={style.listItemTitle}
                containerStyle={{borderBottomColor: "white", borderBottomColor: "rgb(236, 236, 236)", borderBottomWidth:2}}
                onPress={() => {
                  props.history.push('/live-container');
                  props.menuVisibileNo();
                }}
              />
              <ListItem
                roundAvatar={true}
                avatarOverlayContainerStyle={{
                  borderColor: 'white',
                  borderWidth: 2,
                }}
                avatar={require('../../imgs/slideMenu/Bookmarkmeni.png')}
                title='Sačuvana Mesta'
                chevronColor={'transparent'}
                titleStyle={style.listItemTitle}
                containerStyle={{borderBottomColor: "white", borderTopColor: "white", borderWidth:0}}
                onPress={() => {
                  props.history.push('/favoriteObject');
                  props.menuVisibileNo();
                }}
              />
              <ListItem
                roundAvatar={true}
                avatarOverlayContainerStyle={{
                  borderColor: 'white',
                  borderWidth: 2,
                }}
                avatar={require('../../imgs/slideMenu/Skorovidjenomeni.png')}
                title='Skoro viđeno'
                chevronColor={'transparent'}
                titleStyle={style.listItemTitle}
                containerStyle={{borderBottomColor: "white", borderBottomColor: "rgb(236, 236, 236)", borderBottomWidth:2}}
                onPress={()=>{
                  props.history.push('/recently');
                  props.menuVisibileNo();
                }}
              />
              <ListItem
                roundAvatar={true}
                avatarOverlayContainerStyle={{
                  borderColor: 'white',
                  borderWidth: 2,
                }}
                avatar={require('../../imgs/slideMenu/Dodajprijateljameni.png')}
                title='Dodajte prijatelja'
                chevronColor={'transparent'}
                titleStyle={style.listItemTitle}
                containerStyle={{borderBottomColor: "white", borderTopColor: "white", borderWidth:0}}
                onPress={() => {
                  props.history.push('/search');
                  props.menuVisibileNo();
                }}
              />
              <ListItem
                roundAvatar={true}
                avatarOverlayContainerStyle={{
                  borderColor: 'white',
                  borderWidth: 2,
                }}
                avatar={require('../../imgs/slideMenu/Dodajsvojposao.png')}
                title='Moji poslovi'
                chevronColor={'transparent'}
                titleStyle={style.listItemTitle}
                containerStyle={{borderBottomColor: "white", borderTopColor: "white", borderWidth:0}}
                onPress={() => {
                  props.history.push('/my-object-list');
                  props.menuVisibileNo();
                }}
              />
              <ListItem
                roundAvatar={true}
                avatarOverlayContainerStyle={{
                  borderColor: 'white',
                  borderWidth: 2,
                }}
                avatar={require('../../imgs/slideMenu/Dodajsvojposao.png')}
                title='Dodajte vaš posao'
                chevronColor={'transparent'}
                titleStyle={style.listItemTitle}
                containerStyle={{borderBottomColor: "white", borderBottomColor: "rgb(236, 236, 236)", borderBottomWidth:2}}
                onPress={() => {
                  console.log('Dodajte vaš posao')
                }}
              />
              <ListItem
                roundAvatar={true}
                avatarOverlayContainerStyle={{
                  borderColor: 'white',
                  borderWidth: 2,
                }}
                avatar={require('../../imgs/chatIcon.png')}
                title='Chat'
                chevronColor={'transparent'}
                titleStyle={style.listItemTitle}
                containerStyle={{borderBottomColor: "white", borderTopColor: "white", borderWidth:0}}
                onPress={() => {
                  props.history.push(`/inbox`);
                  props.menuVisibileNo();
                }}
              />
              <ListItem
                roundAvatar={true}
                avatarOverlayContainerStyle={{
                  borderColor: 'white',
                  borderWidth: 2,
                }}
                avatar={require('../../imgs/slideMenu/Odjavi-me.png')}
                title='Promeni nalog'
                chevronColor={'transparent'}
                titleStyle={style.listItemTitle}
                containerStyle={{borderBottomColor: "white", borderTopColor: "white", borderWidth:0}}
                onPress={() => {
                  props.history.push('/');
                  logoutUser(props);
                }}
              />
          </List>
        </ScrollView>
      </View>
    </View>
  );

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default withRouter(connect((state) => { return {
  menuVisible: state.menuVisible,
  userProfile: state.userProfile
}}, mapDispatchToProps)(MenuComponents));
